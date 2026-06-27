import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "How Mythos AI Security handles information submitted through this website, how we use cookies and Google Analytics, and the choices available to visitors.",
  robots: { index: true, follow: true },
};

const SECTION = "mt-10 first:mt-0";
const H2 = "mb-3 text-xl font-normal text-ivory";
const H3 = "mb-2 mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-ivory/90";
const BODY = "text-sm leading-relaxed text-muted-stone";
const LI = "text-sm leading-relaxed text-muted-stone";
const UL = "mt-3 list-disc space-y-1.5 pl-5";
const TH =
  "border-b border-ivory/15 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-ivory/80";
const TD = "border-b border-ivory/5 px-3 py-2 align-top text-sm text-muted-stone";

function PolicyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={TD}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  const lastUpdated = "June 2026";

  return (
    <Container className="max-w-3xl py-20 lg:py-28">
      {/* Bare page title — no marketing hero treatment. */}
      <h1 className="text-3xl font-normal leading-tight text-ivory lg:text-4xl">
        Privacy &amp; Cookie Policy
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-stone/50">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-12">
        <section className={SECTION}>
          <p className={BODY}>
            Mythos AI Security (&ldquo;Mythos,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this website. This
            Privacy &amp; Cookie Policy explains what information we collect
            through the website, how we use it, how we use cookies and analytics
            technologies, and the choices available to visitors.
          </p>
          <p className={`${BODY} mt-3`}>
            This policy applies only to this website and the forms available on
            it. It does not apply to any separate product, platform, pilot,
            private demo environment, customer deployment, or contractual service
            unless that service specifically links to this policy.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>1. Information we collect</h2>
          <p className={BODY}>
            We collect limited information from visitors in the following ways.
          </p>

          <h3 className={H3}>Information you submit directly</h3>
          <p className={BODY}>
            If you submit a contact, demo-request, investor-inquiry, or similar
            form, we may collect the information you choose to provide, such as:
          </p>
          <ul className={UL}>
            <li className={LI}>Name</li>
            <li className={LI}>Work email address</li>
            <li className={LI}>Role, title, or job function</li>
            <li className={LI}>Organization, company, or firm name</li>
            <li className={LI}>
              Company size, industry, timeline, or inquiry type
            </li>
            <li className={LI}>
              Message content or other context you choose to include
            </li>
          </ul>
          <p className={`${BODY} mt-4`}>
            Please do not submit classified information, controlled government
            information, sensitive security details, confidential customer data,
            protected health information, financial account information, or other
            sensitive personal information through public website forms.
          </p>

          <h3 className={H3}>Technical and security metadata</h3>
          <p className={BODY}>
            We may collect limited technical metadata needed to operate, secure,
            and protect the website, such as:
          </p>
          <ul className={UL}>
            <li className={LI}>IP address</li>
            <li className={LI}>Browser and device information</li>
            <li className={LI}>Timestamp of request</li>
            <li className={LI}>Referring page or URL</li>
            <li className={LI}>Form-submission timing and rate-limiting signals</li>
            <li className={LI}>Basic server logs and security events</li>
          </ul>
          <p className={`${BODY} mt-4`}>
            We use this information to help prevent spam, abuse, fraud, automated
            scraping, denial-of-service activity, and unauthorized access
            attempts.
          </p>

          <h3 className={H3}>Analytics information</h3>
          <p className={BODY}>
            If you consent to analytics cookies, we use Google Analytics 4 to
            understand how visitors use the website. Analytics information may
            include:
          </p>
          <ul className={UL}>
            <li className={LI}>Pages viewed</li>
            <li className={LI}>Approximate region or country</li>
            <li className={LI}>Browser and device type</li>
            <li className={LI}>Referring source</li>
            <li className={LI}>Session and interaction events</li>
            <li className={LI}>General engagement metrics</li>
          </ul>
          <p className={`${BODY} mt-4`}>
            We do not intentionally send names, email addresses, phone numbers,
            form message contents, or other directly identifying information to
            Google Analytics.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>2. How we use information</h2>
          <p className={BODY}>
            We use information collected through the website to:
          </p>
          <ul className={UL}>
            <li className={LI}>Respond to your inquiry</li>
            <li className={LI}>Schedule or follow up on demo requests</li>
            <li className={LI}>
              Review investor, partner, or business-development inquiries
            </li>
            <li className={LI}>
              Improve website performance, content, navigation, and usability
            </li>
            <li className={LI}>
              Understand general visitor interest and traffic patterns
            </li>
            <li className={LI}>Prevent spam, abuse, and security threats</li>
            <li className={LI}>Maintain records of correspondence</li>
            <li className={LI}>
              Comply with legal, regulatory, or contractual obligations
            </li>
          </ul>
          <p className={`${BODY} mt-4`}>We do not sell your information.</p>
          <p className={`${BODY} mt-3`}>
            We do not use website form submissions for third-party advertising.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>3. Google Analytics</h2>
          <p className={BODY}>
            We use Google Analytics 4 (&ldquo;GA4&rdquo;) to measure website
            traffic and understand how visitors interact with the site.
          </p>
          <p className={`${BODY} mt-3`}>
            Google Analytics may use cookies or similar technologies to
            distinguish visitors, persist session state, and generate aggregated
            analytics reports. GA4 commonly uses cookies such as:
          </p>
          <PolicyTable
            headers={["Cookie", "Provider", "Purpose", "Default expiration"]}
            rows={[
              [
                "_ga",
                "Google Analytics",
                "Used to distinguish users",
                "2 years",
              ],
              [
                "_ga_NZ4W73J9MG",
                "Google Analytics",
                "Used to persist session state",
                "2 years",
              ],
            ]}
          />
          <p className={`${BODY} mt-4`}>
            Analytics cookies are optional and are not intended to load unless you
            consent through our cookie controls.
          </p>
          <p className={`${BODY} mt-3`}>
            Google states that Google Analytics 4 does not log or store IP
            addresses. Google may use IP addresses transiently for security and
            approximate geographic processing, but GA4 is designed not to make IP
            addresses available in Analytics reporting.
          </p>
          <p className={`${BODY} mt-3`}>
            We do not currently use Google Analytics advertising features, Google
            Signals, remarketing, or Google Ads conversion tracking unless we
            separately disclose and enable those tools through the cookie
            settings.
          </p>
          <p className={`${BODY} mt-3`}>
            You can also use Google&rsquo;s Analytics opt-out browser add-on where
            supported. Google states that the add-on prevents Google Analytics
            JavaScript running on websites from sharing visit activity with Google
            Analytics.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>4. Cookies and similar technologies</h2>
          <p className={BODY}>
            Cookies are small files placed on your browser or device. Similar
            technologies may include scripts, tags, local storage, pixels, or
            other browser-based identifiers.
          </p>
          <p className={`${BODY} mt-3`}>
            We group cookies into the following categories.
          </p>

          <h3 className={H3}>Necessary cookies</h3>
          <p className={BODY}>
            Necessary cookies are required for the website to load, operate,
            secure forms, remember cookie preferences, and prevent abuse. These
            are always active.
          </p>
          <PolicyTable
            headers={["Cookie / storage item", "Purpose", "Duration"]}
            rows={[
              [
                "Cookie consent preference (stored in your browser)",
                "Stores your cookie choices",
                "Persists until you clear it or our consent version changes",
              ],
              [
                "Security or rate-limiting data",
                "Helps prevent spam and abuse",
                "Session to limited duration",
              ],
            ]}
          />

          <h3 className={H3}>Analytics cookies</h3>
          <p className={BODY}>
            Analytics cookies help us understand how visitors use the website.
            These are optional and are off unless you opt in.
          </p>
          <PolicyTable
            headers={["Cookie", "Provider", "Purpose", "Duration"]}
            rows={[
              [
                "_ga",
                "Google Analytics",
                "Distinguishes users for analytics",
                "2 years",
              ],
              [
                "_ga_NZ4W73J9MG",
                "Google Analytics",
                "Persists session state",
                "2 years",
              ],
            ]}
          />

          <h3 className={H3}>Marketing cookies</h3>
          <p className={BODY}>
            We do not currently use marketing cookies for behavioral advertising
            or remarketing.
          </p>
          <p className={`${BODY} mt-3`}>
            If we add marketing, advertising, conversion-tracking, or retargeting
            technologies later, we will update this policy and keep those tools
            off unless you opt in where required.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>5. Cookie choices</h2>
          <p className={BODY}>
            You can manage optional cookies at any time through the Cookie
            Settings control on the website or in the footer.
          </p>
          <p className={`${BODY} mt-3`}>You may:</p>
          <ul className={UL}>
            <li className={LI}>Accept optional analytics cookies</li>
            <li className={LI}>Reject optional analytics cookies</li>
            <li className={LI}>Change your cookie preferences later</li>
            <li className={LI}>Clear cookies through your browser settings</li>
            <li className={LI}>Use browser-level privacy controls or extensions</li>
          </ul>
          <p className={`${BODY} mt-4`}>
            We honor the Global Privacy Control (GPC) signal where detected. If
            your browser sends a GPC signal, optional analytics and marketing
            cookies will remain off by default.
          </p>
          <p className={`${BODY} mt-3`}>
            Browser settings may also allow you to block or delete cookies.
            Blocking necessary cookies may affect website functionality.
          </p>
          <div className="mt-5">
            <CookieSettingsButton className="inline-flex cursor-pointer items-center border border-ivory/20 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-200 hover:border-ivory/50 hover:bg-ivory/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60" />
          </div>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>6. Service providers</h2>
          <p className={BODY}>
            We use service providers to operate the website and process
            inquiries.
          </p>

          <h3 className={H3}>Resend</h3>
          <p className={BODY}>
            We use Resend to transmit website form submissions to Mythos by
            email. Resend may process email addresses, message metadata, and
            message content as needed to deliver those messages.
          </p>

          <h3 className={H3}>Google Analytics</h3>
          <p className={BODY}>
            We use Google Analytics to provide analytics reports about website
            traffic and usage when analytics cookies are accepted.
          </p>

          <h3 className={H3}>Hosting, security, and infrastructure providers</h3>
          <p className={BODY}>
            Our website hosting, deployment, security, and infrastructure
            providers may process limited technical data needed to operate and
            secure the website.
          </p>
          <p className={`${BODY} mt-4`}>
            We require service providers to process information only as needed to
            provide services to us, comply with applicable law, or protect their
            services.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>7. Legal bases for processing</h2>
          <p className={BODY}>
            Where laws such as the GDPR or UK GDPR apply, we rely on the
            following legal bases:
          </p>
          <ul className={UL}>
            <li className={LI}>
              <span className="text-ivory">Consent</span> for optional analytics
              cookies and similar technologies.
            </li>
            <li className={LI}>
              <span className="text-ivory">Legitimate interests</span> for website
              security, spam prevention, basic business communications, and
              responding to inquiries.
            </li>
            <li className={LI}>
              <span className="text-ivory">Contract or pre-contractual steps</span>{" "}
              when you request information about services, demos, partnerships, or
              potential business relationships.
            </li>
            <li className={LI}>
              <span className="text-ivory">Legal obligation</span> where we must
              retain or disclose information to comply with applicable law.
            </li>
          </ul>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>8. Data retention</h2>
          <p className={BODY}>
            We keep information only for as long as reasonably necessary for the
            purposes described in this policy.
          </p>
          <p className={`${BODY} mt-3`}>Typical retention periods are:</p>
          <ul className={UL}>
            <li className={LI}>
              <span className="text-ivory">
                Contact, demo, and investor inquiries:
              </span>{" "}
              retained as long as needed to respond, manage the relationship,
              maintain business records, or comply with legal obligations.
            </li>
            <li className={LI}>
              <span className="text-ivory">
                Security logs and technical metadata:
              </span>{" "}
              retained for a limited period needed for security, troubleshooting,
              and abuse prevention.
            </li>
            <li className={LI}>
              <span className="text-ivory">Cookie consent records:</span> retained
              for the duration needed to remember and document your preferences.
            </li>
            <li className={LI}>
              <span className="text-ivory">Google Analytics data:</span> retained
              according to our Google Analytics settings and Google&rsquo;s
              applicable retention controls.
            </li>
          </ul>
          <p className={`${BODY} mt-4`}>
            Retention periods may vary depending on the nature of the inquiry,
            legal requirements, security needs, and business-record obligations.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>9. How we share information</h2>
          <p className={BODY}>We may share information:</p>
          <ul className={UL}>
            <li className={LI}>
              With service providers who help operate the website, deliver form
              submissions, provide analytics, host the site, or secure our
              systems.
            </li>
            <li className={LI}>
              With professional advisors, such as attorneys, accountants, or
              consultants, where needed.
            </li>
            <li className={LI}>
              In connection with a business transaction, such as financing,
              merger, acquisition, corporate reorganization, or due diligence.
            </li>
            <li className={LI}>
              To comply with law, legal process, court orders, regulatory
              requests, or government requests.
            </li>
            <li className={LI}>
              To protect the rights, safety, property, or security of Mythos, our
              users, our systems, or others.
            </li>
          </ul>
          <p className={`${BODY} mt-4`}>We do not sell personal information.</p>
          <p className={`${BODY} mt-3`}>
            We do not share personal information for cross-context behavioral
            advertising.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>10. Your privacy choices and rights</h2>
          <p className={BODY}>
            Depending on where you live, you may have rights to request that we:
          </p>
          <ul className={UL}>
            <li className={LI}>
              Confirm whether we process information about you
            </li>
            <li className={LI}>Provide access to information you submitted</li>
            <li className={LI}>Correct inaccurate information</li>
            <li className={LI}>
              Delete information, subject to legal or business-record exceptions
            </li>
            <li className={LI}>Restrict or object to certain processing</li>
            <li className={LI}>Withdraw consent for optional cookies</li>
            <li className={LI}>
              Opt out of sale, sharing, targeted advertising, or profiling where
              applicable
            </li>
          </ul>
          <p className={`${BODY} mt-4`}>
            To make a request, contact us at{" "}
            <a
              href="mailto:info@mythosaisecurity.com"
              className="text-bronze underline-offset-4 hover:underline"
            >
              info@mythosaisecurity.com
            </a>
            .
          </p>
          <p className={`${BODY} mt-3`}>
            We may need to verify your request before responding. We will not
            discriminate against you for exercising privacy rights.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>11. International visitors</h2>
          <p className={BODY}>
            Mythos is based in the United States. If you access the website from
            outside the United States, your information may be processed in the
            United States or other jurisdictions where our service providers
            operate.
          </p>
          <p className={`${BODY} mt-3`}>
            Those jurisdictions may have data-protection laws different from those
            in your location.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>12. Security</h2>
          <p className={BODY}>
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect information submitted through the
            website.
          </p>
          <p className={`${BODY} mt-3`}>
            No website, email transmission, or internet-based service can be
            guaranteed to be completely secure. Do not submit sensitive,
            classified, regulated, or highly confidential information through
            public website forms.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>13. Children</h2>
          <p className={BODY}>
            This website is intended for business and professional visitors. It is
            not directed to children, and we do not knowingly collect personal
            information from children under 13.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>14. Changes to this policy</h2>
          <p className={BODY}>
            We may update this Privacy &amp; Cookie Policy from time to time. The
            &ldquo;Last updated&rdquo; date above reflects the latest version.
          </p>
          <p className={`${BODY} mt-3`}>
            If we make material changes to how we collect, use, or share
            information, we will update this page and, where appropriate, provide
            additional notice.
          </p>
        </section>

        <section className={SECTION}>
          <h2 className={H2}>15. Contact</h2>
          <p className={BODY}>
            Questions about this policy or privacy requests can be sent to:
          </p>
          <p className={`${BODY} mt-3`}>
            Mythos AI Security
            <br />
            Email:{" "}
            <a
              href="mailto:info@mythosaisecurity.com"
              className="text-bronze underline-offset-4 hover:underline"
            >
              info@mythosaisecurity.com
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
}
