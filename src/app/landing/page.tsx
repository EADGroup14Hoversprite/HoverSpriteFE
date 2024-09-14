// src/app/landing/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function LandingPage() {
    return (
      <main className="bg-gray-50 overflow-y-auto h-screen scroll-snap-y scroll-snap-mandatory">
        <Header />
        <div className="snap-container">
          <Hero />
          <Features />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      </main>
    );
  }
