'use client';

import React from "react";

const Introduction = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    { 
      src: "/images/agriculture.webp", 
      label: "Agriculture",
      sectionId: "agriculture-section"
    },
    { 
      src: "/images/mining.webp", 
      label: "Mining",
      sectionId: "mining-section"
    },
    { 
      src: "/images/shipping.webp", 
      label: "Shipping",
      sectionId: "shipping-section"
    },
  ];

  return (
    <section className="bg-white text-black text-center pt-48 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="max-w-[1200px] mx-auto text-4xl md:text-7xl font-medium mb-32">
          JPC Group is a diversified group of companies with our head office located in Melbourne, Australia.
        </h1>
        <p className="text-3xl md:text-6xl mb-8">
          A leader in integrated solutions:
        </p>
        <div className="mx-auto max-w-5xl">
          <div className="border-t border-gray-300 mb-12 w-[95%] mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-center transition-transform duration-200 hover:scale-105 focus:outline-none"
                aria-label={`Navigate to ${item.label} section`}
              >
                <div className="relative group">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-[65%] md:w-[230px] mx-auto rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
                </div>
                <p className="text-2xl md:text-3xl font-bold mt-4">{item.label}</p>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-12 w-[95%] mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;