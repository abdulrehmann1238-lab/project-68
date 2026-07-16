'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, Layout, 
  Smartphone, Monitor, Tablet, HelpCircle, Download, CheckCircle
} from 'lucide-react';
import { AuditReport, RedesignConcept } from '@/lib/mockData';

interface DashboardRedesignProps {
  report: AuditReport;
}

export default function DashboardRedesign({ report }: DashboardRedesignProps) {
  const [selectedConcept, setSelectedConcept] = useState<RedesignConcept | null>(null);
  const [activeConceptId, setActiveConceptId] = useState('concept-a');
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 %
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeConcept = report.redesignConcepts.find(c => c.id === activeConceptId) || report.redesignConcepts[0];

  // Drag handlers for the Before/After slider
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleStartDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    
    if ('touches' in e) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Safe release of events on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* View Header */}
      <div className="border-b border-stone-border pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
            Studio Engine
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
            AI Redesign Studio
          </h1>
          <p className="text-xs text-sage mt-1">
            Transforming standard templates into bespoke luxury experiences driven by compassion.
          </p>
        </div>

        <div className="flex space-x-2 shrink-0">
          <button 
            onClick={() => setViewportMode('desktop')}
            className={`p-2 rounded border transition-all ${
              viewportMode === 'desktop' ? 'bg-white text-forest border-forest' : 'text-sage border-stone-border hover:text-forest'
            }`}
            title="Desktop Layout"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewportMode('mobile')}
            className={`p-2 rounded border transition-all ${
              viewportMode === 'mobile' ? 'bg-white text-forest border-forest' : 'text-sage border-stone-border hover:text-forest'
            }`}
            title="Mobile Layout"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Concept Selector Luxury Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {report.redesignConcepts.map((concept) => {
          const isActive = concept.id === activeConceptId;
          return (
            <div
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`bg-white border rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                isActive 
                  ? 'border-forest ring-1 ring-forest shadow-md' 
                  : 'border-stone-border hover:border-gold hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-sans font-medium tracking-wide uppercase px-2 py-0.5 rounded ${
                    isActive ? 'bg-forest/10 text-forest' : 'bg-stone-bg text-sage'
                  }`}>
                    {concept.focusArea}
                  </span>
                  {isActive && <Sparkles className="w-4 h-4 text-forest" />}
                </div>

                <h3 className="font-serif text-base text-forest font-bold leading-tight group-hover:text-gold transition-colors">
                  {concept.name}
                </h3>
                <p className="text-[10px] text-sage italic mt-0.5 font-medium">{concept.tagline}</p>
                <p className="text-xs text-sage mt-3 leading-relaxed">
                  {concept.description}
                </p>
              </div>

              <div className="border-t border-stone-border mt-5 pt-3 flex justify-between items-center text-[10px] text-sage">
                <span>Theme: <span className="font-medium text-forest">{concept.theme.split(' and ')[0]}</span></span>
                <span className="font-medium text-forest group-hover:translate-x-0.5 transition-transform flex items-center">
                  Preview Design
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Before / After Drag Simulator */}
      <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
        
        {/* Mockup Title bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-stone-border pb-4 mb-6 gap-3">
          <div>
            <h3 className="font-serif text-sm text-forest font-bold">
              Bespoke Redesign Sandbox: <span className="italic font-light">{activeConcept.name}</span>
            </h3>
            <p className="text-[10px] text-sage">
              Drag the center slider to inspect structural differences. <span className="font-medium text-forest">Left is original, Right is redesign.</span>
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[10px] text-sage font-mono">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-forest mr-1.5" />
              Font: {activeConcept.fontFamily.split(' & ')[0]}
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-[#F5F2EB] border border-stone-border mr-1.5" />
              Base Color
            </span>
          </div>
        </div>

        {/* Resizable Viewport Wrap */}
        <div className="flex justify-center bg-stone-bg/60 p-4 rounded-xl border border-stone-border">
          <div 
            className={`w-full relative transition-all duration-300 ${
              viewportMode === 'mobile' ? 'max-w-[360px]' : 'max-w-6xl'
            }`}
          >
            {/* The Before/After Container */}
            <div 
              ref={sliderRef}
              className="relative w-full aspect-video border border-stone-border bg-white rounded-lg shadow-lg overflow-hidden select-none"
            >
              
              {/* BEFORE LAYOUT (Always renders behind, clipped or overlaid) */}
              <div className="absolute inset-0 bg-[#E8EDF2] flex flex-col p-4 md:p-8 font-sans">
                {/* Standard Blue Nav */}
                <div className="flex items-center justify-between border-b border-blue-200 pb-3 mb-4 md:mb-8 text-[10px] md:text-xs">
                  <span className="font-black text-blue-900 tracking-wider">
                    {report.businessName.toUpperCase()}
                  </span>
                  <div className="flex space-x-4 text-blue-800 font-bold">
                    <span>Home</span>
                    <span>Obituaries</span>
                    <span>Services</span>
                    <span>Pre-Planning</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Generic Hero Content */}
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-7 space-y-2 md:space-y-4">
                    <h2 className="text-lg md:text-3xl font-extrabold text-blue-950 leading-tight">
                      Welcome to {report.businessName}
                    </h2>
                    <p className="text-[10px] md:text-sm text-slate-700 leading-relaxed max-w-md">
                      We are proud to serve our local community during their time of need. Our staff is dedicated to providing professional, caring funeral services at affordable prices.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-800 text-white rounded text-[9px] md:text-xs font-bold shadow-sm">
                        Contact Us Today
                      </span>
                      <span className="px-3 py-1.5 md:px-4 md:py-2 border border-blue-800 text-blue-800 rounded text-[9px] md:text-xs font-bold bg-white">
                        Obituary Listings
                      </span>
                    </div>
                  </div>

                  <div className="col-span-5 h-full rounded border border-blue-200 bg-slate-300 flex items-center justify-center text-center text-[10px] md:text-xs text-slate-600 p-4">
                    [Stock image of hands shaking or roses]
                  </div>
                </div>

                <div className="absolute bottom-2 left-6 text-[8px] md:text-[10px] text-slate-400 font-mono">
                  Standard Template • Created 2017
                </div>
              </div>

              {/* AFTER REDESIGN LAYOUT (Positioned absolute, overlayed and clipped) */}
              <div 
                className="absolute inset-0 bg-[#FBFBFA] flex flex-col p-4 md:p-8 overflow-hidden z-10 transition-shadow pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                {/* Quiet Luxury Nav */}
                <div className="flex items-center justify-between border-b border-stone-border pb-3 mb-4 md:mb-8 text-[10px] md:text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-forest flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-forest" />
                    </div>
                    <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase font-bold text-forest">
                      {report.businessName}
                    </span>
                  </div>
                  <div className="flex space-x-4 md:space-x-6 text-sage font-medium tracking-wide">
                    <span className="text-forest border-b border-forest">Remembrance</span>
                    <span>Services</span>
                    <span>General Price List</span>
                    <span>Quiet Arrangements</span>
                  </div>
                </div>

                {/* Premium Hero Content */}
                <div className="flex-1 grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-8 space-y-3 md:space-y-5">
                    <span className="text-[8px] md:text-[10px] font-sans tracking-[0.25em] text-sage uppercase font-bold block">
                      A Solace Rest Sanctuary
                    </span>
                    <h2 className="text-xl md:text-4xl font-serif text-forest font-light leading-tight">
                      {activeConcept.mockupState.heroTitle}
                    </h2>
                    <p className="text-[9px] md:text-sm text-sage leading-relaxed max-w-lg font-sans">
                      {activeConcept.mockupState.heroSubtitle}
                    </p>
                    <div className="flex space-x-3">
                      <span className="px-4 py-2 bg-[#1E352F] text-[#FAF9F6] rounded text-[9px] md:text-xs font-semibold tracking-wide border border-forest">
                        {activeConcept.mockupState.buttonText}
                      </span>
                      <span className="px-4 py-2 border border-stone-border text-forest rounded text-[9px] md:text-xs font-semibold bg-white tracking-wide">
                        Explore Obits
                      </span>
                    </div>
                  </div>

                  <div className="col-span-4 aspect-square max-w-[200px] border border-stone-border rounded-lg bg-[#FAF9F6] p-3 flex flex-col justify-between shadow-inner">
                    <div className="w-7 h-7 rounded-full bg-stone-bg flex items-center justify-center border border-stone-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-forest" />
                    </div>
                    <div>
                      <p className="text-[8px] text-sage uppercase tracking-wider font-semibold leading-none mb-1">
                        Pre-Planning
                      </p>
                      <p className="text-[10px] md:text-xs font-serif text-forest leading-tight font-bold">
                        Start arrangement online in the comfort of your living room.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 right-6 text-[8px] md:text-[10px] text-sage font-mono">
                  Redesign Engine 2.4 • 60 FPS
                </div>
              </div>

              {/* Slider Drag Handle Line */}
              <div 
                className="absolute inset-y-0 z-20 cursor-ew-resize w-[2px] bg-forest flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleStartDrag}
                onTouchStart={handleStartDrag}
              >
                <div className="w-8 h-8 rounded-full border border-stone-border bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform select-none">
                  <div className="flex space-x-0.5 text-forest items-center justify-center">
                    <ArrowLeft className="w-2.5 h-2.5 shrink-0" />
                    <div className="w-[1px] h-3 bg-stone-border" />
                    <ArrowRight className="w-2.5 h-2.5 shrink-0" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Redesign Concept Value Accents & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Value metrics - 2 cols */}
        <div className="lg:col-span-2 bg-white border border-stone-border rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-sm text-forest font-bold mb-4">
            Concept ROI Estimates & Value Projections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-stone-bg/60 p-4 border border-stone-border rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-sage block leading-none font-bold">
                Compassion Rating
              </span>
              <span className="text-2xl font-light font-mono text-forest mt-1.5 block">
                +42%
              </span>
              <span className="text-[10px] text-sage mt-1 block">
                Estimated index improvement
              </span>
            </div>
            <div className="bg-stone-bg/60 p-4 border border-stone-border rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-sage block leading-none font-bold">
                Pre-Need Conversion
              </span>
              <span className="text-2xl font-light font-mono text-forest mt-1.5 block">
                +120%
              </span>
              <span className="text-[10px] text-sage mt-1 block">
                Predicted form response increase
              </span>
            </div>
            <div className="bg-stone-bg/60 p-4 border border-stone-border rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-sage block leading-none font-bold">
                LCP Load Speed
              </span>
              <span className="text-2xl font-light font-mono text-forest mt-1.5 block">
                1.4s
              </span>
              <span className="text-[10px] text-sage mt-1 block">
                Sub-page obituary loading
              </span>
            </div>
          </div>

          <div className="border-t border-stone-border mt-5 pt-4 space-y-2 text-xs text-sage">
            {activeConcept.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-forest mr-2.5 shrink-0" />
                <span className="text-forest">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code & Asset Export - 1 col */}
        <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-sm text-forest font-bold">
              Integration & Export
            </h3>
            <p className="text-[10px] text-sage mt-1">
              Solace redrafts compilation assets in standard frontend layouts ready for deployment.
            </p>
          </div>

          <div className="space-y-2 my-4">
            <div className="flex justify-between border-b border-stone-border pb-1.5 text-xs text-sage">
              <span>Next.js Framework</span>
              <span className="text-forest font-semibold">100% Ready</span>
            </div>
            <div className="flex justify-between border-b border-stone-border pb-1.5 text-xs text-sage">
              <span>Tailwind Tokens</span>
              <span className="text-forest font-semibold">Included</span>
            </div>
            <div className="flex justify-between border-b border-stone-border pb-1.5 text-xs text-sage">
              <span>Framer Animations</span>
              <span className="text-forest font-semibold">Pre-configured</span>
            </div>
          </div>

          <button 
            className="w-full flex items-center justify-center p-3 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors gap-2"
            onClick={() => alert("Bespoke luxury asset export is simulated. Supplying files...")}
          >
            <Download className="w-4 h-4" />
            Export Redesign Assets
          </button>
        </div>

      </div>

    </div>
  );
}
