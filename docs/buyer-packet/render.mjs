// Print the buyer packet (packet.html, eight US Letter pages) to PDF with headless Chrome.
//
// usage (from the repo root):
//   node docs/buyer-packet/render.mjs [chrome.exe]
// writes docs/buyer-packet/Mythos_Buyer_Packet_DRAFT.pdf. Fonts come from
// Google Fonts, so it needs a network connection.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chromePath = process.argv[2] ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const page = join(here, "packet.html");
const out = join(here, "Mythos_Buyer_Packet_DRAFT.pdf");

const profile = mkdtempSync(join(tmpdir(), "buyer-packet-"));
const port = 9344;
const chrome = spawn(chromePath, ["--headless=new", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
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
const check = await send("Runtime.evaluate", {
  expression: `document.fonts.ready.then(() => JSON.stringify([...document.querySelectorAll('.page')].map((p, i) => [i + 1, p.scrollHeight > p.clientHeight + 1])))`,
  awaitPromise: true,
  returnByValue: true,
});
console.log("overflow per page:", check.result?.value);
const { data } = await send("Page.printToPDF", { preferCSSPageSize: true, printBackground: true });
writeFileSync(out, Buffer.from(data, "base64"));
console.log("wrote", out);

await send("Browser.close").catch(() => {});
chrome.kill();
await sleep(500);
rmSync(profile, { recursive: true, force: true });
process.exit(0);
