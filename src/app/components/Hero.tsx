import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-screen w-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Centered Logo (Doubled Size) */}
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="/icons/jpc-logomark.svg"
          alt="JPC Logomark"
          className="w-64 md:w-96"
        />
      </div>
    </section>
  );
};

export default Hero;