'use client';

import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

const ThankYouMessage = () => (
  <div className="text-center space-y-4 py-8">
    <h3 className="text-4xl font-medium">Thank you for your account request!</h3>
    <p className="text-gray-600">We'll review your request and get back to you shortly with your account credentials.</p>
  </div>
);

const AccountRequestForm = () => {
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessDetails: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await fetch('https://formsubmit.co/e21af56276f202ce8918c6c09852f23d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Account Request from ${formData.fullName} at ${formData.companyName}`,
          _template: 'box'
        })
      });
      
      if (response.ok) {
        setFormState('submitted');
        setFormData({
          fullName: '',
          companyName: '',
          phone: '',
          email: '',
          businessDetails: ''
        });
      } else {
        setFormState('idle');
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      setFormState('idle');
      alert('Failed to send request. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inputStyles = `w-full p-4 rounded-full outline-none transition-colors duration-200
    placeholder:text-gray-400 bg-white
    border border-gray-300
    focus:border-black focus:ring-0 text-black`;

  if (formState === 'submitted') {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-[32px] shadow-sm border border-gray-200 p-8">
        <ThankYouMessage />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-[32px] shadow-sm border border-gray-200 p-8">
      <form 
        onSubmit={handleSubmit} 
        className={`space-y-6 transition-opacity duration-300 ${
          formState === 'submitting' ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className={inputStyles}
            value={formData.fullName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
          />
          
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            required
            className={inputStyles}
            value={formData.companyName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className={inputStyles}
            value={formData.phone}
            onChange={handleChange}
            disabled={formState === 'submitting'}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Business Email Address"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleChange}
            disabled={formState === 'submitting'}
          />
        </div>

        <textarea
          name="businessDetails"
          placeholder="Please ensure you use your business email address and provide details about you and your business."
          required
          rows={6}
          className={`w-full p-4 rounded-[24px] outline-none transition-colors duration-200
            placeholder:text-gray-400 bg-white
            border border-gray-300
            focus:border-black focus:ring-0
            resize-none text-black`}
          value={formData.businessDetails}
          onChange={handleChange}
          disabled={formState === 'submitting'}
        />

        <div className="flex justify-center pt-2">
          {formState === 'submitting' ? (
            <div className="py-4">
              <LoadingSpinner />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black text-white px-12 py-3 rounded-full hover:bg-white hover:text-black hover:border hover:border-black transition-all shadow-sm hover:shadow-md"
            >
              Submit Account Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountRequestForm;