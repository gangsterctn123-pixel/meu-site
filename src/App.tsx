import { BonusSection } from "./components/BonusSection";
import { ContentShowcase } from "./components/ContentShowcase";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { IntroStatement } from "./components/IntroStatement";
import { OfferSection } from "./components/OfferSection";
import { Testimonials } from "./components/Testimonials";
import { TrustSection } from "./components/TrustSection";

function App() {
  return (
    <div className="min-h-screen text-foreground">
      <main>
        <Hero />
        <IntroStatement />
        <ContentShowcase />
        <BonusSection />
        <HowItWorks />
        <Testimonials />
        <OfferSection />
        <TrustSection />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
