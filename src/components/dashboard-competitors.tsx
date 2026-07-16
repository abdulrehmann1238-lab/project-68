'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, Check, X, AlertCircle, ArrowUpRight, TrendingUp, ShieldAlert, Award
} from 'lucide-react';
import { AuditReport } from '@/lib/mockData';

interface DashboardCompetitorsProps {
  report: AuditReport;
}

export default function DashboardCompetitors({ report }: DashboardCompetitorsProps) {
  // Format data for Recharts Bar Chart
  const chartData = [
    {
      name: 'Trust Index',
      [report.businessName]: report.metrics.trust.score,
      ...report.competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.trustScore }), {})
    },
    {
      name: 'Local SEO',
      [report.businessName]: report.metrics.seo.score,
      ...report.competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.seoScore }), {})
    },
    {
      name: 'User Experience',
      [report.businessName]: report.metrics.ux.score,
      ...report.competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.uxScore }), {})
    },
    {
      name: 'Performance',
      [report.businessName]: report.metrics.performance.score,
      ...report.competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.performanceScore }), {})
    },
    {
      name: 'Tracking Tag',
      [report.businessName]: report.metrics.tracking.score,
      ...report.competitors.reduce((acc, comp) => ({ ...acc, [comp.name]: comp.trackingMaturity }), {})
    }
  ];

  const colors = ['#1E352F', '#C5A880', '#6D8C7F', '#A39F93'];

  // Table items for audit matrix
  const matrixItems = [
    {
      feature: 'Obituary Mobile Accessibility',
      yourSite: { ok: false, detail: 'Laggy, small fonts' },
      comp1: { ok: true, detail: 'Accessible, fast' },
      comp2: { ok: false, detail: 'Buried in PDF links' }
    },
    {
      feature: 'FTC General Price List (GPL) Transparency',
      yourSite: { ok: false, detail: 'Burying PDF (High Risk)' },
      comp1: { ok: false, detail: 'No online GPL' },
      comp2: { ok: true, detail: 'Visible HTML table' }
    },
    {
      feature: 'Google Local Business Schema',
      yourSite: { ok: false, detail: 'Missing tags' },
      comp1: { ok: true, detail: 'Structured correctly' },
      comp2: { ok: false, detail: 'Outdated schema' }
    },
    {
      feature: 'Online Arrangement Tool',
      yourSite: { ok: false, detail: 'Contact form only' },
      comp1: { ok: false, detail: 'Print PDF only' },
      comp2: { ok: true, detail: 'Online checklist' }
    },
    {
      feature: 'Google Maps Rank (Obituary Pack)',
      yourSite: { ok: true, detail: '#3 in local grid' },
      comp1: { ok: true, detail: '#1 in local grid' },
      comp2: { ok: false, detail: '#7 in local grid' }
    },
    {
      feature: 'Analytics & Funnel Tracking',
      yourSite: { ok: false, detail: 'Basic tags broken' },
      comp1: { ok: true, detail: 'Fully configured GTM' },
      comp2: { ok: false, detail: 'Google Analytics missing' }
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* View Header */}
      <div className="border-b border-stone-border pb-6">
        <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
          Market Intelligence
        </span>
        <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
          Competitor Gap Analysis
        </h1>
        <p className="text-xs text-sage mt-1">
          Evaluating structural advantages and SEO keyword positioning against local deathcare providers.
        </p>
      </div>

      {/* Recharts Comparison Bar Chart */}
      <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-serif text-sm text-forest font-bold">
              Core Metric Benchmarks
            </h3>
            <p className="text-[10px] text-sage">
              Side-by-side comparison of optimization categories (higher is better)
            </p>
          </div>
          <span className="flex items-center text-[10px] font-sans px-2 py-0.5 rounded border border-stone-border bg-stone-bg text-forest">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Competitive Score
          </span>
        </div>

        <div className="w-full h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#6D8C7F', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: '#6D8C7F', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FAF9F6', 
                  borderColor: '#E6E4DF', 
                  borderRadius: '6px',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '11px'
                }} 
              />
              <Legend 
                wrapperStyle={{ 
                  fontSize: '11px', 
                  fontFamily: 'Plus Jakarta Sans',
                  paddingTop: '15px'
                }}
              />
              <Bar dataKey={report.businessName} fill={colors[0]} radius={[2, 2, 0, 0]} barSize={25} />
              {report.competitors.map((comp, idx) => (
                <Bar key={comp.name} dataKey={comp.name} fill={colors[(idx + 1) % colors.length]} radius={[2, 2, 0, 0]} barSize={20} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Grid Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {report.competitors.map((comp, idx) => (
          <div key={comp.name} className="bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start border-b border-stone-border pb-4 mb-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-sage border border-stone-border px-1.5 py-0.5 rounded bg-stone-bg font-mono">
                  Competitor {idx + 1}
                </span>
                <h3 className="font-serif text-base text-forest font-semibold mt-1">
                  {comp.name}
                </h3>
                <p className="text-[10px] text-sage font-mono mt-0.5">{comp.url}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-sage block uppercase tracking-widest leading-none font-bold">
                  Solace Rank
                </span>
                <span className="text-xl font-light font-mono text-gold mt-1 block">
                  {comp.overallScore}<span className="text-xs text-sage font-sans">/100</span>
                </span>
              </div>
            </div>

            {/* Strengths & Weaknesses details */}
            <div className="grid grid-cols-2 gap-4 text-xs mt-2">
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-sans tracking-widest text-forest font-semibold">
                  Key Strengths
                </p>
                <ul className="space-y-1.5 text-sage">
                  <li className="flex items-start">
                    <Check className="w-3.5 h-3.5 text-forest mr-1 shrink-0 mt-0.5" />
                    <span>{idx === 0 ? 'Excellent Local Schema tags' : 'HTML-based online arrangement list'}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-3.5 h-3.5 text-forest mr-1 shrink-0 mt-0.5" />
                    <span>{idx === 0 ? 'Fast mobile page load speeds' : 'High Google Map grid review counts'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-sans tracking-widest text-red-800 font-semibold">
                  Vulnerabilities
                </p>
                <ul className="space-y-1.5 text-sage">
                  <li className="flex items-start">
                    <X className="w-3.5 h-3.5 text-red-700 mr-1 shrink-0 mt-0.5" />
                    <span>{idx === 0 ? 'No General Price List (GPL) page' : 'Poor mobile navigation layout'}</span>
                  </li>
                  <li className="flex items-start">
                    <X className="w-3.5 h-3.5 text-red-700 mr-1 shrink-0 mt-0.5" />
                    <span>{idx === 0 ? 'Analytics data is firing blindly' : 'Obituary index images uncompressed'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-stone-border mt-5 pt-3 flex justify-between items-center text-[10px] text-sage">
              <span>SEO position: {idx === 0 ? 'Page 1, Rank 2' : 'Page 1, Rank 5'}</span>
              <span className="font-semibold text-forest flex items-center cursor-pointer hover:underline">
                View Site Audit
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Audit Matrix Table */}
      <div className="bg-white border border-stone-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-border">
          <h3 className="font-serif text-sm text-forest font-bold">
            Pillar Audit Matrix
          </h3>
          <p className="text-[10px] text-sage mt-1">
            Comparing concrete digital features and FTC regulatory compliance variables
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-bg/60 border-b border-stone-border">
                <th className="p-4 font-semibold text-forest tracking-wide">Feature Pillar</th>
                <th className="p-4 font-semibold text-forest tracking-wide bg-forest/5 border-x border-stone-border">{report.businessName} (You)</th>
                {report.competitors.map((comp) => (
                  <th key={comp.name} className="p-4 font-semibold text-forest tracking-wide">{comp.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border">
              {matrixItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-bg/25 transition-colors">
                  <td className="p-4 font-sans font-medium text-forest">{item.feature}</td>
                  
                  {/* Your Site column */}
                  <td className="p-4 bg-forest/5 border-x border-stone-border">
                    <div className="flex items-center space-x-2">
                      {item.yourSite.ok ? (
                        <Check className="w-4 h-4 text-forest shrink-0" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                      )}
                      <span className={item.yourSite.ok ? 'text-forest font-medium' : 'text-red-700 font-semibold'}>
                        {item.yourSite.detail}
                      </span>
                    </div>
                  </td>

                  {/* Competitor 1 column */}
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {item.comp1.ok ? (
                        <Check className="w-4 h-4 text-forest shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-sage shrink-0" />
                      )}
                      <span className="text-sage">{item.comp1.detail}</span>
                    </div>
                  </td>

                  {/* Competitor 2 column */}
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {item.comp2.ok ? (
                        <Check className="w-4 h-4 text-forest shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-sage shrink-0" />
                      )}
                      <span className="text-sage">{item.comp2.detail}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
