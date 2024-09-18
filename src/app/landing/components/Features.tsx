import Image from "next/image";

export default function Features() {
  return (
    <section
      id="services"
      className="min-h-screen w-full max-w-7xl mx-auto py-16 px-4 flex flex-col justify-center bg-gray-50"
    >
      {/* Features Section */}
      <h2
        className="text-4xl font-bold text-gray-900 text-center mb-12"
        data-aos="fade-right"
      >
        Why HoverSprite?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Efficient Spraying */}
        <div
          className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
        >
          <div className="w-24 h-24 mx-auto mb-4">
            <Image
              src="/images/landing-page/feature1.jpg"
              alt="Efficient Spraying"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Efficient Spraying
          </h3>
          <p className="text-gray-600">
            Advanced drones for faster, accurate, and eco-friendly spraying
            services.
          </p>
        </div>

        {/* Farmer-Friendly */}
        <div
          className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
        >
          <div className="w-24 h-24 mx-auto mb-4">
            <Image
              src="/images/landing-page/feature2.jpg"
              alt="Farmer-Friendly"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Farmer-Friendly
          </h3>
          <p className="text-gray-600">
            Simple and intuitive interface designed for all technical skill
            levels.
          </p>
        </div>

        {/* Flexible Scheduling */}
        <div
          className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
        >
          <div className="w-24 h-24 mx-auto mb-4">
            <Image
              src="/images/landing-page/feature3.jpg"
              alt="Flexible Scheduling"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Flexible Scheduling
          </h3>
          <p className="text-gray-600">
            Book spray sessions at your convenience.
          </p>
        </div>

        {/* Organic Solutions */}
        <div
          className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          data-aos="zoom-in"
        >
          <div className="w-24 h-24 mx-auto mb-4">
            <Image
              src="/images/landing-page/feature4.jpg"
              alt="Organic Solutions"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Organic Solutions
          </h3>
          <p className="text-gray-600">
            Environmentally safe, organic sprays for healthier crops.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <section id="about-us" className="py-12 mt-16 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* About Us Text */}
            <div className="flex-1" data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About HoverSprite
              </h2>
              <p className="text-gray-600 mb-4 text-justify">
                HoverSprite is a leading provider of innovative agricultural
                solutions, leveraging cutting-edge drone technology to enhance
                the efficiency and effectiveness of crop spraying. With a focus
                on eco-friendly practices, our services are designed to cater to
                farmers of all technical skill levels, helping them achieve
                higher yields while preserving the environment.
              </p>
              <p className="text-gray-600 text-justify">
                Our mission is to revolutionize the agricultural industry by
                providing accessible, accurate, and sustainable spraying
                services that promote healthier crops and a healthier planet.
              </p>
            </div>

            {/* About Us Image */}
            <div className="flex-1" data-aos="fade-left">
              <Image
                src="/images/landing-page/about-us.jpg"
                alt="About HoverSprite"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
