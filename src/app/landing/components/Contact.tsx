// src/app/landing/Contact.tsx
export default function Contact() {
    return (
      <section
        id="contact"
        className="min-h-screen w-full max-w-7xl mx-auto py-24 px-4 flex flex-col justify-center text-center scroll-snap-start"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6" data-aos="fade-right">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-8" data-aos="fade-right">
          Have questions? Our team is here to help!
        </p>
        <a
          href="mailto:info@hoversprite.com"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          data-aos="zoom-in"
        >
          Contact Us Now
        </a>
      </section>
    );
  }
  