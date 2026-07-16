'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const statusMessages = [
  'Analyzing Domain Structure',
  'Reading Typography & Visual Hierarchy',
  'Evaluating Compassion & Trust Signals',
  'Understanding Family Search Intent',
  'Measuring General Price List Accessibility',
  'Evaluating Core Web Vitals Performance',
  'Benchmarking Regional Competitors',
  'Generating Bespoke AI Concepts',
  'Synthesizing Executive Recommendations',
  'Polishing Dashboard Insights'
];

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment progress
    const duration = 4200; // 4.2 seconds
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Map progress to status messages
    const index = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1
    );
    setStatusIndex(index);
  }, [progress]);

  // When animation finishes, trigger callback
  useEffect(() => {
    if (isDone) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800); // Wait for morph out animation
      return () => clearTimeout(timeout);
    }
  }, [isDone, onComplete]);

  // Format progress to double digits (e.g. 05)
  const formatProgress = (val: number) => {
    const rounded = Math.round(val);
    return rounded < 10 ? `0${rounded}` : `${rounded}`;
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-stone-bg p-8 md:p-16 select-none bg-grid-pattern"
      initial={{ opacity: 1 }}
      exit={{ 
        clipPath: 'circle(0% at 50% 50%)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-forest">
            Solace
          </span>
        </div>
        <span className="font-sans text-xs tracking-widest uppercase text-sage">
          Website Intelligence Platform
        </span>
      </div>

      {/* Center Animated Schematic */}
      <div className="flex-1 flex flex-col items-center justify-center my-8 max-w-xl mx-auto w-full">
        <div className="relative w-full aspect-video border border-stone-border rounded-lg bg-white shadow-[0_4px_24px_rgba(230,228,223,0.3)] p-4 flex flex-col justify-between overflow-hidden">
          {/* Grid lines inside mockup */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Wireframe Mockup Topbar */}
          <div className="flex items-center justify-between border-b border-stone-border pb-3 mb-2">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-stone-border" />
              <div className="w-2 h-2 rounded-full bg-stone-border" />
              <div className="w-2 h-2 rounded-full bg-stone-border" />
            </div>
            <div className="w-1/3 h-3 bg-stone-bg rounded border border-stone-border" />
            <div className="w-4 h-4 rounded-full border border-stone-border" />
          </div>

          {/* Wireframe Content elements that light up depending on progress */}
          <div className="flex-1 grid grid-cols-12 gap-3 py-1">
            {/* Sidebar element */}
            <div className="col-span-3 border border-stone-border rounded bg-stone-bg p-2 flex flex-col gap-1.5">
              <motion.div 
                className="h-2 bg-stone-border rounded w-3/4"
                animate={{ opacity: progress > 15 ? 1 : 0.2 }}
              />
              <motion.div 
                className="h-1.5 bg-stone-border rounded w-5/6"
                animate={{ opacity: progress > 30 ? 1 : 0.2 }}
              />
              <motion.div 
                className="h-1.5 bg-stone-border rounded w-2/3"
                animate={{ opacity: progress > 45 ? 1 : 0.2 }}
              />
              <motion.div 
                className="h-1.5 bg-stone-border rounded w-1/2"
                animate={{ opacity: progress > 60 ? 1 : 0.2 }}
              />
            </div>

            {/* Main Content Area */}
            <div className="col-span-9 flex flex-col gap-3">
              {/* Header Box */}
              <div className="border border-stone-border rounded p-3 flex flex-col gap-2 relative bg-stone-bg/50">
                <motion.div 
                  className="h-3 bg-forest/20 rounded w-2/3"
                  animate={{ 
                    backgroundColor: progress > 50 ? '#1E352F' : 'rgba(30, 53, 47, 0.1)',
                    opacity: progress > 25 ? 1 : 0.2
                  }}
                />
                <motion.div 
                  className="h-2 bg-stone-border rounded w-full"
                  animate={{ opacity: progress > 40 ? 1 : 0.2 }}
                />
                <motion.div 
                  className="h-2 bg-stone-border rounded w-5/6"
                  animate={{ opacity: progress > 40 ? 1 : 0.2 }}
                />
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-3 gap-2 flex-1">
                {[1, 2, 3].map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="border border-stone-border rounded p-2 flex flex-col justify-between bg-white"
                    animate={{ 
                      y: progress > (50 + idx * 10) ? 0 : 8,
                      opacity: progress > (50 + idx * 10) ? 1 : 0.1,
                      borderColor: progress > (80 + idx * 5) ? '#C5A880' : '#E6E4DF'
                    }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-stone-bg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                    </div>
                    <div className="h-1.5 bg-stone-border rounded w-full mt-2" />
                    <div className="h-1.5 bg-stone-border rounded w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Morph Overlay Concept (grows to cover on 100%) */}
          <motion.div 
            className="absolute inset-0 bg-forest flex flex-col items-center justify-center p-8 text-center text-white"
            initial={{ y: '100%' }}
            animate={{ y: progress >= 95 ? '0%' : '100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.h3 
              className="font-serif text-xl tracking-wide text-[#FBFBFA]"
              animate={{ opacity: progress >= 97 ? 1 : 0, y: progress >= 97 ? 0 : 15 }}
              transition={{ delay: 0.2 }}
            >
              Analysis Complete
            </motion.h3>
            <motion.p 
              className="text-xs text-sage mt-1 font-sans tracking-widest uppercase"
              animate={{ opacity: progress >= 97 ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              Morphing Core Experience
            </motion.p>
          </motion.div>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-8 text-center h-12 w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              className="font-serif text-lg tracking-wide text-forest font-light"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {statusMessages[statusIndex]}
            </motion.p>
          </AnimatePresence>
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-sage mt-2">
            AI-Engine Active
          </span>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full flex flex-col space-y-3">
        {/* Progress Metrics */}
        <div className="flex justify-between items-end font-sans text-xs">
          <span className="text-sage uppercase tracking-wider font-light">
            System Boot
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-light font-mono text-forest leading-none">
              {formatProgress(progress)}
            </span>
            <span className="text-sage text-[10px] font-mono">%</span>
          </div>
        </div>

        {/* Elegant Thin Line */}
        <div className="w-full h-[1px] bg-stone-border relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-forest"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
