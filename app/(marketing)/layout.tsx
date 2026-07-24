import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { StickyCtaBar } from "@/components/marketing/StickyCtaBar";
import { ExitIntentModal } from "@/components/marketing/ExitIntentModal";
import { CookieNotice } from "@/components/marketing/CookieNotice";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <StickyCtaBar />
      <ExitIntentModal />
      <CookieNotice />
    </div>
  );
}
