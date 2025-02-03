'use client';

import React, { useRef, useState, useEffect } from "react";

const TRANSITION_BREAKPOINT = 1640;

const MiningSection = () => {
  const services = [
    {
      title: "Capital",
      description:
        "Bridging the financial gap with with expert capital facilitation for mining ventures.",
    },
    {
      title: "Trade",
      description:
        "Our comprehensive trade solutions navigate the complexities of global markets.",
    },
    {
      title: "Equipment",
      description:
        "A wide range of telematics enabled, advanced mining equipment designed to enhance productivity and safety.",
    },
  ];
  
  const headerRef = useRef(null);
  const [headerInView, setHeaderInView] = useState(false);
  const [isCompletelyHidden, setIsCompletelyHidden] = useState(false);
  const [frameHeight, setFrameHeight] = useState("100vh");
  const [bgSize, setBgSize] = useState("150%");
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Check if we're on a large enough screen for transitions
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= TRANSITION_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) {
      setFrameHeight("42vh"); // 70% of original 60vh for mobile/tablet
      setBgSize("cover");
      return;
    }

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
  }, [isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen) return;

    if (headerInView && !isCompletelyHidden) {
      setFrameHeight("60vh");

      setTimeout(() => {
        setBgSize("100%");
      }, 200);

      setTimeout(() => {
        setBgSize("120%");
      }, 1000);
    }
  }, [headerInView, isCompletelyHidden, isLargeScreen]);

  return (
    <section id="mining-section">
      {/* Hero Section */}
      <div
        ref={headerRef}
        className={`relative w-full overflow-hidden ${
          isLargeScreen ? "transition-[height] duration-[1200ms] ease-in-out" : ""
        }`}
        style={{ height: frameHeight }}
      >
        {/* Background image div */}
        <div
          className={`absolute inset-0 ${
            isLargeScreen ? "transition-[background-size] duration-1000 ease-in-out" : ""
          }`}
          style={{
            backgroundImage: "url('/images/_mining.webp')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: bgSize,
          }}
        />

        {/* Left-aligned heading */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-5xl px-4">
            <h1
              className={`font-semibold text-left leading-[0.80] tracking-[0.035] text-white
                ${isLargeScreen 
                  ? `transition-all duration-500 ease-in-out ${
                      headerInView
                        ? "text-[10rem] opacity-100 scale-100"
                        : "text-[9rem] opacity-0 scale-90"
                    }`
                  : "text-7xl md:text-[9.5rem] 2xl:text-[10rem]"
                }`}
              style={{ 
                transform: isLargeScreen ? "translateX(-35%)" : "none",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              Mining
              <br />
              Innovation
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="relative bg-white text-black">
        <div className="mx-auto max-w-5xl">
          <div className="py-8 md:py-16 px-4 md:px-0">
            <p className="text-lg md:text-2xl mb-8 md:mb-16">
            JPC Group provides capital and trade services for the mining industry helping to forge a path between raw potential and real-world value through safe and sustainable practices.
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
    </section>
  );
};

export default MiningSection;