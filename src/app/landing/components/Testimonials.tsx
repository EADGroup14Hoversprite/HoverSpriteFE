export default function Testimonials() {
    return (
      <section
        id="testimonials"
        className="min-h-screen w-full max-w-7xl mx-auto py-24 px-4 flex flex-col justify-center bg-gray-100 scroll-snap-start"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-aos="fade-right">
          From Our Valued Customers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"Placeholder, in the future when a farmer give a rating, it will goes here when we do the funny thing."</p>
            <p className="text-gray-900 font-semibold">— Farmer Luong</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"Placeholder, in the future when a farmer give a rating, it will goes here when we do the funny thing."</p>
            <p className="text-gray-900 font-semibold">— Farmer Trung</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="text-gray-600 mb-4">"Placeholder, in the future when a farmer give a rating, it will goes here when we do the funny thing."</p>
            <p className="text-gray-900 font-semibold">— Farmer Phuc</p>
          </div>
        </div>
      </section>
    );
  }
  