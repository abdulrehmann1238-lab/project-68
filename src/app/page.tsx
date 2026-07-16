'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Activity, ArrowRight, ShieldCheck, Search, Eye, Zap, Code2, 
  Sparkles, Globe, ArrowDown, ChevronRight, CheckCircle2, Star, Play
} from 'lucide-react';
import LoadingSequence from '@/components/loading-sequence';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [inputUrl, setInputUrl] = useState('www.greenwoodchapel.com');

  const features = [
    {
      icon: ShieldCheck,
      title: 'Empathy & Trust Index',
      desc: 'Verify obituary accessibility, pricing transparency, and FTC GPL compliance indicators automatically.'
    },
    {
      icon: Search,
      title: 'Local SEO Maps Audit',
      desc: 'Track local map pack standings and micro-optimize keywords for regional pre-need searches.'
    },
    {
      icon: Eye,
      title: 'Elder Accessibility UX',
      desc: 'Ensure readability, contrast ratios, and touch targets comply with WCAG standards for senior citizens.'
    },
    {
      icon: Code2,
      title: 'Tag & Pixel Compliance',
      desc: 'Check if Facebook pixels, server-side containers, and GDPR analytics code fire legally.'
    },
    {
      icon: Sparkles,
      title: 'AI Redesign Studio',
      desc: 'Test-drive luxury Scandinavian minimal concepts styled for high-end digital arrangement guides.'
    },
    {
      icon: Zap,
      title: 'Stress-Load Speed',
      desc: 'Optimize Core Web Vitals to deliver immediate load times on mobile under low-bandwidth stressful situations.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Essential',
      price: '$49',
      desc: 'Perfect for local single-chapel family providers looking to monitor SEO ranks.',
      features: [
        'Weekly Local SEO audit scan',
        'Check GTM/GA4 tracking scripts',
        'Basic Trust Index dashboard',
        '2 competitor benchmark entries'
      ]
    },
    {
      name: 'Professional',
      price: '$99',
      desc: 'The recommended solution for multi-location funeral homes demanding growth.',
      popular: true,
      features: [
        'Daily automated audit scans',
        'Full FTC Price List compliance checker',
        'AI Redesign Studio (3 concepts)',
        'Roadmap tracking & issue exporter',
        '5 competitor benchmark entries'
      ]
    },
    {
      name: 'Enterprise',
      price: '$199',
      desc: 'Custom metrics built for premier regional deathcare conglomerates.',
      features: [
        'Real-time Core Web Vitals auditing',
        'Server-Side tagging configuration guides',
        'Unlimited competitor benchmarking',
        'Custom domain API integrations',
        'Stripe ready (Supabase compatible)'
      ]
    }
  ];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl) {
      router.push(`/onboarding?url=${inputUrl.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-bg text-charcoal font-sans relative overflow-x-hidden">
      
      {/* Cinematic Loader Intercept */}
      <AnimatePresence>
        {showLoader && (
          <LoadingSequence onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-grid-pattern"
        >
          {/* Top navigation */}
          <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-forest" />
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-forest">
                Solace
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-wide text-sage">
              <a href="#features" className="hover:text-forest transition-colors">Features</a>
              <a href="#case-studies" className="hover:text-forest transition-colors">Case Studies</a>
              <a href="#pricing" className="hover:text-forest transition-colors">Pricing</a>
              <Link href="/auth" className="hover:text-forest transition-colors">Console Log In</Link>
            </nav>

            <Link
              href="/onboarding"
              className="px-4 py-2 bg-[#1E352F] text-[#FAF9F6] border border-forest rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-all"
            >
              Analyze Website
            </Link>
          </header>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-6 max-w-3xl"
            >
              <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-sage font-bold block bg-white/60 border border-stone-border px-3 py-1 rounded-full w-max mx-auto shadow-sm">
                Industry-First Website Auditer
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-forest leading-[1.1] font-light">
                The Future of Funeral Website Intelligence
              </h1>
              
              <p className="text-sm md:text-lg text-sage max-w-xl mx-auto leading-relaxed font-sans font-light">
                One platform that understands your digital trust signals, benchmarks competitors, checks FTC GPL compliance, and redesigns your interface with quiet luxury.
              </p>
            </motion.div>

            {/* In-Hero Interactive URL Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 w-full max-w-lg bg-white border border-stone-border rounded-xl p-2 shadow-[0_12px_40px_rgba(230,228,223,0.5)] z-20"
            >
              <form onSubmit={handleAuditSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Enter your funeral home website (e.g. greenwood.com)"
                    className="w-full text-xs p-3.5 pl-10 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                  />
                  <Globe className="w-4 h-4 text-sage absolute left-3.5 top-4" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-forest text-[#FAF9F6] border border-forest rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Run Live Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-16 w-full max-w-5xl relative"
            >
              {/* Dashboard Preview Mockup frame */}
              <div className="relative aspect-video w-full rounded-xl border border-stone-border bg-white shadow-2xl p-4 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="flex items-center justify-between border-b border-stone-border pb-3 mb-4 text-[10px] text-sage">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-border" />
                  </div>
                  <span className="font-mono">solace.ai/dashboard?url=www.greenwoodchapel.com</span>
                  <div className="w-4 h-4 rounded-full border border-stone-border" />
                </div>

                {/* Dashboard layout graphics mockup inside */}
                <div className="grid grid-cols-12 gap-4 text-left h-full">
                  <div className="col-span-3 border-r border-stone-border space-y-2.5 pr-2">
                    <div className="h-4 bg-forest/20 rounded w-3/4" />
                    <div className="h-3 bg-stone-bg rounded w-5/6" />
                    <div className="h-3 bg-stone-bg rounded w-2/3" />
                    <div className="h-3 bg-stone-bg rounded w-1/2" />
                  </div>
                  <div className="col-span-9 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-forest/20 rounded w-1/3" />
                      <div className="h-4 bg-stone-bg rounded w-1/4" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border border-stone-border rounded p-3 space-y-2 bg-[#FAF9F6]">
                        <span className="text-[8px] text-sage block leading-none font-bold uppercase">TRUST INDEX</span>
                        <span className="text-xl font-mono text-forest leading-none block">94%</span>
                        <div className="w-full h-1 bg-forest rounded" />
                      </div>
                      <div className="border border-stone-border rounded p-3 space-y-2 bg-[#FAF9F6]">
                        <span className="text-[8px] text-sage block leading-none font-bold uppercase">LOCAL SEO</span>
                        <span className="text-xl font-mono text-forest leading-none block">88%</span>
                        <div className="w-full h-1 bg-forest rounded" />
                      </div>
                      <div className="border border-stone-border rounded p-3 space-y-2 bg-[#FAF9F6]">
                        <span className="text-[8px] text-sage block leading-none font-bold uppercase">COMPETITORS</span>
                        <span className="text-xl font-mono text-gold leading-none block">#1 Rank</span>
                        <div className="w-full h-1 bg-gold rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating animated scorecard widget A */}
              <motion.div 
                className="absolute top-10 left-[-20px] md:left-[-50px] bg-white border border-stone-border rounded-lg p-3.5 shadow-xl hidden sm:flex items-center space-x-3 text-left w-48"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded bg-forest/10 border border-forest/20 text-forest flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] text-sage uppercase tracking-wider font-semibold leading-none">FTC Pricing Audit</p>
                  <p className="text-[11px] font-serif text-forest font-bold mt-1">100% Compliant</p>
                </div>
              </motion.div>

              {/* Floating animated scorecard widget B */}
              <motion.div 
                className="absolute bottom-10 right-[-20px] md:right-[-50px] bg-white border border-stone-border rounded-lg p-3.5 shadow-xl hidden sm:flex items-center space-x-3 text-left w-48"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1.5, ease: 'easeInOut' }}
              >
                <div className="w-8 h-8 rounded bg-gold/10 border border-gold/20 text-gold flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] text-sage uppercase tracking-wider font-semibold leading-none">Stress load speed</p>
                  <p className="text-[11px] font-serif text-forest font-bold mt-1">LCP: 1.4 seconds</p>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Features Grids */}
          <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-border">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-sage font-bold block">
                Platform Pillars
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-forest font-normal">
                Structured Website Diagnostics
              </h2>
              <p className="text-xs text-sage leading-relaxed font-sans">
                Solace runs specialized checks tailored specifically to the unique emotional and regulatory variables of the deathcare sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    className="bg-white border border-stone-border rounded-2xl p-6 shadow-sm hover:border-gold hover:shadow-md transition-all duration-200 text-left group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-stone-bg border border-stone-border flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-[#FAF9F6] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base text-forest font-semibold mt-5 group-hover:text-gold transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-sage mt-2.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Case Study Section */}
          <section id="case-studies" className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-border bg-stone-bg/40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6 text-left">
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-sage font-bold block">
                  Regional Case Study
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-forest leading-tight font-light">
                  How Greenwood Family Mortuary Doubled Pre-Need Volume in 6 Months.
                </h2>
                <p className="text-xs text-sage leading-relaxed font-sans font-light">
                  "Our old website buried our General Price List inside a complicated multi-folder PDF system. Grieving families were getting frustrated trying to figure out cremation costs, and leaving our pages. Solace identified this trust gap immediately. We implemented their Concept A Warm Minimalist redesign, and online pre-planning responses increased by **114%**."
                </p>
                <div className="flex space-x-6 border-t border-stone-border pt-6">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-sage block font-bold">Pre-Need response</span>
                    <span className="text-xl font-light font-mono text-forest mt-1.5 block">+114%</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-sage block font-bold">Obituary loading time</span>
                    <span className="text-xl font-light font-mono text-forest mt-1.5 block">1.2s</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-sage block font-bold">FTC compliance rank</span>
                    <span className="text-xl font-light font-mono text-forest mt-1.5 block">100/100</span>
                  </div>
                </div>
              </div>

              {/* Graphical representation mockup */}
              <div className="bg-white border border-stone-border rounded-2xl p-6 shadow-lg text-left max-w-md mx-auto w-full aspect-video flex flex-col justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="flex justify-between items-center border-b border-stone-border pb-3 mb-2 shrink-0">
                  <span className="font-serif text-[10px] text-forest font-bold">TRUST VS. ABANDONMENT RATE</span>
                  <span className="text-[8px] font-mono text-sage">SOLACE ANALYTICS</span>
                </div>
                <div className="flex-1 flex items-end space-x-4 py-4 shrink-0">
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[8px] text-sage block uppercase font-bold">BEFORE SOLACE</span>
                    <div className="h-10 bg-sage/30 rounded w-full flex items-center px-3 justify-between">
                      <span className="text-[10px] text-sage font-bold font-sans">Abandon: 74%</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[8px] text-forest block uppercase font-bold">AFTER SOLACE</span>
                    <div className="h-28 bg-forest rounded w-full flex items-center px-3 justify-between text-white">
                      <span className="text-[10px] font-bold font-sans text-[#FAF9F6]">Abandon: 18%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Pricing Tiers Section */}
          <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 border-t border-stone-border">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-sage font-bold block">
                Subscription Models
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-forest font-normal">
                Predictable, Transparent Pricing
              </h2>
              <p className="text-xs text-sage leading-relaxed">
                Choose the license matching your funeral business operations volume. All plans assume eventual Supabase scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`bg-white border rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-200 shadow-sm ${
                    tier.popular ? 'border-forest ring-1 ring-forest shadow-md scale-102' : 'border-stone-border hover:border-gold'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-forest text-[#FAF9F6] text-[8px] uppercase tracking-widest px-3 py-0.5 rounded-full border border-forest font-bold font-sans shadow-sm">
                      Recommended
                    </span>
                  )}
                  
                  <div className="text-left space-y-4">
                    <div>
                      <h3 className="font-serif text-lg text-forest font-bold">{tier.name}</h3>
                      <p className="text-[10px] text-sage mt-0.5 font-sans leading-relaxed">{tier.desc}</p>
                    </div>

                    <div className="flex items-baseline">
                      <span className="text-3xl font-light font-mono text-forest leading-none">{tier.price}</span>
                      <span className="text-xs text-sage font-sans ml-1">/month</span>
                    </div>

                    <div className="border-t border-stone-border pt-4">
                      <ul className="space-y-2 text-xs text-sage">
                        {tier.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-start">
                            <CheckCircle2 className="w-4 h-4 text-forest mr-2.5 shrink-0 mt-0.5" />
                            <span className="text-forest font-sans">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-border w-full">
                    <Link
                      href="/onboarding"
                      className={`w-full flex items-center justify-center p-3 rounded text-xs font-semibold tracking-wide transition-all ${
                        tier.popular
                          ? 'bg-forest text-[#FAF9F6] hover:bg-gold hover:text-forest border border-forest'
                          : 'bg-[#FAF9F6] text-forest hover:border-gold border border-stone-border'
                      }`}
                    >
                      Start Workspace Scan
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-stone-border py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-sage">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border border-forest flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-forest" />
                </div>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-forest">
                  Solace Website Intelligence
                </span>
              </div>

              <div className="flex space-x-6 text-[10px] font-mono uppercase tracking-wider">
                <Link href="/auth" className="hover:text-forest transition-colors">Admin Console</Link>
                <Link href="/onboarding" className="hover:text-forest transition-colors">Run Audit</Link>
                <span>© 2026 Solace. All rights reserved.</span>
              </div>
            </div>
          </footer>

        </motion.div>
      )}

    </div>
  );
}
