import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Placeholder, in the future when a farmer gives a rating, it will go here when we do the funny thing.",
      name: "Farmer Luong",
    },
    {
      quote: "Placeholder, in the future when a farmer gives a rating, it will go here when we do the funny thing.",
      name: "Farmer Trung",
    },
    {
      quote: "Placeholder, in the future when a farmer gives a rating, it will go here when we do the funny thing.",
      name: "Farmer Phuc",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">From Our Valued Customers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon for visual enhancement */}
              <FaQuoteLeft className="text-blue-600 absolute top-4 left-4 text-4xl opacity-10" />
              
              {/* Quote */}
              <p className="text-lg italic text-gray-600 mb-4 leading-relaxed">{`"${testimonial.quote}"`}</p>
              
              {/* Author */}
              <p className="text-xl font-semibold text-gray-800">{`— ${testimonial.name}`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
