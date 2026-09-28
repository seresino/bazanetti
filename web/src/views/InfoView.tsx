import React, { useState } from 'react';
import { InterlockingRingsGraphic } from '../components/Icons';
import { CheckCircle2 } from 'lucide-react';

export function InfoView() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    metal: '18k Yellow Gold',
    ringSize: '',
    projectDescription: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.projectDescription.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-16 animate-fade-in">
      
      {/* Massive Graphic BAZANETTI Heading directly matching Desktop - Info.png */}
      <div className="text-center select-none pt-4">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-black uppercase leading-none">
          BAZANETTI
        </h1>
      </div>

      {/* Brand Bio Statement & Ring Emblem Row */}
      <div className="relative max-w-2xl mx-auto text-center space-y-6">
        <p className="text-xs md:text-sm font-bold leading-relaxed text-black/90">
          Founded in London, Bazanetti operates at the intersection of raw geological alchemy and architectural brutalism. Each object and jewel is realised by hand using lost-wax centrifugal casting, unrefined gemstones, and recycled precious bullion to produce singular heirlooms that refuse generic luxury conventions.
        </p>

        {/* Interlocking Rings Graphic floating on top right */}
        <div className="hidden sm:block absolute -right-24 -top-6">
          <InterlockingRingsGraphic className="w-28 h-20 text-black hover:scale-105 transition-transform" />
        </div>
      </div>

      {/* Massive EST.2021 Statement directly matching Desktop - Info.png */}
      <div className="relative py-8 border-y border-dashed border-black/30 flex items-center justify-between">
        <div className="hidden sm:block text-left">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black">
            JEWELLERY<br />&amp;<br />OBJECTS
          </p>
        </div>

        <div className="mx-auto text-center">
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black select-none">
            EST.2021
          </h2>
        </div>

        <div className="hidden sm:block text-right">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black">
            REALISED<br />IN<br />LONDON
          </p>
        </div>
      </div>

      {/* ORDER FORM Section directly matching Desktop - Info.png */}
      <section id="bespoke-order-form" className="max-w-xl mx-auto pt-6 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl md:text-4xl font-black text-black tracking-wider uppercase">
            ORDER FORM
          </h3>
        </div>

        {isSubmitted ? (
          <div className="border border-black bg-black/2 p-8 text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-black mx-auto" />
            <h4 className="text-xl font-black uppercase text-black">
              Inquiry Received
            </h4>
            <p className="text-xs text-black/85 leading-relaxed">
              Thank you, <strong className="text-black">{formData.fullName}</strong>. Your commission brief has been recorded. Our London atelier will review your requirements and get back to you within 48 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  metal: '18k Yellow Gold',
                  ringSize: '',
                  projectDescription: '',
                });
              }}
              className="mt-4 inline-block text-xs font-black uppercase tracking-widest underline cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Field: Full Name */}
            <div className="space-y-2">
              <label 
                htmlFor="input-full-name"
                className="block text-center text-xs md:text-sm font-bold uppercase tracking-wider text-black"
              >
                Full Name
              </label>
              <input
                id="input-full-name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-center py-2 border-b border-black text-sm md:text-base font-medium focus:outline-hidden focus:border-b-2 bg-transparent transition-all"
              />
            </div>

            {/* Field: Email Contact */}
            <div className="space-y-2">
              <label 
                htmlFor="input-email"
                className="block text-center text-xs md:text-sm font-bold uppercase tracking-wider text-black"
              >
                Email Contact
              </label>
              <input
                id="input-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-center py-2 border-b border-black text-sm md:text-base font-medium focus:outline-hidden focus:border-b-2 bg-transparent transition-all"
              />
            </div>

            {/* Field: Metal */}
            <div className="space-y-2">
              <label 
                htmlFor="select-metal"
                className="block text-center text-xs md:text-sm font-bold uppercase tracking-wider text-black"
              >
                Metal
              </label>
              <div className="relative">
                <select
                  id="select-metal"
                  value={formData.metal}
                  onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                  className="w-full text-center py-2 border-b border-black text-sm md:text-base font-medium focus:outline-hidden focus:border-b-2 bg-transparent appearance-none cursor-pointer"
                >
                  <option value="18k Yellow Gold">18k Yellow Gold</option>
                  <option value="14k Yellow Gold">14k Yellow Gold</option>
                  <option value="925 Sterling Silver">925 Sterling Silver</option>
                  <option value="Oxidised Black Silver">Oxidised Black Silver</option>
                  <option value="Platinum (PT950)">Platinum (PT950)</option>
                  <option value="Bespoke Raw Alloy">Bespoke Raw Alloy</option>
                </select>
              </div>
            </div>

            {/* Field: Ring Size */}
            <div className="space-y-2">
              <label 
                htmlFor="input-ring-size"
                className="block text-center text-xs md:text-sm font-bold uppercase tracking-wider text-black"
              >
                Ring Size
              </label>
              <input
                id="input-ring-size"
                type="text"
                value={formData.ringSize}
                onChange={(e) => setFormData({ ...formData, ringSize: e.target.value })}
                className="w-full text-center py-2 border-b border-black text-sm md:text-base font-medium focus:outline-hidden focus:border-b-2 bg-transparent transition-all"
              />
            </div>

            {/* Field: Project Description */}
            <div className="space-y-2">
              <label 
                htmlFor="input-project-description"
                className="block text-center text-xs md:text-sm font-bold uppercase tracking-wider text-black"
              >
                Project Description
              </label>
              <textarea
                id="input-project-description"
                rows={4}
                required
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                className="w-full text-center py-2 border-b border-black text-sm font-medium focus:outline-hidden focus:border-b-2 bg-transparent transition-all resize-none"
              />
            </div>

            {/* Submit Button matching Desktop - Info.png */}
            <div className="pt-6 flex justify-center">
              <button
                id="submit-order-form-button"
                type="submit"
                className="bg-black text-white px-12 py-3.5 text-xs font-black uppercase tracking-[0.3em] hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                SUBMIT
              </button>
            </div>

          </form>
        )}
      </section>

    </div>
  );
}
