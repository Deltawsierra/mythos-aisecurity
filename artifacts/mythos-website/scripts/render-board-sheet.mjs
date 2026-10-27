// Render the one-page board sheet PDF from content/boardSheet.json (the same
// questions the /ai-risk-explained/ page shows) with headless Chrome.
//
// usage (from artifacts/mythos-website):
//   node scripts/render-board-sheet.mjs [chrome.exe]
// writes public/assets/downloads/mythos-board-ai-risk-questions.pdf (US Letter).
// Fonts come from Google Fonts, so it needs a network connection.
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const chromePath = process.argv[2] ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const site = resolve(".");
const sheet = JSON.parse(readFileSync(join(site, "content/boardSheet.json"), "utf8"));
const crest = readFileSync(join(site, "public/assets/brand/crest-512.png")).toString("base64");
const out = join(site, "public/assets/downloads/mythos-board-ai-risk-questions.pdf");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const rows = sheet.questions
  .map((q, i) => `<tr><td class="n">${i + 1}</td><td class="q">${esc(q)}</td><td class="a"></td></tr>`)
  .join("");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;600&display=block" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0.5in 0.55in; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.6pt/1.4 Inter, sans-serif; color: #161a1c; }
  header { display: flex; align-items: center; gap: 12px; border-bottom: 1.5px solid #b8823f; padding-bottom: 10px; }
  header img { width: 34px; height: 34px; }
  .brand { font-size: 8pt; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: #80511d; }
  h1 { font: 600 24pt/1.1 "Cormorant Garamond", serif; margin: 2px 0 0; }
  .intro { margin: 10px 0 12px; color: #4a4f52; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 7.4pt; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #80511d; padding: 0 6px 4px; }
  td { border-top: 0.75px solid #d9c7a8; padding: 13px 6px; vertical-align: top; }
  tr:last-child td { border-bottom: 0.75px solid #d9c7a8; }
  td.n { width: 22px; font: 600 13pt/1 "Cormorant Garamond", serif; font-variant-numeric: lining-nums; color: #80511d; padding-top: 13.5px; }
  td.q { width: 56%; }
  td.a { border-left: 0.75px solid #d9c7a8; }
  .sentence { margin-top: 14px; border-left: 3px solid #b8823f; background: #f6efe3; padding: 10px 14px; }
  .sentence p { margin: 0; }
  .label { font-size: 7.4pt; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #80511d; }
  .sentence .quote { margin-top: 4px; font: 500 13.5pt/1.3 "Cormorant Garamond", serif; }
  footer { margin-top: 12px; font-size: 7.6pt; color: #4a4f52; display: flex; justify-content: space-between; gap: 24px; }
</style></head><body>
<header><img src="data:image/png;base64,${crest}" alt=""><div><div class="brand">Mythos AI Security</div><h1>${esc(sheet.title)}</h1></div></header>
<p class="intro">${esc(sheet.intro)}</p>
<table><thead><tr><th></th><th>Question</th><th>Our answer, and who owns it</th></tr></thead><tbody>${rows}</tbody></table>
<div class="sentence"><p class="label">One sentence to reuse</p><p class="quote">&ldquo;${esc(sheet.sentence)}&rdquo;</p></div>
<footer><span>${esc(sheet.footnote)}</span><span style="white-space:nowrap">mythosaisecurity.com/ai-risk-explained</span></footer>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), "board-sheet-"));
const page = join(dir, "sheet.html");
writeFileSync(page, html);

const port = 9342;
const chrome = spawn(chromePath, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(dir, "profile")}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let list;
for (let i = 0; i < 150 && !list; i++) {
  try {
    list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  } catch {
    await sleep(200);
  }
}
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((res) => {
    const id = ++seq;
    pending.set(id, (m) => res(m.result ?? m.error));
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Page.navigate", { url: pathToFileURL(page).href });
await sleep(1500);
await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => document.fonts.size)", awaitPromise: true });
const { data } = await send("Page.printToPDF", { preferCSSPageSize: true, printBackground: true });
writeFileSync(out, Buffer.from(data, "base64"));
console.log("wrote", out);

await send("Browser.close").catch(() => {});
chrome.kill();
await sleep(500);
rmSync(dir, { recursive: true, force: true });
process.exit(0);
