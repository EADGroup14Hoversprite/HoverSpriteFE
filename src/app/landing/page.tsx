// src/app/landing/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="bg-gray-50 scroll-smooth scroll-snap-y scroll-snap-mandatory">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
