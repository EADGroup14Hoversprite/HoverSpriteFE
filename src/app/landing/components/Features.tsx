// src/app/landing/Features.tsx
import Image from "next/image";

export default function Features() {
  return (
    <section
      id="services"
      className="min-h-screen w-full max-w-7xl mx-auto py-24 px-4 flex flex-col justify-center scroll-snap-start"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-aos="fade-right">
        Why HoverSprite?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
          <Image src="/drone-icon.svg" alt="Drone" width={80} height={80} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Efficient Spraying</h3>
          <p className="text-gray-600">Advanced drones for faster, accurate, and eco-friendly spraying services.</p>
        </div>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
          <Image src="/farmer-icon.svg" alt="Farmer" width={80} height={80} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Farmer-Friendly</h3>
          <p className="text-gray-600">Simple and intuitive interface designed for all technical skill levels.</p>
        </div>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
          <Image src="/calendar-icon.svg" alt="Calendar" width={80} height={80} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Scheduling</h3>
          <p className="text-gray-600">Book spray sessions at your convenience.</p>
        </div>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg" data-aos="zoom-in">
          <Image src="/eco-friendly-icon.svg" alt="Eco-Friendly" width={80} height={80} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Organic Solutions</h3>
          <p className="text-gray-600">Environmentally safe, organic sprays for healthier crops.</p>
        </div>
      </div>
    </section>
  );
}
