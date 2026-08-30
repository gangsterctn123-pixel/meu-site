import { About } from "./components/About";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LocationMap } from "./components/LocationMap";
import { MenuHighlights } from "./components/MenuHighlights";
import { Reviews } from "./components/Reviews";
import { ServiceOptions } from "./components/ServiceOptions";

function App() {
  return (
    <div className="min-h-screen text-ink">
      <Header />
      <main>
        <Hero />
        <ServiceOptions />
        <MenuHighlights />
        <About />
        <Gallery />
        <Reviews />
        <LocationMap />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
