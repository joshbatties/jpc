import React from 'react';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import ShippingSection from './components/ShippingSection';
import MiningSection from './components/MiningSection';
import AgricultureSection from './components/AgricultureSection';
export default function Home() {
  return (
    <div>
      <Hero />
      <Introduction />
      <ShippingSection />
      <MiningSection />
      <AgricultureSection />
    </div>
  );
}
