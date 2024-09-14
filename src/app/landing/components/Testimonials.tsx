// src/app/landing/Testimonials.tsx
export default function Testimonials() {
    return (
      <section
        id="testimonials"
        className="min-h-screen w-full max-w-7xl mx-auto py-24 px-4 flex flex-col justify-center bg-gray-100 scroll-snap-start"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-aos="fade-right">
          What Our Farmers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"HoverSprite's drone service saved me so much time and effort. My crops have never been healthier!"</p>
            <p className="text-gray-900 font-semibold">— Farmer Nguyen</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"Fast, efficient, and environmentally friendly. Couldn't ask for more!"</p>
            <p className="text-gray-900 font-semibold">— Farmer Tran</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"A service that's easy to use even for someone like me with no tech experience."</p>
            <p className="text-gray-900 font-semibold">— Farmer Le</p>
          </div>
        </div>
      </section>
    );
  }
  