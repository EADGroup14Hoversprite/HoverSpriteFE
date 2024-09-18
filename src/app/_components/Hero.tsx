export default function Hero() {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/landing-page/hero-background.jpg')`, // Update with your image path
      }}
      id="hero"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight md:leading-tight drop-shadow-md">
          Professional Organic Spraying Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed drop-shadow-md">
          Enhancing agriculture with eco-friendly drone technology for farmers of all technical skill levels.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <a
            href="#services"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-transparent border border-gray-300 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
