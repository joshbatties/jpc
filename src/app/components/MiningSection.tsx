import React from "react";

const MiningSection = () => {
  const services = [
    {
      title: "Capital",
      description: "Bridging the financial gap with with expert capital facilitation for mining ventures."
    },
    {
      title: "Trade",
      description: "Our comprehensive trade solutions navigate the complexities of global markets."
    },
    {
      title: "Equipment",
      description: "A wide range of telematics enabled, advanced mining equipment designed to enhance productivity and safety."
    }
  ];

  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col md:flex-row">
          {/* Text Section with proper padding */}
          <div className="w-full md:w-1/2 flex items-center bg-white h-[160px] md:h-[300px] pl-4 md:pl-0">
            <h1 className="text-7xl md:text-7xl font-semibold text-black">
              Mining<br />Innovation
            </h1>
          </div>
          
          {/* Image Section - Reduced size, no cropping */}
          <div className="w-full md:w-1/2 h-auto md:h-[300px] flex justify-end">
            <img 
              src="/images/mining-innovation.avif"
              alt="Mining Innovation"
              className="w-[70%] md:w-full h-[140px] md:h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="py-8 md:py-16 px-4 md:px-0">
          {/* Main Description */}
          <p className="text-lg md:text-2xl mb-8 md:mb-16">
            JPC Group provides capital and trade services for the mining industry helping to forge a path between raw potential and real-world value through safe and sustainable practices.
          </p>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="border-t border-gray-200 pt-8"
              >
                <h2 className="text-xl md:text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-base md:text-xl">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiningSection;