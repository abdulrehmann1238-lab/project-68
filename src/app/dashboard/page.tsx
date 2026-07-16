'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAuditReport, AuditReport } from '@/lib/mockData';
import DashboardShell from '@/components/dashboard-shell';
import DashboardOverview from '@/components/dashboard-overview';
import DashboardCompetitors from '@/components/dashboard-competitors';
import DashboardRedesign from '@/components/dashboard-redesign';
import DashboardTracking from '@/components/dashboard-tracking';
import DashboardReport from '@/components/dashboard-report';
import DashboardSettings from '@/components/dashboard-settings';
import { Sparkles, Activity } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read search parameters safely
  const urlParam = searchParams.get('url') || 'www.greenwoodchapel.com';
  const competitorParam = searchParams.get('competitors') || '';
  const activeTab = searchParams.get('tab') || 'overview';

  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Split competitor URLs
    const competitorList = competitorParam
      ? competitorParam.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    // Simulate a brief database fetch delay (300ms) to feel highly dynamic and real
    const timer = setTimeout(() => {
      const generated = generateAuditReport(urlParam, competitorList);
      setReport(generated);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [urlParam, competitorParam]);

  // Tab switching navigator helper
  const handleSetTab = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`/dashboard?${params.toString()}`);
  };

  if (isLoading || !report) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-stone-bg">
        <div className="flex flex-col items-center space-y-4">
          {/* Subtle luxurious pulse spinner */}
          <div className="w-8 h-8 rounded-full border border-forest flex items-center justify-center animate-spin">
            <div className="w-2.5 h-2.5 rounded-full bg-forest" />
          </div>
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-sage font-medium">
            Fetching Audit Records
          </span>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell businessName={report.businessName} domain={report.domain}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="min-h-full pb-16"
        >
          {activeTab === 'overview' && (
            <DashboardOverview report={report} setActiveTab={handleSetTab} />
          )}
          {activeTab === 'competitors' && (
            <DashboardCompetitors report={report} />
          )}
          {activeTab === 'redesign' && (
            <DashboardRedesign report={report} />
          )}
          {activeTab === 'tracking' && (
            <DashboardTracking report={report} />
          )}
          {activeTab === 'report' && (
            <DashboardReport report={report} />
          )}
          {activeTab === 'settings' && (
            <DashboardSettings report={report} />
          )}
        </motion.div>
      </AnimatePresence>
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-stone-bg">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full border border-forest flex items-center justify-center animate-spin">
            <div className="w-2.5 h-2.5 rounded-full bg-forest" />
          </div>
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-sage font-medium">
            Initializing Solace
          </span>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

