// src/app/landing/Hero.tsx
export default function Hero() {
    return (
      <section
        className="min-h-screen w-full max-w-7xl mx-auto text-center py-24 px-4 flex flex-col justify-center items-center scroll-snap-start"
        id="hero"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6" data-aos="fade-up">
          Professional Organic Spraying Solutions
        </h1>
        <p className="text-lg text-gray-600 mb-12" data-aos="fade-up">
          Enhancing agriculture with eco-friendly drone technology for farmers of all technical skill levels.
        </p>
        <div className="flex justify-center gap-4" data-aos="fade-up">
          <a href="#services" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
            Explore Services
          </a>
          <a href="#contact" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 transition">
            Contact Us
          </a>
        </div>
      </section>
    );
  }
  