import Header from "@/app/_components/Header";
import Hero from "@/app/_components/Hero";
import Features from "@/app/_components/Features";
import Testimonials from "@/app/_components/Testimonials";
import Contact from "@/app/_components/Contact";
import Footer from "@/app/_components/Footer";

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
