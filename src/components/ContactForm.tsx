'use client';

import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ThankYouMessage = () => (
  <div className="space-y-4 py-8">
    <h3 className="text-4xl font-medium">Thank you for reaching out!</h3>
    <p className="text-black">Your message has been sent. Please monitor your email, our team will get back to you ASAP.</p>
  </div>
);

const ContactForm = () => {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'submitted'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiry: ''
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
          _subject: `New Help Request from ${formData.fullName}`,
          _template: 'box'
        })
      });
      
      if (response.ok) {
        setFormState('submitted');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          inquiry: ''
        });
      } else {
        setFormState('idle');
        alert('Failed to send message. Please check your form and try again.');
      }
    } catch (error) {
      setFormState('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inputStyles = `w-full p-4 rounded-full outline-none transition-all duration-200
    placeholder:text-gray-400 bg-white
    border border-gray-200
    focus:border-black`;

  const content = formState === 'submitted' ? (
    <div className="w-full bg-white rounded-[32px] shadow-sm border border-gray-200 p-8">
      <ThankYouMessage />
    </div>
  ) : (
    <div className="w-full bg-white rounded-[32px] shadow-sm border border-gray-200 p-8">
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
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            className={inputStyles}
            value={formData.phone}
            onChange={handleChange}
            disabled={formState === 'submitting'}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className={inputStyles}
          value={formData.email}
          onChange={handleChange}
          disabled={formState === 'submitting'}
        />

        <textarea
          name="inquiry"
          placeholder="Please provide a short inquiry for us to understand your needs"
          required
          rows={6}
          className={`w-full p-4 rounded-[24px] outline-none transition-all duration-200
            placeholder:text-gray-400 bg-white
            border border-gray-200
            focus:border-black
            resize-none`}
          value={formData.inquiry}
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
              className="bg-black text-white px-12 py-3 rounded-full hover:bg-gray-200 hover:text-black transition-all shadow-sm hover:shadow-md"
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div className="bg-white min-h-screen w-full py-12">
      <div className="mx-auto max-w-5xl px-4 md:px-0">
        <h2 className="text-5xl font-bold text-black text-left mb-8">Contact Us</h2>
        {content}
      </div>
    </div>
  );
};

export default ContactForm;