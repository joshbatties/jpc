import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import ShippingSection from '../components/ShippingSection';
import MiningSection from '../components/MiningSection';
import AgricultureSection from '../components/AgricultureSection';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Introduction />
      <ShippingSection />
      <MiningSection />
      <AgricultureSection />
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
}