'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, ArrowLeft, Check, Plus, Trash2, Globe, 
  Building, ChevronRight, Activity, Sparkles, Sliders
} from 'lucide-react';
import LoadingSequence from '@/components/loading-sequence';

type OnboardStep = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardStep>(1);
  const [showLoading, setShowLoading] = useState(false);

  // Form values state
  const [targetUrl, setTargetUrl] = useState('www.greenwoodchapel.com');
  const [competitors, setCompetitors] = useState<string[]>(['www.havenrestmemorial.com']);
  const [newComp, setNewComp] = useState('');
  
  const [caseVolume, setCaseVolume] = useState('20-50');
  const [city, setCity] = useState('Seattle');
  const [designStyle, setDesignStyle] = useState('minimalist');

  const addCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComp && !competitors.includes(newComp)) {
      setCompetitors([...competitors, newComp.trim()]);
      setNewComp('');
    }
  };

  const removeCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    // Navigate to dashboard with query parameters of the entered values
    const compQuery = competitors.filter(Boolean).join(',');
    router.push(`/dashboard?url=${targetUrl}&competitors=${compQuery}&tab=overview`);
  };

  return (
    <div className="min-h-screen bg-stone-bg flex flex-col justify-between p-6 md:p-12 relative overflow-hidden bg-grid-pattern">
      
      {/* Cinematic Loader integration */}
      {showLoading && (
        <LoadingSequence onComplete={handleLoadingComplete} />
      )}

      {/* Header bar */}
      <header className="flex justify-between items-center max-w-3xl mx-auto w-full mb-8 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-forest" />
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-forest">
            Solace
          </span>
        </div>

        {/* Stepper Dots */}
        <div className="flex space-x-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? 'w-6 bg-forest' : s < step ? 'w-2 bg-sage' : 'w-2 bg-stone-border'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Stepper Card */}
      <main className="max-w-xl mx-auto w-full my-auto z-10">
        <div className="bg-white border border-stone-border rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(230,228,223,0.3)] relative">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: WEBSITE & COMPETITORS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-sage font-bold font-sans">
                    Step 01
                  </span>
                  <h1 className="font-serif text-2xl text-forest font-medium mt-1">Audit Configuration</h1>
                  <p className="text-xs text-sage mt-1">Enter your funeral home website and regional competitor URLs to benchmark local metrics.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Your Website URL</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="e.g. www.greenwoodchapel.com"
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                      />
                      <Globe className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold block">Regional Competitor URLs</label>
                    
                    {/* Add Competitor input row */}
                    <form onSubmit={addCompetitor} className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={newComp}
                          onChange={(e) => setNewComp(e.target.value)}
                          placeholder="e.g. www.competitor.com"
                          className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                        />
                        <Building className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2.5 border border-stone-border rounded text-xs text-forest hover:bg-stone-bg transition-colors font-sans font-semibold shrink-0"
                      >
                        Add
                      </button>
                    </form>

                    {/* Competitors List */}
                    <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-1">
                      {competitors.map((comp, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-[#FAF9F6] border border-stone-border rounded text-xs text-forest font-sans">
                          <span className="truncate">{comp}</span>
                          <button
                            onClick={() => removeCompetitor(idx)}
                            className="text-sage hover:text-red-700 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {competitors.length === 0 && (
                        <p className="text-[10px] text-sage italic">No competitors configured. A default benchmark will be generated.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-stone-border">
                  <button
                    onClick={() => setStep(2)}
                    className="p-3 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Continue Details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: BUSINESS DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs text-sage hover:text-forest flex items-center mb-3 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Config
                  </button>
                  <span className="text-[9px] uppercase tracking-widest text-sage font-bold font-sans">
                    Step 02
                  </span>
                  <h1 className="font-serif text-2xl text-forest font-medium mt-1">Market Scope & Metrics</h1>
                  <p className="text-xs text-sage mt-1">Help our AI engine understand your operating metrics and keyword service ranges.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold block">Monthly Call / Case Volume</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Under 20', '20-50', '50+'].map((vol) => (
                        <button
                          key={vol}
                          onClick={() => setCaseVolume(vol)}
                          className={`p-3 border rounded text-xs text-center transition-all font-sans font-medium ${
                            caseVolume === vol 
                              ? 'bg-forest/10 border-forest text-forest font-semibold' 
                              : 'bg-[#FAF9F6] border-stone-border text-sage hover:border-gold'
                          }`}
                        >
                          {vol} services
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">Primary Municipal Market (City)</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Dallas"
                        className="w-full text-xs p-3 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                      />
                      <Building className="w-4 h-4 text-sage absolute left-3 top-3.5" />
                    </div>
                    <span className="text-[9px] text-sage block mt-1">Matches SEO indicators to geographical query profiles.</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-stone-border">
                  <button
                    onClick={() => setStep(1)}
                    className="p-3 border border-stone-border text-forest rounded text-xs font-semibold hover:bg-stone-bg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="p-3 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>Design Preferences</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DESIGN PREFERENCES */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button 
                    onClick={() => setStep(2)}
                    className="text-xs text-sage hover:text-forest flex items-center mb-3 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to Details
                  </button>
                  <span className="text-[9px] uppercase tracking-widest text-sage font-bold font-sans">
                    Step 03
                  </span>
                  <h1 className="font-serif text-2xl text-forest font-medium mt-1">Design & Brand Direction</h1>
                  <p className="text-xs text-sage mt-1">Select the luxury brand concept template you wish to evaluate for your redesign.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { id: 'minimalist', name: 'Concept A: Pure Solace', desc: 'Warm stone minimalism, spacious layout, serene green tones.' },
                    { id: 'editorial', name: 'Concept B: Heritage & Honor', desc: 'Traditional editorial typography, dark walnut tones, classic legacy grids.' },
                    { id: 'modern', name: 'Concept C: Modern Compassion', desc: 'Contemporary clean borders, gold accents, integrated arrangements.' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setDesignStyle(style.id)}
                      className={`w-full p-4 border rounded-xl text-left transition-all flex items-start space-x-3.5 group ${
                        designStyle === style.id 
                          ? 'border-forest ring-1 ring-forest bg-stone-bg/10' 
                          : 'bg-[#FAF9F6] border-stone-border hover:border-gold'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        designStyle === style.id ? 'border-forest bg-forest text-white' : 'border-stone-border bg-white'
                      }`}>
                        {designStyle === style.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-serif font-bold text-forest leading-none">{style.name}</p>
                        <p className="text-[10px] text-sage mt-1 leading-normal font-sans">{style.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-stone-border">
                  <button
                    onClick={() => setStep(2)}
                    className="p-3 border border-stone-border text-forest rounded text-xs font-semibold hover:bg-stone-bg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    className="p-3.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-2 group cursor-pointer border border-forest shrink-0"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Synthesize Website Intelligence</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>

      {/* Footer bar */}
      <footer className="max-w-3xl mx-auto w-full text-center text-[10px] text-sage font-mono mt-8 z-10">
        SOLACE WEBSITE INTELLIGENCE ENGINE • DEMO CLIENT PORTAL
      </footer>

    </div>
  );
}
