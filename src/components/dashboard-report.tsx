'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, CheckCircle, Clock, ListTodo, 
  ArrowRight, ShieldCheck, Mail, Calendar, Eye, Sparkles
} from 'lucide-react';
import { AuditReport } from '@/lib/mockData';

interface DashboardReportProps {
  report: AuditReport;
}

export default function DashboardReport({ report }: DashboardReportProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'success'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const startPdfDownload = () => {
    setDownloadState('generating');
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState('success');
          
          // Reset after a delay
          setTimeout(() => {
            setDownloadState('idle');
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const roadmapTasks = [
    {
      id: 'task-1',
      title: 'Inject Funeral Schema Structured Data',
      category: 'Local SEO',
      difficulty: 'Easy',
      status: 'todo',
      desc: 'Implement JSON-LD microdata mapping address, coordinates, and funeral service classification.'
    },
    {
      id: 'task-2',
      title: 'Move General Price List (GPL) to Primary Navigation',
      category: 'FTC Compliance',
      difficulty: 'Easy',
      status: 'in-progress',
      desc: 'Create clear HTML text link for pricing transparency in primary header.'
    },
    {
      id: 'task-3',
      title: 'Compress Obituary Portrait Cover Photos',
      category: 'Performance',
      difficulty: 'Medium',
      status: 'in-progress',
      desc: 'Set up automatic WebP compression pipelines for all newly uploaded obituary records.'
    },
    {
      id: 'task-4',
      title: 'Re-architect Obituary Search Input for Elders',
      category: 'UX / Accessibility',
      difficulty: 'Hard',
      status: 'todo',
      desc: 'Enlarge tap targets to minimum 48px and enable responsive client-side pagination.'
    },
    {
      id: 'task-5',
      title: 'Deploy Microsoft Clarity Script',
      category: 'Analytics',
      difficulty: 'Easy',
      status: 'resolved',
      desc: 'Activate Clarity tracking via Tag Manager to record user click behaviors.'
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* View Header */}
      <div className="border-b border-stone-border pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold block mb-1">
            Deliverable Suite
          </span>
          <h1 className="text-2xl md:text-3xl font-serif text-forest font-normal">
            Executive Report & Roadmap
          </h1>
          <p className="text-xs text-sage mt-1">
            Export presentation-ready audit results or monitor step-by-step roadmap progression.
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={startPdfDownload}
            disabled={downloadState !== 'idle'}
            className="flex items-center justify-center p-3 bg-forest text-[#FAF9F6] rounded text-xs font-semibold hover:bg-gold hover:text-forest transition-colors gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloadState === 'idle' && 'Download PDF Report'}
              {downloadState === 'generating' && `Generating PDF (${downloadProgress}%)`}
              {downloadState === 'success' && 'Report Exported Successfully'}
            </span>
          </button>

          <AnimatePresence>
            {downloadState === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 mt-2 bg-white border border-stone-border rounded-md shadow-lg p-3 text-xs text-forest z-20 flex items-center space-x-2 font-sans w-64"
              >
                <CheckCircle className="w-4 h-4 text-forest shrink-0" />
                <span>Solace_Report_{report.domain.split('.')[0]}.pdf ready. Check downloads.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid: Document Mockup & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Document Preview - 5 cols */}
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between aspect-[1/1.4] max-w-md mx-auto w-full select-none">
          <div className="flex-1 flex flex-col justify-between p-4 border border-stone-border rounded bg-stone-bg/20">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-stone-border pb-4 mb-4">
              <div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full border border-forest flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-forest" />
                  </div>
                  <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold text-forest">
                    Solace
                  </span>
                </div>
                <h3 className="font-serif text-[10px] text-sage tracking-wider mt-1 uppercase font-semibold">
                  WEBSITE INTELLIGENCE REPORT
                </h3>
              </div>
              <span className="text-[8px] font-mono text-sage">{report.timestamp}</span>
            </div>

            {/* Document body text */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-sage font-bold font-sans">
                  Subject Site
                </p>
                <p className="text-sm font-serif text-forest font-semibold mt-0.5">
                  {report.businessName}
                </p>
                <p className="text-[9px] font-mono text-sage">{report.domain}</p>
              </div>

              <div className="border-t border-stone-border pt-3">
                <p className="text-[9px] uppercase tracking-widest text-sage font-bold font-sans">
                  Executive Summary
                </p>
                <p className="text-[10px] text-forest leading-relaxed font-sans mt-1">
                  The subject site shows solid core traffic volume, but ranks critical on **Trust signals & FTC Price compliance**. Due to pricing files being hidden inside multi-tiered PDF frames, visitors suffer high conversion friction, depressing online pre-planning inquiries by an estimated **38%** relative to local benchmark metrics.
                </p>
              </div>

              {/* Dials list mockup */}
              <div className="grid grid-cols-3 gap-2 border-t border-stone-border pt-3">
                <div className="text-center bg-[#FAF9F6] border border-stone-border rounded p-2">
                  <span className="text-[8px] text-sage block leading-none font-bold">TRUST INDEX</span>
                  <span className="text-sm font-semibold font-mono text-forest mt-1 block">
                    {report.metrics.trust.score}%
                  </span>
                </div>
                <div className="text-center bg-[#FAF9F6] border border-stone-border rounded p-2">
                  <span className="text-[8px] text-sage block leading-none font-bold">SEO SCORES</span>
                  <span className="text-sm font-semibold font-mono text-forest mt-1 block">
                    {report.metrics.seo.score}%
                  </span>
                </div>
                <div className="text-center bg-[#FAF9F6] border border-stone-border rounded p-2">
                  <span className="text-[8px] text-sage block leading-none font-bold">OVERALL</span>
                  <span className="text-sm font-semibold font-mono text-forest mt-1 block">
                    {report.overallScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Document footer */}
            <div className="border-t border-stone-border pt-3 mt-4 flex justify-between items-center text-[8px] text-sage font-mono">
              <span>SOLACE ANALYTICS LTD</span>
              <span>PAGE 1 OF 12</span>
            </div>
          </div>
        </div>

        {/* Right Side: Roadmap - 7 cols */}
        <div className="lg:col-span-7 bg-white border border-stone-border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-sm text-forest font-bold mb-1">
              Optimization Roadmap
            </h3>
            <p className="text-[10px] text-sage mb-6">
              Track tasks required to secure maximum empathy and organic local rankings
            </p>

            <div className="space-y-4">
              {/* Backlog sections grouped */}
              {['in-progress', 'todo', 'resolved'].map((statusKey) => {
                const tasks = roadmapTasks.filter(t => t.status === statusKey);
                if (tasks.length === 0) return null;

                let title = 'To Do';
                let Icon = ListTodo;
                let titleColor = 'text-forest';
                if (statusKey === 'in-progress') {
                  title = 'In Progress';
                  Icon = Clock;
                  titleColor = 'text-gold';
                }
                if (statusKey === 'resolved') {
                  title = 'Resolved';
                  Icon = ShieldCheck;
                  titleColor = 'text-forest font-bold';
                }

                return (
                  <div key={statusKey} className="space-y-2">
                    <div className="flex items-center space-x-2 border-b border-stone-border pb-1">
                      <Icon className={`w-4 h-4 ${titleColor}`} />
                      <span className={`text-[10px] uppercase font-sans tracking-widest font-bold ${titleColor}`}>
                        {title}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div 
                          key={task.id} 
                          className="p-3.5 bg-stone-bg/35 border border-stone-border rounded-lg hover:border-gold transition-colors flex justify-between items-start gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-semibold text-forest font-sans">{task.title}</h4>
                              <span className="text-[9px] uppercase px-1.5 py-0.2 border border-stone-border bg-white rounded font-mono text-sage">
                                {task.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-sage font-sans leading-relaxed">{task.desc}</p>
                          </div>

                          <div className="text-right shrink-0 flex flex-col justify-between items-end h-full">
                            <span className="text-[9px] font-mono text-sage uppercase">{task.difficulty}</span>
                            {statusKey !== 'resolved' && (
                              <button 
                                className="text-[9px] text-forest hover:text-gold transition-colors font-sans mt-2 flex items-center group font-medium"
                                onClick={() => alert(`Simulating task upgrade: Resolving ${task.title}`)}
                              >
                                Resolve
                                <ArrowRight className="w-2.5 h-2.5 ml-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
