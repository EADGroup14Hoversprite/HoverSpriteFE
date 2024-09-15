import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="bg-gray-50 overflow-y-auto h-screen">
      <Header />
      <div className="snap-container">
        <section className="h-screen">
          <Hero />
        </section>
        <section className="h-auto">
          <Features />
        </section>
        <section className="h-auto">
          <Testimonials />
        </section>
        <section className="h-auto">
          <Contact />
        </section>
        <section className="h-auto">
          <Footer />
        </section>
      </div>
    </main>
  );
}
