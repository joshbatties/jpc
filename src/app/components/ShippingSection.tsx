import React from "react";

const ShippingSection = () => {
  const services = [
    {
      title: "Port & Liner Agency",
      description: "Helping shipping companies navigate the complexities of global shipping as their on-the-ground agent handling everything from ship arrivals, to cargo and departures."
    },
    {
      title: "Container Management",
      description: "Our container management services include tracking, visibility, and maintenance, ensuring your cargo is handled efficiently from start to finish."
    },
    {
      title: "Freight Forwarding",
      description: "Providing global air and ocean services, our freight forwarding solutions ensure seamless door-to-door delivery and customs clearance, making international shipping hassle-free."
    }
  ];

  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col md:flex-row">
          {/* Text Section with proper padding */}
          <div className="w-full md:w-1/2 flex items-center bg-white h-[160px] md:h-[300px] pl-4 md:pl-0">
            <h1 className="text-7xl md:text-7xl font-semibold text-black">
              Seamless<br />Shipping
            </h1>
          </div>
          
          {/* Image Section - Reduced size, no cropping */}
          <div className="w-full md:w-1/2 h-auto md:h-[300px] flex justify-end">
            <img 
              src="/images/seamless-shipping.jpg"
              alt="Seamless Shipping"
              className="w-[70%] md:w-full h-[140px] md:h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="py-8 md:py-16 px-4 md:px-0">
          {/* Main Description */}
          <p className="text-lg md:text-2xl mb-8 md:mb-16">
            JPC Group provides end-to-end shipping solutions through our integrated shipping services to facilitate local and global shipping movements. Our dedication to customer service ensures your goods are transported safely and efficiently.
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

export default ShippingSection;