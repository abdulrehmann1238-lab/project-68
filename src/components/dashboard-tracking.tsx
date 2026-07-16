'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Terminal, 
  HelpCircle, ShieldCheck, Play, Layers, Check, ArrowRight
} from 'lucide-react';
import { AuditReport, TrackingItem } from '@/lib/mockData';

interface DashboardTrackingProps {
  report: AuditReport;
}

export default function DashboardTracking({ report }: DashboardTrackingProps) {
  const [trackingList, setTrackingList] = useState<TrackingItem[]>(report.trackingList);
  const [isScanning, setIsScanning] = useState(false);
  const [scanOutput, setScanOutput] = useState<string[]>([]);
  const [activeMaturity, setActiveMaturity] = useState(report.metrics.tracking.score);

  const startSimulatedScan = () => {
    setIsScanning(true);
    setScanOutput([]);
    
    const logs = [
      `Establishing connection to ${report.domain}...`,
      `Injecting diagnostic script engine...`,
      `Searching DOM for Google Tag Manager containers...`,
      `Checking document cookie configuration & security flags...`,
      `Scanning script sources for pixel triggers (Meta, LinkedIn)...`,
      `Analyzing GDPR consent banner intercept triggers...`,
      `Checking DNS records for first-party tracking server-side endpoints...`,
      `Compilation finished. Evaluating pixel payload...`
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setScanOutput(prev => [...prev, `[SCANNER] ${log}`]);
        if (idx === logs.length - 1) {
          // Finish scan, randomly upgrade one tag as a fun interactive result!
          setIsScanning(false);
          setTrackingList(prev => {
            const updated = prev.map(item => {
              if (item.id === 'gtm' && item.status === 'missing') {
                return { ...item, status: 'active' as const, description: 'Google Tag Manager detected after manual container verification.' };
              }
              if (item.id === 'events' && item.status === 'warning') {
                return { ...item, status: 'active' as const };
              }
              return item;
            });
            return updated;
          });
          setActiveMaturity(prev => Math.min(95, prev + 10));
        }
      }, (idx + 1) * 350);
    });
  };

  const getStatusIcon = (status: TrackingItem['status']) => {
    if (status === 'active') return <CheckCircle2 className="w-5 h-5 text-forest shrink-0" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-gold shrink-0" />;
    return <XCircle className="w-5 h-5 text-red-700 shrink-0" />;
  };

  const getStatusBadge = (status: TrackingItem['status']) => {
    if (status === 'active') {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-forest/10 text-forest border border-forest/20">
          Verified Active
        </span>
      );
    }
    if (status === 'warning') {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gold/10 text-yellow-800 border border-gold/20">
          Tag Warning
        </span>
      );
    }
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-500/10 text-red-800 border border-red-200">
        Missing / Inactive
      </span>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-stone-border pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
            Diagnostics Board
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
            Tag & Pixel Compliance
          </h1>
          <p className="text-xs text-sage mt-1">
            Analyzing marketing pixel configurations and GDPR compliance cookies firing on obituaries.
          </p>
        </div>

        <button
          onClick={startSimulatedScan}
          disabled={isScanning}
          className="flex items-center justify-center p-3 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors gap-2 cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning scripts...' : 'Re-scan Site Tags'}</span>
        </button>
      </div>

      {/* Grid: Tracker list & terminal diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Tag list - 7 cols */}
        <div className="lg:col-span-7 bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-sm text-forest font-bold">
                Script Integrity Checklist
              </h3>
              <div className="text-right">
                <span className="text-[10px] text-sage block leading-none font-bold uppercase tracking-wider">
                  Maturity Rating
                </span>
                <span className="text-sm font-serif text-forest font-semibold mt-1 block">
                  {activeMaturity}% Index
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {trackingList.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-start justify-between p-4 bg-stone-bg/35 hover:bg-stone-bg/70 border border-stone-border rounded-lg transition-colors group"
                >
                  <div className="flex items-start space-x-3.5 max-w-[70%]">
                    <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                    <div>
                      <h4 className="text-xs font-semibold text-forest group-hover:text-gold transition-colors font-sans">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-sage mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-between items-end h-full min-h-[50px] shrink-0 pl-4">
                    {getStatusBadge(item.status)}
                    <span className="text-[9px] uppercase tracking-wider text-sage font-mono mt-2">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Simulated Scan console & Explanations - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Terminal Console Card */}
          <div className="bg-[#1A1A1A] text-[#FAF9F6] border border-stone-border rounded-xl p-5 shadow-lg flex flex-col justify-between h-[250px] relative overflow-hidden font-mono text-[10px] select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2 shrink-0">
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-sage" />
                <span className="text-stone-300 font-sans font-bold">Solace Script Console</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-stone-600 py-1 font-light leading-relaxed">
              {scanOutput.length === 0 ? (
                <p className="text-stone-400 italic">
                  [CONSOLE] Idle. Click "Re-scan Site Tags" to query local tag scripts.
                </p>
              ) : (
                scanOutput.map((log, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-stone-200"
                  >
                    {log}
                  </motion.p>
                ))
              )}
              {isScanning && (
                <span className="inline-block w-1.5 h-3.5 bg-forest ml-0.5 animate-pulse" />
              )}
            </div>

            <div className="border-t border-white/10 pt-3 mt-2 shrink-0 flex justify-between text-[8px] text-stone-400 font-sans">
              <span>SCANNER ENGINE v3</span>
              <span>COMPILATION: READY</span>
            </div>
          </div>

          {/* Context Details explaining Clarity on Funeral Sites */}
          <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-sm text-forest font-bold mb-3">
              Why Funeral Homes Need Session Recording (Microsoft Clarity)
            </h3>
            <p className="text-xs text-sage leading-relaxed font-sans">
              Unlike normal SaaS buyers, visitors on funeral sites are frequently under extreme stress (immediate-need arrangements) or represent seniors (pre-planning). 
            </p>
            <div className="mt-4 space-y-3.5 text-xs text-sage">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded bg-forest/10 border border-forest/20 text-forest flex items-center justify-center mr-2.5 shrink-0 font-bold font-serif">1</div>
                <div>
                  <span className="font-semibold text-forest block">Identify Frustration Loops</span>
                  <span>Elders commonly rage-click small search inputs when typing names of loved ones in obituaries.</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded bg-forest/10 border border-forest/20 text-forest flex items-center justify-center mr-2.5 shrink-0 font-bold font-serif">2</div>
                <div>
                  <span className="font-semibold text-forest block">FTC GPL Auditing</span>
                  <span>Confirm if users are easily locating pricing menus, protecting your firm from regulatory FTC audits.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
