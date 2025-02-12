// app/tracking/individual/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Search, RotateCcw, Building2, HelpCircle } from 'lucide-react';
import { useTracking } from '@/hooks/useTracking';
import type { TrackingParams } from '@/lib/types/api';
import ShipmentResults from '../../../components/tracking/ShipmentResults';
import HelpForm from '../../../components/tracking/HelpForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';

const normalizeBookingNumber = (input: string): string => {
  const cleaned = input.trim().toUpperCase();
  
  if (/^S\d{4}$/.test(cleaned)) {
    return `S0000${cleaned.slice(1)}`;
  }
  return cleaned;
};

const ShipmentTracker: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [showHelpForm, setShowHelpForm] = useState(false);

  const { data, error, loading, isSearching, searchTracking, clearSearch } = useTracking();

  const handleSearch = useCallback(() => {
    if (!inputValue.trim() || isSearching) return;
  
    const normalizedInput = normalizeBookingNumber(inputValue);
    const params: TrackingParams = { trackingNumber: normalizedInput };
    searchTracking(params);
  }, [inputValue, isSearching, searchTracking]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && !isSearching) {
      handleSearch();
    }
  }, [handleSearch, inputValue, isSearching]);

  const clearInput = useCallback(() => {
    setInputValue('');
    clearSearch();
  }, [clearSearch]);

  const placeholderText = "Enter your container, PO or Booking number";

  return (
    <div className="flex-1 flex flex-col items-center pt-16 md:pt-32 px-4 md:px-6 font-['Urbanist'] min-h-0 bg-white">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 tracking-tight text-black">
        Track a shipment
      </h1>

      <div className="w-full max-w-2xl lg:max-w-4xl mb-16">
        <div className="relative mb-8 md:mb-12">
          <div className="flex items-center h-12 md:h-14 rounded-full border border-gray-200 shadow-sm hover:shadow-lg focus-within:shadow-lg pr-2 pl-4 transition-all duration-200 bg-transparent">
            <button
              onClick={handleSearch}
              disabled={loading || !inputValue.trim()}
              className="text-gray-400 hover:scale-110 transition-transform"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              type="text"
              className="flex-grow px-2 md:px-4 outline-none text-sm md:text-lg text-black"
              placeholder={window.innerWidth > 768 ? placeholderText : ''}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button 
              onClick={clearInput}
              className="text-gray-400 hover:scale-110 transition-transform mr-2"
              disabled={loading || !inputValue}
              aria-label="Clear input"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSearch}
              disabled={loading || !inputValue.trim()}
              className="bg-black text-white px-6 md:px-8 py-2 rounded-full hover:bg-gray-200 hover:text-black transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center md:hidden">
            {placeholderText}
          </div>
          {error && (
            <div className="absolute top-full mt-2 text-sm text-red-600 w-full text-center">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {!loading && data && (
          <ShipmentResults data={data} />
        )}

        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex flex-col items-center w-44">
            <button 
              onClick={() => router.push('/tracking/login')}
              className="flex flex-col items-center group transition-transform duration-200 hover:scale-105"
              disabled={loading}
            >
              <div className="p-5 rounded-full bg-gray-50 group-hover:bg-gray-100 group-hover:shadow-md transition-all duration-200">
                <Building2 className="w-7 h-7 text-gray-600" />
              </div>
            </button>
            <h2 className="text-sm font-medium text-gray-900 mt-3 mb-1">
              Company View
            </h2>
            <p className="text-xs text-gray-500 text-center">
              See all your shipments
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
      </div>
    </div>
  );
};

export default ShipmentTracker;