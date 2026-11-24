import {
  CVData,
  JobPosting,
  JobMatchCompatibility,
  AIInterviewEvaluation,
  ScamRiskReport,
} from '../types';
import { SAMPLE_INTERVIEW_QUESTIONS, LICENSED_AGENCIES_SAMPLE } from '../data/expandedData';

export function calculateJobCompatibility(cv: CVData, job: JobPosting): JobMatchCompatibility {
  const userSkills = (cv.skills || []).map((s) => s.toLowerCase());
  const userText = `${cv.professionalSummary} ${cv.professionalTitle} ${cv.skills.join(' ')} ${cv.experiences.map((e) => e.jobTitle + ' ' + e.achievements.join(' ')).join(' ')} ${cv.qualifications.map((q) => q.qualification + ' ' + q.fieldOfStudy).join(' ')}`.toLowerCase();

  // Match skills
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  (job.skillsRequired || []).forEach((reqSkill) => {
    const isDirectMatch = userSkills.some(
      (us) => us.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(us)
    );
    const isInText = userText.includes(reqSkill.toLowerCase());

    if (isDirectMatch || isInText) {
      matchedSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  // Calculate base score
  const totalSkillsCount = (job.skillsRequired || []).length;
  const skillRatio = totalSkillsCount > 0 ? matchedSkills.length / totalSkillsCount : 0.7;

  // Title relevance bonus
  const titleWords = job.title.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const titleMatches = titleWords.filter((w) => userText.includes(w)).length;
  const titleBonus = titleWords.length > 0 ? (titleMatches / titleWords.length) * 20 : 10;

  // Experience calculation
  const totalYears = cv.experiences.length * 2.5;
  const expBonus = totalYears >= 4 ? 20 : totalYears >= 2 ? 14 : 8;

  let rawScore = Math.round(skillRatio * 60 + titleBonus + expBonus);
  if (rawScore > 98) rawScore = 98;
  if (rawScore < 20) rawScore = 25;

  let matchTier: JobMatchCompatibility['matchTier'] = 'Unmatched';
  if (rawScore >= 90) matchTier = 'Perfect Match (90-100%)';
  else if (rawScore >= 75) matchTier = 'Strong Match (75-89%)';
  else if (rawScore >= 55) matchTier = 'Potential Match (55-74%)';
  else if (rawScore >= 35) matchTier = 'Skill-Gap Identified (35-54%)';
  else matchTier = 'Unmatched';

  const qualifyingReasons: string[] = [];
  const disqualifyingFactors: string[] = [];

  if (matchedSkills.length > 0) {
    qualifyingReasons.push(`Matches critical core competencies: ${matchedSkills.slice(0, 3).join(', ')}.`);
  }
  if (cv.qualifications.length > 0) {
    qualifyingReasons.push(`Holds authenticated academic qualification (${cv.qualifications[0].qualification}).`);
  }
  if (cv.certifications.length > 0) {
    qualifyingReasons.push(`Holds active statutory certifications (${cv.certifications.map((c) => c.issuingBody).join(', ')}).`);
  }

  if (missingSkills.length > 0) {
    disqualifyingFactors.push(`Lacks explicit verifiable evidence for: ${missingSkills.slice(0, 3).join(', ')}.`);
  }
  if (totalYears < 3 && job.experienceRequired?.includes('5+')) {
    disqualifyingFactors.push('Years of post-graduation experience is below employer preferred benchmark.');
  }

  const recommendedBridgingCourses = [
    'GCC Healthcare & Cultural Work Readiness Certificate',
    'ATS Resume Engineering & Global High-Impact Portfolios',
    'The STAR Method & AI-Powered Behavioural Interview Mastery',
  ];

  const swahiliExplanation = rawScore >= 75
    ? `Unafaa sana kwa nafasi hii ya ${job.title} (${rawScore}%). Sifa zako za kimasomo na uzoefu wako unawiana na mahitaji ya mwajiri.`
    : `Una uwezo kwa asilimia ${rawScore}%. Inapendekezwa uimarishe ujuzi katika ${missingSkills.slice(0, 2).join(' na ')} ili kufikia kiwango cha juu.`;

  return {
    scorePercent: rawScore,
    matchTier,
    qualifyingReasons,
    disqualifyingFactors,
    matchedSkills,
    missingSkills,
    recommendedBridgingCourses,
    realisticSalaryExpectation: job.salaryRange || 'Competitive Industry Benchmark',
    progressionOpportunities: [
      `Senior / Lead ${job.title} within 24 months`,
      'International Departmental Supervisor & Trainer',
      'Clinical / Engineering Practice Lead',
    ],
    swahiliExplanation,
  };
}

export function evaluateInterviewAnswer(
  questionId: string,
  answerText: string,
  lang: 'en' | 'sw'
): AIInterviewEvaluation {
  const q = SAMPLE_INTERVIEW_QUESTIONS.find((item) => item.id === questionId) || SAMPLE_INTERVIEW_QUESTIONS[0];
  const lower = answerText.toLowerCase().trim();

  if (lower.length < 30) {
    return {
      overallScore: 35,
      starComponents: {
        situationScore: 30,
        taskScore: 30,
        actionScore: 40,
        resultScore: 30,
      },
      communicationClarityScore: 45,
      actionableFeedback: [
        lang === 'sw'
          ? 'Jibu lako ni fupi sana. Eleza kisa kamili ukitumia mbinu ya STAR (Hali, Wajibu, Hatua, Matokeo).'
          : 'Your response is too brief. Provide a comprehensive real-life case study using the STAR framework.',
        lang === 'sw'
          ? 'Taja matokeo yaliyopimika (mfano: kuboresha usalama kwa 30%).'
          : 'Include quantifiable results (e.g., stabilized vital signs within 4 minutes, zero incidents).',
      ],
      swahiliSummary: 'Jibu ni fupi mno; tafadhali eleza hatua halisi ulizochukua na matokeo yaliyopatikana.',
    };
  }

  // Keywords matched
  const matchedKeywords = q.targetKeywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const keywordRatio = matchedKeywords.length / q.targetKeywords.length;

  // STAR indicators
  const hasSituation = /when|while|in my previous|at my former|during|in a case|wakati|nilipokuwa/i.test(lower);
  const hasTask = /needed to|responsible for|task was|objective was|duty was|ilikuwa lazima|wajibu/i.test(lower);
  const hasAction = /\b(i\s+)?(initiated|administered|led|developed|coordinated|managed|stabilized|conducted|executed|triaged|prioritized|nilichukua hatua|nilisimamia|nilitekeleza)\b/i.test(lower);
  const hasResult = /resulted in|improved|reduced|stabilized|outcome|successful|recovered|zero incident|matokeo|mafanikio|kufanikiwa/i.test(lower);

  const sitScore = hasSituation ? 85 : 55;
  const taskScore = hasTask ? 80 : 50;
  const actScore = hasAction ? 92 : 60;
  const resScore = hasResult ? 90 : 55;

  const overall = Math.round(
    (sitScore + taskScore + actScore + resScore) / 4 * 0.7 + keywordRatio * 30
  );

  const actionableFeedback: string[] = [];
  if (!hasResult) {
    actionableFeedback.push(
      lang === 'sw'
        ? 'Boresha sehemu ya MATOKEO: Onyesha athari chanya ya hatua yako kwa mgonjwa au mradi.'
        : 'Strengthen the RESULT segment: Quantify how your intervention stabilized the patient or saved project costs.'
    );
  }
  if (!hasAction) {
    actionableFeedback.push(
      lang === 'sw'
        ? 'Boresha sehemu ya HATUA: Tumia vitenzi vya uongozi (nilitekeleza, niliongoza) badala ya kusema "tulifanya".'
        : 'Deepen the ACTION segment: Focus on what YOU specifically did with active verbs rather than passive team summaries.'
    );
  }
  if (matchedKeywords.length < 2) {
    actionableFeedback.push(
      lang === 'sw'
        ? `Ongeza msamiati wa kitaalamu kama vile: ${q.targetKeywords.slice(0, 3).join(', ')}.`
        : `Incorporate industry-standard terminology such as: ${q.targetKeywords.slice(0, 3).join(', ')}.`
    );
  }
  if (actionableFeedback.length === 0) {
    actionableFeedback.push(
      lang === 'sw'
        ? 'Kazi nzuri! Msimamo wako unaonyesha uwezo wa juu wa utulivu na weledi chini ya shinikizo.'
        : 'Outstanding response. Structured, professionally articulate, and showcases clinical/technical leadership under pressure.'
    );
  }

  return {
    overallScore: Math.min(overall, 98),
    starComponents: {
      situationScore: sitScore,
      taskScore,
      actionScore: actScore,
      resultScore: resScore,
    },
    communicationClarityScore: Math.min(88 + matchedKeywords.length * 3, 98),
    actionableFeedback,
    swahiliSummary: `Alama ya ujumla: ${overall}%. Jibu linaonyesha uelewa mzuri wa itifaki za kimataifa.`,
  };
}

export function generateTailoredCoverLetter(
  cv: CVData,
  job: JobPosting,
  lang: 'en' | 'sw' = 'en'
): string {
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (lang === 'sw') {
    return `${cv.fullName}
Simu: ${cv.phone} | Barua Pepe: ${cv.email}
Kitambulisho / Pasipoti: ${cv.nationalIdOrPassport}
Tarehe: ${dateStr}

Kwa:
Mkurugenzi wa Uajiri,
${job.employer}
${job.city}, ${job.country}

KUHUSU: MAOMBI YA KAZI YA ${job.title.toUpperCase()} (KUMB: K1-${job.id.toUpperCase()})

Mheshimiwa / Mpendwa Mkurugenzi wa Uajiri,

Ninawaandikia kwa heshima kueleza nia yangu thabiti ya kujiunga na shirika lenu kama ${job.title}. Kama mtaalamu mwenye tajriba katika ${cv.professionalTitle}, nimekuwa nikifuatilia kazi bora inayotekelezwa na ${job.employer} na nina uhakika kwamba uzoefu wangu na leseni zangu za kisheria zitatoa mchango mkubwa.

Nikiwa nimehitimu ${cv.qualifications[0]?.qualification || 'Shahada ya Chuo Kikuu'} kutoka ${cv.qualifications[0]?.institution || 'Chuo Kikuu kinachotambulika'}, nimepata uzoefu thabiti katika ${cv.skills.slice(0, 4).join(', ')}. Katika majukumu yangu ya awali, nimefanikiwa kuongoza timu, kuzingatia viwango vya kimataifa vya usalama, na kutoa huduma za hali ya juu.

Natarajia kupata fursa ya kujiunga na shirika lenu na kuleta ari ya kujituma, uadilifu, na ueledi wa hali ya juu. Ninapatikana kwa mahojiano wakati wowote.

Wako mwaminifu,

${cv.fullName}
${cv.professionalTitle}`;
  }

  return `${cv.fullName}
Phone: ${cv.phone} | Email: ${cv.email}
National ID / Passport: ${cv.nationalIdOrPassport}
Date: ${dateStr}

To:
The Hiring Directorate / Recruitment Selection Committee
${job.employer}
${job.city}, ${job.country}

RE: FORMAL APPLICATION FOR THE POSITION OF ${job.title.toUpperCase()} (REF: K1-${job.id.toUpperCase()})

Dear Hiring Manager,

I am writing to formally submit my candidacy for the position of ${job.title} at ${job.employer}, as advertised through the official KenyaOne Careers platform. With demonstrated expertise as a ${cv.professionalTitle} and active regulatory credentials verified through the Kenyan National Employment Authority and respective statutory councils, I am confident in my capacity to deliver immediate clinical, technical, and operational excellence to your department.

During my career, including my tenure at ${cv.experiences[0]?.company || 'leading institutions'}, I have consistently executed duties adhering strictly to international best practices. My academic background, holding a ${cv.qualifications[0]?.qualification || 'Bachelor degree'} from ${cv.qualifications[0]?.institution || 'an accredited institution'}, combined with specialized competencies in ${cv.skills.slice(0, 4).join(', ')}, directly addresses the core operational prerequisites outlined for this vacancy.

Furthermore, I have maintained all necessary bilateral compliance prerequisites, including a clean police clearance record from the Directorate of Criminal Investigations (DCI) and full verification on the KenyaOne Talent Passport ecosystem. I am fully prepared for international deployment or immediate local assignment.

Thank you for your time, consideration, and dedication to meritocratic recruitment. I welcome the opportunity to discuss how my competencies align with your strategic objectives during an interview.

Yours faithfully,

${cv.fullName}
${cv.professionalTitle}`;
}

export function analyzeScamRisk(
  text: string,
  agencyName?: string,
  emailDomain?: string
): ScamRiskReport {
  const lower = `${text} ${agencyName || ''} ${emailDomain || ''}`.toLowerCase();
  const redFlags: string[] = [];
  let score = 5;

  if (/m-pesa|mpesa|send money|pay fee|upfront fee|registration fee|send 50|send 20|send 10|safari-com/i.test(lower)) {
    score += 45;
    redFlags.push('Demands upfront payment or M-PESA transfer. Under Kenyan and international law, charging recruitment fees to jobseekers is illegal.');
  }

  if (/guaranteed visa|visa in 24 hours|visa in 48 hours|no interview needed|guaranteed employment without interview/i.test(lower)) {
    score += 25;
    redFlags.push('Claims "guaranteed visa" without official embassy vetting or medical clearance.');
  }

  if (/@gmail\.com|@yahoo\.com|@outlook\.com|@hotmail\.com/i.test(emailDomain || lower)) {
    score += 15;
    redFlags.push('Uses a generic free email provider (Gmail/Yahoo) instead of an accredited corporate or institutional domain.');
  }

  let isAgencyLicensed = false;
  let agencyDetails: string | undefined = undefined;

  if (agencyName) {
    const found = LICENSED_AGENCIES_SAMPLE.find(
      (a) => a.name.toLowerCase().includes(agencyName.toLowerCase()) || agencyName.toLowerCase().includes(a.name.toLowerCase())
    );
    if (found) {
      isAgencyLicensed = true;
      score = Math.max(5, score - 30);
      agencyDetails = `Verified Licensed Agency: ${found.name} (License: ${found.licenseNumber}, Approved Corridors: ${found.permittedCorridors.join(', ')}).`;
    } else {
      score += 15;
      redFlags.push(`Agency "${agencyName}" does not appear in the active National Employment Authority (NEA) Gazette register.`);
    }
  }

  score = Math.min(100, Math.max(0, score));

  let riskLevel: ScamRiskReport['riskLevel'] = 'Low';
  if (score >= 60) riskLevel = 'Critical Scam Warning';
  else if (score >= 35) riskLevel = 'Suspicious / Elevated Risk';

  const recommendation =
    riskLevel === 'Critical Scam Warning'
      ? 'DO NOT PROCEED OR SEND ANY FUNDS. This exhibits recognized fraudulent patterns. Report immediately to NEA Fraud Desk.'
      : riskLevel === 'Suspicious / Elevated Risk'
      ? 'PROCEED WITH EXTREME CAUTION. Request formal written verification and confirm agency licence on the NEA portal.'
      : 'AUTHENTIC RECRUITMENT PATHWAY. Adheres to statutory fair recruitment standards.';

  return {
    riskScorePercent: score,
    riskLevel,
    redFlagsDetected: redFlags,
    isAgencyLicensed,
    agencyDetails,
    recommendation,
  };
}
