'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  Activity, ShieldAlert, ShieldCheck, Search, Eye, Zap, Code2, Sparkles, 
  ArrowUpRight, AlertTriangle, Info, CheckCircle2, ChevronRight
} from 'lucide-react';
import { AuditReport } from '@/lib/mockData';

interface DashboardOverviewProps {
  report: AuditReport;
  setActiveTab: (tab: string) => void;
}

export default function DashboardOverview({ report, setActiveTab }: DashboardOverviewProps) {
  // Score color maps
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-forest';
    if (score >= 60) return 'text-gold';
    return 'text-red-700';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-forest/10 border-forest/20';
    if (score >= 60) return 'bg-gold/10 border-gold/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Optimal';
    if (score >= 60) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome & Summary Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-border pb-6">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
            Executive Briefing
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
            Website Audit: {report.businessName}
          </h1>
          <p className="text-xs text-sage mt-1">
            Audit compiled on {report.timestamp} • Database status: <span className="font-semibold text-forest">Supabase Ready</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white p-2.5 rounded-lg border border-stone-border shadow-sm">
          <div className="w-10 h-10 rounded bg-stone-bg flex items-center justify-center">
            <Info className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-[10px] text-sage uppercase tracking-widest leading-none font-bold">
              Target Audience
            </p>
            <p className="text-xs font-serif text-forest font-medium mt-1">
              Grieving Families & Pre-Planning Inquirers
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Overall Score Circular Dial + Six Core Pillar Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Overall Score Dial Card */}
        <div className="bg-white border border-stone-border rounded-xl p-6 flex flex-col justify-between items-center shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="w-full flex justify-between items-start z-10">
            <span className="text-[10px] uppercase tracking-widest text-sage font-semibold">
              Solace Trust Index
            </span>
            <div className="px-2 py-0.5 rounded text-[10px] font-medium bg-forest/10 text-forest border border-forest/20">
              Verified
            </div>
          </div>

          <div className="my-6 relative flex items-center justify-center z-10">
            {/* SVG Circle indicator */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-stone-border"
                strokeWidth="6"
                fill="transparent"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-forest"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={427}
                initial={{ strokeDashoffset: 427 }}
                animate={{ strokeDashoffset: 427 - (427 * report.overallScore) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-light font-mono text-forest leading-none">
                {report.overallScore}
              </span>
              <span className="text-[10px] text-sage uppercase tracking-widest mt-1">
                Score
              </span>
            </div>
          </div>

          <div className="text-center z-10 w-full">
            <p className="text-xs font-serif text-forest italic">
              "Your site ranks above {Math.round(report.overallScore - 12)}% of regional competitors."
            </p>
            <div className="border-t border-stone-border mt-4 pt-3 flex justify-between text-[11px] text-sage">
              <span>Ideal Range: 85+</span>
              <span className="font-semibold text-forest">Performance Mode</span>
            </div>
          </div>
        </div>

        {/* Six Core Pillars Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(report.metrics).map(([key, item]) => {
            let Icon = Activity;
            if (key === 'trust') Icon = ShieldCheck;
            if (key === 'seo') Icon = Search;
            if (key === 'ux') Icon = Eye;
            if (key === 'performance') Icon = Zap;
            if (key === 'ai') Icon = Sparkles;
            if (key === 'tracking') Icon = Code2;

            return (
              <div 
                key={key} 
                className="bg-white border border-stone-border rounded-xl p-5 hover:border-gold hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  if (key === 'competitors') setActiveTab('competitors');
                  else if (key === 'tracking') setActiveTab('tracking');
                  else if (key === 'ai') setActiveTab('redesign');
                  else setActiveTab('overview'); // Or custom section scroll
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-bg border border-stone-border flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                      <Icon className="w-4 h-4 text-forest" />
                    </div>
                    <div>
                      <h3 className="text-xs font-serif text-forest font-semibold">{item.name}</h3>
                      <p className="text-[10px] text-sage truncate max-w-[150px]">{item.details}</p>
                    </div>
                  </div>
                  
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${getScoreBg(item.score)} font-medium`}>
                    {getScoreBadge(item.score)}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="text-sage font-light">Audit Score</span>
                    <span className={`text-base font-medium ${getScoreColor(item.score)}`}>
                      {item.score}<span className="text-[10px] text-sage">/100</span>
                    </span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full h-[3px] bg-stone-bg rounded overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.score >= 80 ? 'bg-forest' : item.score >= 60 ? 'bg-gold' : 'bg-red-700'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1.2, delay: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Grid: Spider Web Comparison & Historical conversions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Spider Web (Radar) Analysis - 5 cols */}
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between h-[360px] md:h-[420px]">
          <div>
            <h3 className="font-serif text-sm text-forest font-bold">
              Solace Comparison Matrix
            </h3>
            <p className="text-[10px] text-sage mt-1">
              Your site benchmarked against regional competitors' averages
            </p>
          </div>

          <div className="flex-1 w-full h-64 md:h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={report.radarData}>
                <PolarGrid stroke="#E6E4DF" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#6D8C7F', fontSize: 10, fontFamily: 'Plus Jakarta Sans' }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6D8C7F', fontSize: 8 }}
                />
                <Radar
                  name="Current Site"
                  dataKey="current"
                  stroke="#1E352F"
                  fill="#1E352F"
                  fillOpacity={0.15}
                />
                <Radar
                  name="Competitor Avg"
                  dataKey="competitorAvg"
                  stroke="#C5A880"
                  fill="#C5A880"
                  fillOpacity={0.08}
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
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center space-x-6 text-[10px] font-sans border-t border-stone-border pt-3">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-forest opacity-80 mr-1.5 rounded-sm" />
              <span className="text-forest font-medium">Your Website</span>
            </div>
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-gold opacity-80 mr-1.5 rounded-sm" />
              <span className="text-sage">Competitor Average</span>
            </div>
          </div>
        </div>

        {/* Traffic and Conversion trends - 7 cols */}
        <div className="lg:col-span-7 bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between h-[360px] md:h-[420px]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-sm text-forest font-bold">
                Engagement & Pre-Need Trends
              </h3>
              <p className="text-[10px] text-sage mt-1">
                Estimated monthly organic visits vs. online arrangements started
              </p>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-sage border border-stone-border px-2 py-0.5 rounded bg-stone-bg font-mono">
              6-Month Log
            </span>
          </div>

          <div className="flex-1 w-full h-64 md:h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={report.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E352F" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1E352F" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorConvs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A880" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#C5A880" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
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
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  name="Monthly Visits" 
                  stroke="#1E352F" 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  name="Arrangements Started" 
                  stroke="#C5A880" 
                  fillOpacity={1} 
                  fill="url(#colorConvs)" 
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-stone-border pt-3 mt-2 flex flex-col md:flex-row md:justify-between items-center text-[10px] text-sage gap-2">
            <span className="italic">Notice: Conversions lag traffic during seasonal periods.</span>
            <button 
              onClick={() => setActiveTab('report')}
              className="flex items-center text-forest font-semibold hover:text-gold transition-colors text-xs"
            >
              Export detailed analytics
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

        </div>

      </div>

      {/* Critical Findings Checklist Section */}
      <div className="bg-white border border-stone-border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-border pb-4 mb-5">
          <div>
            <h3 className="font-serif text-base text-forest font-bold">
              Critical Integrity Checkpoints
            </h3>
            <p className="text-xs text-sage mt-1">
              Actions requiring immediate attention to establish emotional trust and secure pre-need traffic
            </p>
          </div>
          <div className="flex space-x-2">
            <span className="text-[10px] font-sans px-2.5 py-1 rounded-full bg-red-500/10 text-red-800 border border-red-200">
              High Impact: {report.uxIssues.filter(i => i.impact === 'high').length + report.seoIssues.filter(i => i.impact === 'high').length}
            </span>
            <span className="text-[10px] font-sans px-2.5 py-1 rounded-full bg-gold/10 text-yellow-800 border border-gold/20">
              Medium Impact: {report.uxIssues.filter(i => i.impact === 'medium').length + report.seoIssues.filter(i => i.impact === 'medium').length}
            </span>
          </div>
        </div>

        {/* Issues list */}
        <div className="divide-y divide-stone-border">
          {/* Trust Checkpoints (UX) */}
          {report.uxIssues.map((issue) => (
            <div key={issue.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start gap-4 hover:bg-stone-bg/20 px-2 rounded transition-colors duration-150">
              <div className="flex items-start space-x-3 md:w-2/3">
                <div className="mt-0.5">
                  {issue.impact === 'high' ? (
                    <ShieldAlert className="w-4.5 h-4.5 text-red-700 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4.5 h-4.5 text-gold shrink-0" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-semibold text-forest font-sans">{issue.title}</h4>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-bg border border-stone-border text-sage font-mono">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-xs text-sage mt-1.5 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col justify-between items-start md:items-end gap-2.5 h-full self-stretch pl-7 md:pl-0">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                  issue.impact === 'high' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {issue.impact} priority
                </span>
                
                <button
                  onClick={() => setActiveTab(issue.category === 'Trust' ? 'redesign' : 'overview')}
                  className="text-xs text-forest hover:text-gold font-medium flex items-center group transition-colors mt-1"
                >
                  <span>Solve with AI Studio</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* Local SEO Checkpoints */}
          {report.seoIssues.slice(0, 2).map((issue) => (
            <div key={issue.id} className="py-4 flex flex-col md:flex-row md:items-start gap-4 hover:bg-stone-bg/20 px-2 rounded transition-colors duration-150">
              <div className="flex items-start space-x-3 md:w-2/3">
                <div className="mt-0.5">
                  <Search className="w-4.5 h-4.5 text-forest shrink-0" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-semibold text-forest font-sans">{issue.title}</h4>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-bg border border-stone-border text-sage font-mono">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-xs text-sage mt-1.5 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col justify-between items-start md:items-end gap-2.5 h-full self-stretch pl-7 md:pl-0">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-stone-bg text-forest">
                  {issue.impact} priority
                </span>
                
                <button
                  onClick={() => setActiveTab('report')}
                  className="text-xs text-forest hover:text-gold font-medium flex items-center group transition-colors mt-1"
                >
                  <span>Review Code Snippet</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
