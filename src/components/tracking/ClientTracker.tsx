'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ShipmentTracker = dynamic(() => import('./ShipmentTracker'), {
  ssr: false
});

export default function ClientTracker() {
  return (
    <div>
      <ShipmentTracker />
    </div>
  );
}