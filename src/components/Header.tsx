"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setIsLogoVisible(scrollPosition > heroHeight);
      setIsDark(scrollPosition > heroHeight);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    if (pathname !== '/') {
      router.push('/#contact');
      return;
    }
    
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonClasses = `px-4 md:px-8 py-3 text-2xl md:text-3xl font-medium transition-all duration-200 rounded-full hover:scale-105
    ${isDark 
      ? 'text-black hover:text-gray-600' 
      : 'text-white hover:text-gray-300'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center py-6 px-2 md:px-4 z-50">
      {/* Left button */}
      <button
        onClick={handleContactClick}
        className={buttonClasses}
      >
        Contact
      </button>

      {/* Center logo */}
      <a
        href="https://jpcgroup.com"
        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg ${
          isLogoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <img
          src="/images/jpc-logo.png"
          alt="JPC International"
          className="h-7 md:h-10"
        />
      </a>

      {/* Right button */}
      <button
        onClick={() => router.push('/tracking')}
        className={buttonClasses}
      >
        Track
      </button>

      {/* Background that appears with the logo */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-white transition-opacity duration-200 -z-10 ${
          isLogoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  );
};

export default Header;