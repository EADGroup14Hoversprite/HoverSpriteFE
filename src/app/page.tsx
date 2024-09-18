import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";

import Testimonials from "./_components/Testimonials";

import Footer from "./_components/Footer";
import Contact from "./_components/Footer";
import Rest from "./_components/Footer";

export default function App() {
  return (
    <main className="bg-gray-50 overflow-y-auto h-screen scroll-snap-y scroll-snap-mandatory">
      <Header />
      <div className="snap-container">
        <Hero />
        <Features />
        <Testimonials />
        <Contact />
        <Footer />
        <Rest />
      </div>
    </main>
  );
}
