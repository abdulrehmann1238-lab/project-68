'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, Sparkles, Code2, FileText, Settings, 
  Menu, X, ChevronDown, Check, Globe, HelpCircle, LogOut, Plus
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getBusinessNameFromUrl } from '@/lib/mockData';

interface DashboardShellProps {
  children: React.ReactNode;
  businessName: string;
  domain: string;
}

export default function DashboardShell({ children, businessName, domain }: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  // Re-read parameters to keep state intact
  const urlParam = searchParams.get('url') || 'www.greenwoodchapel.com';
  const competitorParam = searchParams.get('competitors') || '';

  const navigationItems = [
    { id: 'overview', name: 'Executive Insights', icon: Activity },
    { id: 'competitors', name: 'Competitor Analysis', icon: Users },
    { id: 'redesign', name: 'AI Redesign Studio', icon: Sparkles },
    { id: 'tracking', name: 'Tracking Detection', icon: Code2 },
    { id: 'report', name: 'Executive Reports', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const simulatedWorkspaces = [
    { name: businessName, url: urlParam },
    { name: 'Solace Rest Gardens', url: 'www.solacerest.com' },
    { name: 'Oakwood Memorials', url: 'www.oakwoodmemorials.com' },
  ];

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
    setMobileMenuOpen(false);
  };

  const handleWorkspaceChange = (workspace: typeof simulatedWorkspaces[0]) => {
    const params = new URLSearchParams();
    params.set('url', workspace.url);
    params.set('tab', 'overview');
    router.push(`${pathname}?${params.toString()}`);
    setWorkspaceOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-bg flex flex-col md:flex-row relative">
      
      {/* Mobile Top Navigation bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-stone-border w-full sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-forest" />
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-forest">
            Solace
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-stone-bg rounded border border-stone-border text-forest"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-stone-border h-screen sticky top-0 shrink-0">
        {/* Brand / Logo */}
        <div className="px-6 py-6 border-b border-stone-border flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-forest" />
            </div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-forest">
              Solace
            </span>
          </Link>
          <span className="text-[9px] uppercase tracking-widest text-sage border border-stone-border px-1.5 py-0.5 rounded bg-stone-bg">
            Demo
          </span>
        </div>

        {/* Workspace Switcher */}
        <div className="px-4 py-4 border-b border-stone-border relative">
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-stone-bg border border-stone-border text-left transition-colors duration-150 group"
          >
            <div className="truncate">
              <p className="text-[10px] uppercase font-sans tracking-widest text-sage leading-none mb-1 font-semibold">
                Active Audit
              </p>
              <p className="text-xs font-serif text-forest truncate group-hover:text-gold transition-colors">
                {businessName}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-sage group-hover:text-forest shrink-0 transition-colors ml-2" />
          </button>

          <AnimatePresence>
            {workspaceOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setWorkspaceOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-4 right-4 mt-1 bg-white border border-stone-border rounded-md shadow-lg z-20 overflow-hidden"
                >
                  <div className="py-1">
                    {simulatedWorkspaces.map((ws) => (
                      <button
                        key={ws.url}
                        onClick={() => handleWorkspaceChange(ws)}
                        className="w-full flex items-center justify-between px-4 py-2 text-left text-xs text-forest hover:bg-stone-bg hover:text-gold transition-colors"
                      >
                        <div className="truncate">
                          <p className="font-medium font-serif leading-normal truncate">{ws.name}</p>
                          <p className="text-[10px] text-sage truncate">{ws.url}</p>
                        </div>
                        {ws.url === urlParam && <Check className="w-3.5 h-3.5 text-forest shrink-0 ml-2" />}
                      </button>
                    ))}
                    <div className="border-t border-stone-border mt-1 pt-1">
                      <Link
                        href="/onboarding"
                        className="w-full flex items-center px-4 py-2 text-left text-xs text-sage hover:text-forest hover:bg-stone-bg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 mr-2" />
                        Run New Audit...
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-xs font-medium tracking-wide transition-all duration-200 text-left ${
                  isActive 
                    ? 'bg-stone-bg text-forest border-l-2 border-forest font-semibold' 
                    : 'text-sage hover:text-forest hover:bg-stone-bg/60 border-l-2 border-transparent'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-forest' : 'text-sage'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Support Info */}
        <div className="p-4 border-t border-stone-border bg-stone-bg/40 flex flex-col gap-2.5">
          <Link 
            href="/auth" 
            className="flex items-center space-x-2.5 px-3 py-2 text-xs text-sage hover:text-forest transition-colors w-full rounded"
          >
            <LogOut className="w-4 h-4 text-sage" />
            <span>Sign Out Demo</span>
          </Link>
          <div className="flex items-center justify-between px-3 text-[10px] text-sage">
            <span className="font-mono">v1.12.0</span>
            <span className="flex items-center cursor-pointer hover:text-forest transition-colors">
              <HelpCircle className="w-3 h-3 mr-1" />
              Help Center
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white border-r border-stone-border z-50 flex flex-col p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-stone-border">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full border border-forest flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-forest" />
                  </div>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-forest">
                    Solace
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-stone-bg rounded border border-stone-border text-sage hover:text-forest"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Active Workspace Display */}
              <div className="py-4 border-b border-stone-border mb-4">
                <p className="text-[10px] uppercase font-sans tracking-widest text-sage leading-none mb-1">
                  Active Audit
                </p>
                <p className="text-sm font-serif text-forest truncate">
                  {businessName}
                </p>
                <p className="text-xs text-sage truncate font-mono mt-0.5">{domain}</p>
              </div>

              {/* Mobile Navigation List */}
              <nav className="flex-1 space-y-1.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded text-xs font-medium tracking-wide transition-all ${
                        isActive 
                          ? 'bg-stone-bg text-forest border-l-2 border-forest font-bold' 
                          : 'text-sage hover:text-forest hover:bg-stone-bg/60 border-l-2 border-transparent'
                      }`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-forest' : 'text-sage'}`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Switcher Shortcuts */}
              <div className="border-t border-stone-border pt-4 mt-4 space-y-2">
                <p className="text-[10px] uppercase font-sans tracking-widest text-sage leading-none mb-2">
                  Quick Switch Sites
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleWorkspaceChange({ name: 'Solace Gardens', url: 'www.solacerest.com' })}
                    className="p-2 bg-stone-bg hover:bg-stone-border rounded text-[10px] text-forest text-center font-serif truncate"
                  >
                    Solace Gardens
                  </button>
                  <button 
                    onClick={() => handleWorkspaceChange({ name: 'Oakwood Memorial', url: 'www.oakwoodmemorials.com' })}
                    className="p-2 bg-stone-bg hover:bg-stone-border rounded text-[10px] text-forest text-center font-serif truncate"
                  >
                    Oakwood Memorial
                  </button>
                </div>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center p-2.5 border border-dashed border-stone-border rounded text-xs text-sage hover:text-forest hover:bg-stone-bg transition-all"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  Audit Another Site
                </Link>
              </div>

              <div className="border-t border-stone-border pt-4 mt-4">
                <Link 
                  href="/auth" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-xs text-sage hover:text-forest transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Dashboard Demo</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header Console (Desktop Only) */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-stone-border sticky top-0 z-30 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-sage font-mono">
              <Globe className="w-3.5 h-3.5 text-sage" />
              <span className="text-forest hover:underline cursor-pointer select-all">{domain}</span>
            </div>
            <span className="h-4 w-[1px] bg-stone-border" />
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              <span className="text-[10px] text-forest font-semibold uppercase tracking-wider font-sans">
                Audit Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[10px] text-sage block leading-none font-sans uppercase tracking-widest font-semibold">
                Evaluation Lock
              </span>
              <span className="text-xs text-forest font-serif mt-1 block">
                Supabase ready (demo mode)
              </span>
            </div>
            <span className="h-6 w-[1px] bg-stone-border" />
            
            {/* User Profile Info Mock */}
            <div className="flex items-center space-x-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#1E352F] text-[#FAF9F6] font-serif text-sm flex items-center justify-center border border-stone-border shadow-inner">
                JD
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-forest leading-none group-hover:text-gold transition-colors">
                  John Davis
                </p>
                <p className="text-[10px] text-sage leading-none mt-1">
                  Director
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Sub-view Content */}
        <main className="flex-1 bg-stone-bg relative w-full overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
