'use client';

import React, { useRef, useState, useEffect } from "react";

const ShippingSection = () => {
  const services = [
    {
      title: "Port & Liner Agency",
      description:
        "Helping shipping companies navigate the complexities of global shipping as their on-the-ground agent handling everything from ship arrivals, to cargo and departures.",
    },
    {
      title: "Container Management",
      description:
        "Our container management services include tracking, visibility, and maintenance, ensuring your cargo is handled efficiently from start to finish.",
    },
    {
      title: "Freight Forwarding",
      description:
        "Providing global air and ocean services, our freight forwarding solutions ensure seamless door-to-door delivery and customs clearance, making international shipping hassle-free.",
    },
  ];
  const headerRef = useRef(null);
  const [headerInView, setHeaderInView] = useState(false);
  const [isCompletelyHidden, setIsCompletelyHidden] = useState(false);
  const [frameHeight, setFrameHeight] = useState("100vh");
  const [bgSize, setBgSize] = useState("150%");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderInView(entry.intersectionRatio >= 0.65);
      },
      { threshold: 0.65 }
    );

    const hiddenObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCompletelyHidden(!entry.isIntersecting);
        if (!entry.isIntersecting) {
          setBgSize("150%");
          setFrameHeight("100vh");
        }
      },
      { threshold: 0 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
      hiddenObserver.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
        hiddenObserver.unobserve(headerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (headerInView && !isCompletelyHidden) {
      setFrameHeight("60vh");

      setTimeout(() => {
        setBgSize("100%");
      }, 200);

      setTimeout(() => {
        setBgSize("120%");
      }, 1000);
    }
  }, [headerInView, isCompletelyHidden]);

  return (
    <>
      {/* Hero Section */}
      <div
        ref={headerRef}
        className="relative w-full overflow-hidden transition-[height] duration-[1200ms] ease-in-out"
        style={{ height: frameHeight }}
      >
        {/* Background image div */}
        <div
          className="absolute inset-0 transition-[background-size] duration-1000 ease-in-out"
          style={{
            backgroundImage: "url('/images/_shipping.webp')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: bgSize,
          }}
        />

        {/* Left-aligned heading */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl px-4">
            <h1
              className={`transition-all duration-500 ease-in-out font-semibold text-left leading-[0.75] tracking-[0.035] ${
                headerInView
                  ? "text-[10rem] opacity-100 scale-100"
                  : "text-[9rem] opacity-0 scale-90"
              } text-white`} style={{ 
                transform: "translateX(-35%)",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              Seamless
              <br />
              Shipping
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative bg-white text-black">
        <div className="mx-auto max-w-5xl">
          <div className="py-8 md:py-16 px-4 md:px-0">
            <p className="text-lg md:text-2xl mb-8 md:mb-16">
              JPC Group provides end-to-end shipping solutions through our integrated
              shipping services to facilitate local and global shipping movements.
              Our dedication to customer service ensures your goods are transported safely
              and efficiently.
            </p>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-base md:text-xl">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </>
  );
};

export default ShippingSection;
