import React from 'react';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import ShippingSection from '../components/ShippingSection';
import MiningSection from '../components/MiningSection';
import AgricultureSection from '../components/AgricultureSection';
import ContactForm from '../components/ContactForm';
export default function Home() {
  return (
    <div>
      <Hero />
      <Introduction />
      <ShippingSection />
      <MiningSection />
      <AgricultureSection />
      <ContactForm />
    </div>
  );
}
