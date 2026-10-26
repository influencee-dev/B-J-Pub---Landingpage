import { Benefits } from "@/components/Benefits";
import { BrandStory } from "@/components/BrandStory";
import { CtaTracker } from "@/components/CtaTracker";
import { Economics } from "@/components/Economics";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Formats } from "@/components/Formats";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IdealCandidate } from "@/components/IdealCandidate";
import { LeadForm } from "@/components/LeadForm";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { PilotLocation } from "@/components/PilotLocation";
import { Process } from "@/components/Process";
import { Product } from "@/components/Product";
import { Scenario } from "@/components/Scenario";
import { Support } from "@/components/Support";
import { investmentBands, marketingConsent, privacyPolicyUrl } from "@/lib/config";

// Lo stato del modulo dipende dalle variabili d'ambiente del server: la pagina viene valutata a runtime.
export const dynamic = "force-dynamic";

export default function Home() {
  // Il modulo invia davvero solo se webhook CRM e informativa privacy sono configurati.
  // L'URL del webhook resta sul server: al browser arriva solo questo booleano.
  const isLive = Boolean(process.env.LEAD_WEBHOOK_URL?.trim()) && privacyPolicyUrl !== null;

  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        <BrandStory />
        <Product />
        <Benefits />
        <Formats />
        <Economics />
        <Scenario />
        <Support />
        <IdealCandidate />
        <Process />
        <PilotLocation />
        <FAQ />
        <LeadForm
          isLive={isLive}
          privacyUrl={privacyPolicyUrl}
          bands={investmentBands}
          marketing={marketingConsent}
        />
      </main>
      <Footer />
      <MobileStickyCTA />
      <CtaTracker />
    </>
  );
}
