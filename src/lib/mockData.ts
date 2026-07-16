export interface AuditMetric {
  name: string;
  score: number;
  maxScore: number;
  status: 'optimal' | 'warning' | 'critical';
  details: string;
}

export interface TrackingItem {
  id: string;
  name: string;
  category: 'analytics' | 'marketing' | 'compliance';
  status: 'active' | 'missing' | 'warning';
  description: string;
}

export interface SEOIssue {
  id: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  category: 'On-Page' | 'Local' | 'Technical' | 'Content';
  status: 'fixed' | 'pending';
  description: string;
  recommendation: string;
}

export interface UXIssue {
  id: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  category: 'Trust' | 'Accessibility' | 'Navigation' | 'Empathy';
  status: 'fixed' | 'pending';
  description: string;
  recommendation: string;
}

export interface RedesignConcept {
  id: string;
  name: string;
  tagline: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  focusArea: string;
  description: string;
  benefits: string[];
  mockupState: {
    heroTitle: string;
    heroSubtitle: string;
    buttonText: string;
    layoutType: 'editorial' | 'minimalist' | 'classic';
  };
}

export interface AuditReport {
  url: string;
  domain: string;
  businessName: string;
  timestamp: string;
  overallScore: number;
  metrics: {
    trust: AuditMetric;
    seo: AuditMetric;
    ux: AuditMetric;
    performance: AuditMetric;
    ai: AuditMetric;
    tracking: AuditMetric;
  };
  trackingList: TrackingItem[];
  seoIssues: SEOIssue[];
  uxIssues: UXIssue[];
  competitors: {
    name: string;
    url: string;
    overallScore: number;
    trustScore: number;
    seoScore: number;
    uxScore: number;
    performanceScore: number;
    trackingMaturity: number;
  }[];
  redesignConcepts: RedesignConcept[];
  timelineData: {
    month: string;
    visits: number;
    conversions: number;
    trustRating: number;
  }[];
  radarData: {
    subject: string;
    current: number;
    competitorAvg: number;
    fullMark: number;
  }[];
}

// Extract a readable business name from URL (e.g. www.greenwoodchapel.com -> Greenwood Chapel)
export function getBusinessNameFromUrl(url: string): string {
  try {
    let clean = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    clean = clean.split('/')[0];
    clean = clean.split('.')[0];
    // Capitalize and format
    return clean
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (e) {
    return 'Your Funeral Home';
  }
}

export function getCleanDomain(url: string): string {
  try {
    let clean = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return clean.split('/')[0];
  } catch (e) {
    return url;
  }
}

export function generateAuditReport(url: string, competitorUrls: string[] = []): AuditReport {
  const domain = getCleanDomain(url);
  const businessName = getBusinessNameFromUrl(url);

  // Generate deterministic-looking but slightly randomized scores based on domain string length
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const trustScore = 55 + (hash % 20); // 55 to 75
  const seoScore = 60 + ((hash * 2) % 20); // 60 to 80
  const uxScore = 50 + ((hash * 3) % 25); // 50 to 75
  const perfScore = 45 + ((hash * 4) % 30); // 45 to 75
  const aiScore = 30 + ((hash * 5) % 35); // 30 to 65
  const trackingScore = 40 + ((hash * 6) % 35); // 40 to 75

  const overallScore = Math.round((trustScore + seoScore + uxScore + perfScore + aiScore + trackingScore) / 6);

  // Format competitor names
  const competitorsInput = competitorUrls.length > 0 
    ? competitorUrls.map(u => u.trim()).filter(Boolean)
    : [`competitor1.com`, `competitor2.com`];

  const competitorsData = competitorsInput.map((compUrl, idx) => {
    const compName = getBusinessNameFromUrl(compUrl);
    const compHash = compUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Competitors usually have slightly different scores
    return {
      name: compName,
      url: getCleanDomain(compUrl),
      overallScore: Math.min(95, 62 + (compHash % 25)),
      trustScore: Math.min(95, 58 + ((compHash * 2) % 28)),
      seoScore: Math.min(95, 65 + ((compHash * 3) % 22)),
      uxScore: Math.min(95, 55 + ((compHash * 4) % 30)),
      performanceScore: Math.min(95, 50 + ((compHash * 5) % 35)),
      trackingMaturity: Math.min(100, 50 + ((compHash * 6) % 40))
    };
  });

  // Ensure we always have at least two competitors for comparison charts
  if (competitorsData.length < 2) {
    const defaultComps = [`${domain.split('.')[0]}memorial.com`, 'legacyfuneralhome.com'];
    defaultComps.forEach((compUrl, idx) => {
      if (competitorsData.length < 2 && !competitorsData.some(c => c.url.includes(compUrl))) {
        const compName = getBusinessNameFromUrl(compUrl);
        competitorsData.push({
          name: compName,
          url: compUrl,
          overallScore: 68 + (idx * 8),
          trustScore: 70 + (idx * 5),
          seoScore: 72 + (idx * 6),
          uxScore: 62 + (idx * 11),
          performanceScore: 58 + (idx * 14),
          trackingMaturity: 65 + (idx * 10)
        });
      }
    });
  }

  // Tracking List
  const trackingList: TrackingItem[] = [
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      category: 'analytics',
      status: hash % 3 === 0 ? 'active' : 'missing',
      description: 'Standard modern analytics setup for tracking basic visitor volumes and bounce rates.'
    },
    {
      id: 'gtm',
      name: 'Google Tag Manager',
      category: 'analytics',
      status: hash % 2 === 0 ? 'active' : 'missing',
      description: 'Centralized container code for managing marketing and event triggers without site editing.'
    },
    {
      id: 'clarity',
      name: 'Microsoft Clarity / Hotjar',
      category: 'analytics',
      status: 'missing', // Usually missing for basic sites
      description: 'Session recordings and heatmap tracking. Crucial for understanding how grieving families navigate obituaries.'
    },
    {
      id: 'pixel',
      name: 'Meta Pixel',
      category: 'marketing',
      status: (hash + 1) % 3 === 0 ? 'active' : 'missing',
      description: 'Retargeting pixel for Facebook/Instagram pre-need arrangement educational campaigns.'
    },
    {
      id: 'consent',
      name: 'GDPR Cookie Consent Banner',
      category: 'compliance',
      status: hash % 2 === 0 ? 'warning' : 'missing',
      description: 'Legally compliant banner gating scripts. Many sites have cookie banners that fire tags BEFORE consent is given.'
    },
    {
      id: 'sst',
      name: 'Server-Side Tagging',
      category: 'analytics',
      status: 'missing',
      description: 'First-party tracking server to bypass ad-blockers and Safari ITP limitations for clean metrics.'
    },
    {
      id: 'events',
      name: 'Call & Contact Form Event Trackers',
      category: 'marketing',
      status: 'warning',
      description: 'Custom trigger settings that log calls or pre-need submissions. Often missing, leading to unmeasured ROI.'
    }
  ];

  // Dynamic Issues based on url length
  const seoIssues: SEOIssue[] = [
    {
      id: 'seo-1',
      title: 'Missing Funeral Schema Markup (Structured Data)',
      impact: 'high',
      category: 'Local',
      status: 'pending',
      description: 'Google uses local business schema to read operating hours, address, phone numbers, and price ranges. Your site lacks specific LocalBusiness or FuneralService schema tags.',
      recommendation: 'Inject JSON-LD structured data mapping your physical address, coordinates, and classification as a "FuneralService" into the head tag.'
    },
    {
      id: 'seo-2',
      title: 'Targeting Generic Rather than Localized Pre-Need Keywords',
      impact: 'medium',
      category: 'Content',
      status: 'pending',
      description: `Your pages target generic words like "cremation" or "funeral service" but lack geo-localized tags like "cremation in ${businessName.includes(' ') ? businessName.split(' ')[0] : 'your city'}" or "funeral home near me".`,
      recommendation: 'Rewrite title tags and intro paragraphs to combine service pillars with key municipal sub-markets within a 15-mile service radius.'
    },
    {
      id: 'seo-3',
      title: 'Slow Core Web Vitals (Largest Contentful Paint on Obituaries)',
      impact: 'high',
      category: 'Technical',
      status: 'pending',
      description: 'Obituary listings load massive, uncompressed portrait images. LCP stands at 4.2 seconds on mobile, triggering a negative ranking factor on Google.',
      recommendation: 'Implement Next/Image or web-optimized formatting (WebP/AVIF), lazy-loading, and responsive srcsets for all obituary cover photos.'
    },
    {
      id: 'seo-4',
      title: 'Duplicate Title Tags across Service Pages',
      impact: 'low',
      category: 'On-Page',
      status: 'pending',
      description: 'Multiple subpages (e.g., /services, /cremation, /pre-planning) share the same page title header, confusing search crawlers about which page to rank for specific terms.',
      recommendation: 'Manually write unique, optimized meta titles (under 60 chars) for each distinct service page.'
    }
  ];

  const uxIssues: UXIssue[] = [
    {
      id: 'ux-1',
      title: 'Implicit Price List (GPL) Obfuscation',
      impact: 'high',
      category: 'Trust',
      status: 'pending',
      description: 'The FTC (Federal Trade Commission) Funeral Rule requires transparent price disclosures. Your General Price List (GPL) is buried inside a 4-level deep PDF link, generating friction and anxiety for families.',
      recommendation: 'Provide a direct, HTML-rendered "Pricing" or "GPL" link in the primary navigation, including a clear PDF download option.'
    },
    {
      id: 'ux-2',
      title: 'Unoptimized Obituary Search and Navigation on Mobile',
      impact: 'high',
      category: 'Accessibility',
      status: 'pending',
      description: 'Grieving elders struggle with the layout. The search bar is too small (under 44px tap target), obituaries lack text-sizing adjusters, and the filter options trigger full page reloads.',
      recommendation: 'Re-architect the obituary hub into a client-side filter layout with large search boxes, minimum 16px typography, and simple pagination.'
    },
    {
      id: 'ux-3',
      title: 'Cold, Sterile Stock Imagery and Distant Copywriting',
      impact: 'medium',
      category: 'Empathy',
      status: 'pending',
      description: 'The homepage uses corporate-style photos of shaking hands and standard rose bouquets. This feels commercial and transactional, eroding emotional connection.',
      recommendation: 'Replace generic stock photos with professional, warm editorial shots of your physical facilities, gardens, and friendly team photos. Soften the copy from "Service Providers" to "Guiding Your Family".'
    },
    {
      id: 'ux-4',
      title: 'No Direct "Pre-Plan Online" Interactive Pathway',
      impact: 'medium',
      category: 'Navigation',
      status: 'pending',
      description: 'To pre-plan, visitors must download a long 12-page PDF form or call. There is no progressive, comforting digital flow that allows families to start the planning process at their own pace in their living room.',
      recommendation: 'Implement a beautiful 4-step interactive digital pre-planning questionnaire with progress indicators and micro-explanations of options.'
    }
  ];

  // AI Redesign concepts tailored to this domain
  const redesignConcepts: RedesignConcept[] = [
    {
      id: 'concept-a',
      name: 'Concept A: Pure Solace',
      tagline: 'Quiet Luxury & Warm Minimalism',
      theme: 'Warm Stone, Soft Sage, and Editorial Serif',
      primaryColor: '#F5F2EB', // Warm Stone
      secondaryColor: '#364B44', // Forest/Sage
      fontFamily: 'Playfair Display & Inter',
      focusArea: 'Emotional Trust & Serenity',
      description: 'Designed to feel like a high-end Scandinavian spa or a quiet museum. Removes all marketing clutter, utilizing ample white space, warm editorial typography, and high-quality photographs of the facility to create an immediate feeling of dignity and Solace.',
      benefits: [
        'Increases user time-on-site by 42% due to readable obituaries and comforting layout',
        'Reduces layout anxiety for elderly users through high-contrast warm stone tones',
        'Features a floating "Immediate Need" drawer that is clear but non-intrusive'
      ],
      mockupState: {
        heroTitle: 'Celebrating Lives with Quiet Dignity',
        heroSubtitle: `Providing a peaceful haven for reflection and remembrance. Serving the ${businessName} community with personalized, compassionate guidance.`,
        buttonText: 'Explore Pre-Planning Options',
        layoutType: 'minimalist'
      }
    },
    {
      id: 'concept-b',
      name: 'Concept B: Heritage & Honor',
      tagline: 'Classic Editorial Typography & Rich Tones',
      theme: 'Deep Muted Navy, Dark Walnut, and Off-White',
      primaryColor: '#FAF9F6', // Off-White
      secondaryColor: '#1F2A38', // Muted Navy
      fontFamily: 'Lora & Instrument Sans',
      focusArea: 'Legacy, History, and Community Standing',
      description: 'Perfect for established multi-generational family chapels. Emphasizes your funeral home\'s historical ties, local heritage, and institutional reliability. High-end editorial grids resemble a premium magazine, showcasing deep respect for legacy.',
      benefits: [
        'Builds immediate authority for multi-decade operations',
        'Highlights staff backgrounds and community involvements cleanly',
        'Premium grid layout makes the general pricing list (GPL) feel transparent and structured'
      ],
      mockupState: {
        heroTitle: 'Honoring Your Legacy Since 1984',
        heroSubtitle: `Generations of families have trusted ${businessName} to navigate life's most meaningful transitions. We stand by you with unwavering care.`,
        buttonText: 'View General Price List',
        layoutType: 'editorial'
      }
    },
    {
      id: 'concept-c',
      name: 'Concept C: Modern Compassion',
      tagline: 'Contemporary Clean Lines & Interactive Care',
      theme: 'Warm Charcoal, Soft Gold, and Bright Linens',
      primaryColor: '#FFFFFF',
      secondaryColor: '#1A1A1A', // Charcoal
      fontFamily: 'Plus Jakarta Sans & Space Grotesk',
      focusArea: 'Digital Arrangements & Pricing Transparency',
      description: 'Designed for the next generation of planners. Focuses on digital-first arrangements, seamless virtual obituaries with video integration, and intuitive, comforting wizard steps that make planning as transparent and easy as modern online banking, without losing solemnity.',
      benefits: [
        'Increases online pre-planning submissions by up to 120%',
        'Highly responsive mobile obituaries optimized for social sharing and flower delivery',
        'Fully integrated digital pricing builder that complies with all FTC transparency requirements'
      ],
      mockupState: {
        heroTitle: 'Compassionate Care, Simplified Planning.',
        heroSubtitle: `Start arranging online in your own time, at your own pace. Transparency and support from ${businessName}, whenever you need us.`,
        buttonText: 'Plan Online in 5 Minutes',
        layoutType: 'classic'
      }
    }
  ];

  // Recharts timeline historical simulation (visits, conversions, trust index)
  const timelineData = [
    { month: 'Jan', visits: 1200 + (hash % 400), conversions: 24 + (hash % 15), trustRating: 68 },
    { month: 'Feb', visits: 1350 + (hash % 300), conversions: 28 + (hash % 10), trustRating: 69 },
    { month: 'Mar', visits: 1500 + (hash % 500), conversions: 31 + (hash % 20), trustRating: 70 },
    { month: 'Apr', visits: 1400 + (hash % 400), conversions: 27 + (hash % 12), trustRating: 71 },
    { month: 'May', visits: 1650 + (hash % 600), conversions: 38 + (hash % 25), trustRating: 71 },
    { month: 'Jun', visits: 1800 + (hash % 500), conversions: 45 + (hash % 18), trustRating: 72 }
  ];

  // Recharts Radar graph comparing current website scores to competitors average
  const radarData = [
    { subject: 'Trust Signals', current: trustScore, competitorAvg: 65, fullMark: 100 },
    { subject: 'SEO & Keywords', current: seoScore, competitorAvg: 70, fullMark: 100 },
    { subject: 'UX Design', current: uxScore, competitorAvg: 62, fullMark: 100 },
    { subject: 'Performance', current: perfScore, competitorAvg: 75, fullMark: 100 },
    { subject: 'AI Readiness', current: aiScore, competitorAvg: 40, fullMark: 100 },
    { subject: 'Tag Tracking', current: trackingScore, competitorAvg: 58, fullMark: 100 }
  ];

  return {
    url,
    domain,
    businessName,
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    overallScore,
    metrics: {
      trust: { name: 'Trust Index', score: trustScore, maxScore: 100, status: trustScore > 70 ? 'optimal' : trustScore > 55 ? 'warning' : 'critical', details: 'Obituary ease of use, pricing visibility, staff authenticity.' },
      seo: { name: 'Local SEO', score: seoScore, maxScore: 100, status: seoScore > 75 ? 'optimal' : seoScore > 60 ? 'warning' : 'critical', details: 'Google Business Profile, localized keyword densities, schema structured data.' },
      ux: { name: 'User Experience', score: uxScore, maxScore: 100, status: uxScore > 70 ? 'optimal' : uxScore > 50 ? 'warning' : 'critical', details: 'Mobile-readability, navigation ease, touch targets, accessibility compliance.' },
      performance: { name: 'Speed & Tech', score: perfScore, maxScore: 100, status: perfScore > 80 ? 'optimal' : perfScore > 50 ? 'warning' : 'critical', details: 'Core Web Vitals, page size, compression, redirect efficiency.' },
      ai: { name: 'AI Readiness', score: aiScore, maxScore: 100, status: aiScore > 60 ? 'optimal' : aiScore > 40 ? 'warning' : 'critical', details: 'AI LLM crawler readability, structured semantics, zero-click answer positioning.' },
      tracking: { name: 'Tracking Maturity', score: trackingScore, maxScore: 100, status: trackingScore > 75 ? 'optimal' : trackingScore > 50 ? 'warning' : 'critical', details: 'GA4 tag configuration, cookie consent blocker compliance, server side setup.' }
    },
    trackingList,
    seoIssues,
    uxIssues,
    competitors: competitorsData,
    redesignConcepts,
    timelineData,
    radarData
  };
}

export const defaultReport = generateAuditReport('www.greenwoodchapel.com', ['www.havenrestmemorial.com', 'www.legacyfuneralgroup.com']);
