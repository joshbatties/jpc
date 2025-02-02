import React from "react";

const AgricultureSection = () => {
  const services = [
    {
      title: "Trade",
      description: "We provide state-of-the-art agricultural machinery, including tractors, harvesters, and planting equipment. Our machinery is designed to enhance productivity and efficiency, helping farmers achieve higher yields with less effort."
    },
    {
      title: "Facilitation",
      description: "Our advanced irrigation systems ensure optimal water usage, promoting healthier crops and conserving valuable resources. From drip irrigation to advanced sprinkler systems, JPC Group offers solutions tailored to diverse agricultural needs."
    }
  ];

  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col md:flex-row">
          {/* Text Section with proper padding */}
          <div className="w-full md:w-1/2 flex items-center bg-white h-[160px] md:h-[300px] pl-4 md:pl-0">
            <h1 className="text-7xl md:text-7xl font-semibold text-black">
              Cultivating<br />Progress
            </h1>
          </div>
          
          {/* Image Section with overflow allowed */}
          <div className="w-full md:w-1/2 h-auto md:h-[300px] flex justify-end overflow-visible">
            <div className="relative w-[93%] md:w-[133%] h-[186px] md:h-full">
              <img 
                src="/images/cultivating-progress.jpg"
                alt="Cultivating Progress"
                className="absolute top-0 right-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-8 md:py-16 px-4 md:px-0">
          {/* Main Description */}
          <p className="text-lg md:text-2xl mb-8 md:mb-16">
            JPC Group promotes efficiency and transparency for agricultural commodities, streamlining the cross-border movement and resilience in trade facilitation.
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

export default AgricultureSection;