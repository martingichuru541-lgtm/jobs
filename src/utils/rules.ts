import { CVData, JobPosting, DeparturePack, JourneyStage } from '../types';

export interface AtsEvaluation {
  score: number; // 0 to 100
  rating: 'Exceptional' | 'ATS Ready' | 'Needs Improvement' | 'Critical Issues';
  passedChecks: string[];
  recommendations: string[];
}

export function calculateAtsScore(cv: CVData): AtsEvaluation {
  let score = 0;
  const passedChecks: string[] = [];
  const recommendations: string[] = [];

  // 1. Personal & Contact Completeness (max 25 pts)
  if (cv.fullName && cv.fullName.trim().length > 3) {
    score += 5;
    passedChecks.push('Candidate full name present and clear');
  } else {
    recommendations.push('Add your official full name as per National ID or Passport');
  }

  if (cv.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cv.email)) {
    score += 5;
    passedChecks.push('Valid ATS-parseable email address');
  } else {
    recommendations.push('Include a valid, professional email address');
  }

  if (cv.phone && cv.phone.trim().length >= 9) {
    score += 5;
    passedChecks.push('Standard international/local phone number included');
  } else {
    recommendations.push('Provide a direct telephone number with country code (+254)');
  }

  if (cv.location && cv.location.trim().length > 2) {
    score += 5;
    passedChecks.push('City/County location specified');
  } else {
    recommendations.push('Specify your current city and county (e.g. Nairobi, Kenya)');
  }

  if (cv.nationalIdOrPassport && cv.nationalIdOrPassport.trim().length >= 5) {
    score += 5;
    passedChecks.push('Official verification ID / Passport reference recorded');
  } else {
    recommendations.push('Add your National ID or Passport reference for identity matching');
  }

  // 2. Professional Summary (max 15 pts)
  const summaryWords = cv.professionalSummary ? cv.professionalSummary.trim().split(/\s+/).filter(Boolean).length : 0;
  if (summaryWords >= 25) {
    score += 15;
    passedChecks.push(`Professional executive summary is detailed (${summaryWords} words)`);
  } else if (summaryWords >= 10) {
    score += 8;
    recommendations.push('Expand professional summary to 3-4 impactful sentences (at least 25 words)');
  } else {
    recommendations.push('Add a concise career summary highlighting core expertise and value proposition');
  }

  // 3. Work Experience & Action Verbs (max 30 pts)
  if (cv.experiences && cv.experiences.length > 0) {
    score += 10;
    passedChecks.push(`${cv.experiences.length} work experience entries documented`);

    let hasBulletAchievements = false;
    let hasActionVerbs = false;
    const actionVerbsList = ['managed', 'led', 'delivered', 'reduced', 'implemented', 'coordinated', 'spearheaded', 'trained', 'designed', 'maintained', 'supervised', 'conducted', 'optimized', 'achieved', 'supported', 'monitored', 'secured'];

    cv.experiences.forEach((exp) => {
      if (exp.achievements && exp.achievements.length > 0) {
        hasBulletAchievements = true;
        const text = exp.achievements.join(' ').toLowerCase();
        if (actionVerbsList.some((v) => text.includes(v))) {
          hasActionVerbs = true;
        }
      }
    });

    if (hasBulletAchievements) {
      score += 10;
      passedChecks.push('Uses bulleted impact & achievement statements');
    } else {
      recommendations.push('Break down work history into bulleted responsibilities and key achievements');
    }

    if (hasActionVerbs) {
      score += 10;
      passedChecks.push('Contains strong ATS action verbs (e.g., managed, coordinated, implemented)');
    } else {
      recommendations.push('Use active leadership & operational verbs (e.g. delivered, organized, maintained, resolved)');
    }
  } else {
    recommendations.push('Add at least one professional or vocational employment entry');
  }

  // 4. Academic Qualifications & Certifications (max 20 pts)
  if (cv.qualifications && cv.qualifications.length > 0) {
    score += 12;
    passedChecks.push('Academic qualifications and institutions clearly structured');
  } else {
    recommendations.push('List your highest educational level, college, university or TVET institution');
  }

  if (cv.certifications && cv.certifications.length > 0) {
    score += 8;
    passedChecks.push(`${cv.certifications.length} verified professional certifications/licenses listed`);
  } else {
    recommendations.push('Add professional certificates or regulatory licenses (e.g., KMPDC, EBK, KNEC, OSHA)');
  }

  // 5. Skills & Keywords (max 10 pts)
  if (cv.skills && cv.skills.length >= 4) {
    score += 10;
    passedChecks.push(`${cv.skills.length} core technical & soft competencies tagged`);
  } else if (cv.skills && cv.skills.length > 0) {
    score += 5;
    recommendations.push('Add at least 4 targeted skills relevant to your target industry');
  } else {
    recommendations.push('List core skills to increase ATS searchability');
  }

  let rating: AtsEvaluation['rating'] = 'Needs Improvement';
  if (score >= 85) rating = 'Exceptional';
  else if (score >= 70) rating = 'ATS Ready';
  else if (score >= 45) rating = 'Needs Improvement';
  else rating = 'Critical Issues';

  return {
    score: Math.min(100, score),
    rating,
    passedChecks,
    recommendations,
  };
}

export function filterJobs(
  jobs: JobPosting[],
  query: string,
  category: string,
  region: string,
  sector: 'all' | 'government' | 'private' | 'international' | 'agency_verified'
): JobPosting[] {
  return jobs.filter((job) => {
    // Keyword match
    if (query) {
      const q = query.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.employer.toLowerCase().includes(q) ||
        job.city.toLowerCase().includes(q) ||
        job.country.toLowerCase().includes(q) ||
        job.requirements.some((r) => r.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Category filter
    if (category && category !== 'All Sectors' && job.category !== category) {
      return false;
    }

    // Region filter
    if (region && region !== 'All Destinations' && job.region !== region) {
      return false;
    }

    // Sector / type filter
    if (sector === 'government' && !job.isGovernment) return false;
    if (sector === 'private' && !job.isPrivateSector) return false;
    if (sector === 'international' && !job.isInternational) return false;
    if (sector === 'agency_verified' && !job.isAgencyVerified) return false;

    return true;
  });
}

export function validateDeparturePack(pack: DeparturePack): {
  isValidForRelease: boolean;
  missingItems: string[];
  completionPercentage: number;
} {
  const missingItems: string[] = [];
  pack.items.forEach((item) => {
    if (!item.verified) {
      missingItems.push(item.name);
    }
  });

  const total = pack.items.length || 1;
  const verifiedCount = pack.items.filter((i) => i.verified).length;
  const completionPercentage = Math.round((verifiedCount / total) * 100);

  return {
    isValidForRelease: missingItems.length === 0,
    missingItems,
    completionPercentage,
  };
}

export function getJourneyProgress(stages: JourneyStage[]): {
  completedCount: number;
  totalStages: number;
  percentage: number;
  currentActiveStage: JourneyStage | null;
} {
  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const totalStages = stages.length;
  const percentage = Math.round((completedCount / (totalStages || 1)) * 100);

  const currentActiveStage =
    stages.find((s) => s.status === 'in_progress' || s.status === 'action_required') ||
    stages.find((s) => s.status === 'pending') ||
    stages[stages.length - 1] ||
    null;

  return {
    completedCount,
    totalStages,
    percentage,
    currentActiveStage,
  };
}
