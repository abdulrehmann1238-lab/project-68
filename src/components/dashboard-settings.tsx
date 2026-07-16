'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, User, Shield, CreditCard, Key, Bell, 
  Check, Globe, Mail, Plus, Trash2, Info, ArrowUpRight
} from 'lucide-react';
import { AuditReport } from '@/lib/mockData';

interface DashboardSettingsProps {
  report: AuditReport;
}

export default function DashboardSettings({ report }: DashboardSettingsProps) {
  const [workspaceName, setWorkspaceName] = useState(report.businessName);
  const [domainUrl, setDomainUrl] = useState(report.url);
  const [apiKey, setApiKey] = useState('sol_live_58c2f10dbe9a81c3bde71f');
  const [showKey, setShowKey] = useState(false);

  const teamMembers = [
    { name: 'John Davis', email: 'j.davis@funeralgroup.com', role: 'Owner / Director', status: 'Active' },
    { name: 'Sarah Miller', email: 's.miller@funeralgroup.com', role: 'Arrangement Counselor', status: 'Active' },
    { name: 'Alex Thompson', email: 'alex@agencedigitale.com', role: 'External Developer', status: 'Active' }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-stone-border pb-6">
        <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
          Console Settings
        </span>
        <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
          Workspace Controls
        </h1>
        <p className="text-xs text-sage mt-1">
          Manage integrations, API keys, team permissions, and billing subscriptions.
        </p>
      </div>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: General & Teams settings - 7 cols */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Workspace Details Form */}
          <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-sm text-forest font-bold mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-forest" />
              General Details
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">
                    Funeral Home Name
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold">
                    Primary Domain URL
                  </label>
                  <input
                    type="text"
                    value={domainUrl}
                    onChange={(e) => setDomainUrl(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FAF9F6] border border-stone-border rounded hover:border-gold focus:border-forest focus:ring-1 focus:ring-forest outline-none transition-colors text-forest font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-stone-border mt-4">
                <button 
                  onClick={() => alert("Settings saved successfully (simulated).")}
                  className="px-4 py-2.5 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors"
                >
                  Save Workspace Changes
                </button>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-sm text-forest font-bold flex items-center">
                <User className="w-4 h-4 mr-2 text-forest" />
                Workspace Team Members
              </h3>
              <button 
                onClick={() => alert("Simulated: Inviting new member...")}
                className="text-xs text-forest hover:text-gold font-semibold flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Invite Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-border text-sage font-semibold bg-stone-bg/30">
                    <th className="p-3">Member</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border">
                  {teamMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-stone-bg/20 transition-colors">
                      <td className="p-3">
                        <div className="font-medium text-forest">{member.name}</div>
                        <div className="text-[10px] text-sage">{member.email}</div>
                      </td>
                      <td className="p-3 text-sage">{member.role}</td>
                      <td className="p-3">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-forest/10 border border-forest/20 text-forest font-medium font-sans">
                          {member.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-sage hover:text-red-700 transition-colors">
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Side: API Keys & Billing settings - 5 cols */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* API Keys Configuration */}
          <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-sm text-forest font-bold mb-3 flex items-center">
              <Key className="w-4 h-4 mr-2 text-forest" />
              API Settings
            </h3>
            <p className="text-[10px] text-sage leading-relaxed mb-4">
              Integrate Solace audit datasets into your CMS or CRM pipelines (e.g. Supabase webhooks).
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-sans tracking-widest text-sage font-semibold block">
                  Solace API Key
                </label>
                <div className="flex space-x-2">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="flex-1 text-xs p-3 bg-[#FAF9F6] border border-stone-border rounded text-forest font-mono"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="px-3 border border-stone-border rounded text-xs text-sage hover:text-forest hover:bg-stone-bg transition-colors"
                  >
                    {showKey ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="bg-stone-bg/60 p-3.5 border border-stone-border rounded text-[10px] text-sage flex items-start">
                <Info className="w-4 h-4 text-forest mr-2 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-forest block mb-0.5">Need a Supabase connection?</span>
                  <span>Connect tables via standard postgres credentials under the Workspace Integrations panel.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Card Info */}
          <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-sm text-forest font-bold mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-forest" />
                Stripe Billing Subscription
              </h3>
              <div className="p-4 bg-stone-bg/70 border border-stone-border rounded-lg mb-4">
                <span className="text-[8px] uppercase tracking-widest text-sage block font-bold">Current Tier</span>
                <span className="text-base font-serif text-forest mt-1.5 block font-semibold">
                  Enterprise Agency Trial
                </span>
                <span className="text-[10px] text-sage mt-1 block">
                  Active until August 15, 2026 • Billing auto-renews at $189/mo
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert("Simulating Stripe Checkout initialization...")}
              className="w-full flex items-center justify-center p-3 bg-[#FAF9F6] text-forest border border-stone-border rounded text-xs font-semibold hover:border-gold hover:text-gold transition-colors gap-2"
            >
              <span>Manage Card details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Luxury Light Theme lock lock banner */}
          <div className="bg-[#1E352F]/5 border border-[#1E352F]/10 rounded-xl p-5 text-xs text-sage">
            <span className="text-[9px] uppercase tracking-widest text-forest font-bold block mb-1">
              Visual Preferences
            </span>
            <p className="text-forest">
              **Theme: Light Mode Locked**
            </p>
            <p className="text-[10px] text-sage mt-1 leading-relaxed">
              This demo locks the UI to the Light Theme specifically to highlight the warm stone, linen, forest, and sage color palettes requested for quiet luxury branding.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
