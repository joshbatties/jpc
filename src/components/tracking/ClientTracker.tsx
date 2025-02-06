'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';

const ShipmentTracker = dynamic(() => import('./ShipmentTracker'), {
  ssr: false
});

export default function ClientTracker() {
  return (
    <div>
      <Header />
      <ShipmentTracker />
    </div>
  );
}