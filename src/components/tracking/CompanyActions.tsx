'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ship, HelpCircle } from 'lucide-react';
import HelpForm from './HelpForm';

export default function CompanyActions() {
  const [showHelpForm, setShowHelpForm] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center space-x-8 mt-8">
        <div className="flex flex-col items-center w-44">
          <button
            onClick={() => router.push('/tracking')}
            className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
          >
            <div className="p-5 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:shadow-md transition-all duration-200">
              <Ship className="w-7 h-7 text-gray-600" />
            </div>
          </button>
          <h2 className="text-sm font-medium text-gray-900 mt-3 mb-1">
            Track a Shipment
          </h2>
          <p className="text-xs text-gray-500 text-center">
            Search by container, PO or Booking number
          </p>
        </div>
        <div className="flex flex-col items-center w-44">
          <button
            onClick={() => setShowHelpForm(!showHelpForm)}
            className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
          >
            <div className="p-5 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:shadow-md transition-all duration-200">
              <HelpCircle className="w-7 h-7 text-gray-600" />
            </div>
          </button>
          <h2 className="text-sm font-medium text-gray-900 mt-3 mb-1">
            Need Help Tracking?
          </h2>
          <p className="text-xs text-gray-500 text-center">
            Speak to one of our team
          </p>
        </div>
      </div>
      {showHelpForm && <div className="mt-8"><HelpForm /></div>}
    </>
  );
}