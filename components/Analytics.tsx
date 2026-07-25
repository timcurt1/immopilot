import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const FATHOM_SITE_ID = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;

/**
 * Renders nothing until NEXT_PUBLIC_PLAUSIBLE_DOMAIN or NEXT_PUBLIC_FATHOM_SITE_ID is set.
 * Both are privacy-friendly, cookie-free analytics — no consent banner needed.
 */
export function Analytics() {
  if (PLAUSIBLE_DOMAIN) {
    return (
      <Script
        defer
        data-domain={PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
    );
  }
  if (FATHOM_SITE_ID) {
    return <Script src="https://cdn.usefathom.com/script.js" data-site={FATHOM_SITE_ID} defer strategy="afterInteractive" />;
  }
  return null;
}
