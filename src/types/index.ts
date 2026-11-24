export type UserRole = 'jobseeker' | 'employer' | 'staff' | 'admin';

export interface JobseekerProfile {
  id: string;
  fullName: string;
  nationalIdOrPassport: string;
  idType: 'National ID' | 'Passport';
  email: string;
  phone: string;
  county: string;
  dateOfBirth: string;
  gender: string;
  idVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  policeClearanceVerified: boolean;
  medicalVerified: boolean;
  profilePhotoUrl: string;
  title: string;
  experienceYears: number;
  highestEducation: string;
  skills: string[];
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string[];
}

export interface AcademicQualification {
  id: string;
  qualification: string; // e.g. Bachelor of Science in Nursing
  fieldOfStudy: string;
  institution: string;
  country: string;
  graduationYear: string;
  gradeOrDistinction: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingBody: string; // e.g. Nursing Council of Kenya, EBK, OSHA, KNEC
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface ReferenceContact {
  id: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  phone: string;
}

export interface CVData {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  nationalIdOrPassport: string;
  linkedinUrl?: string;
  professionalSummary: string;
  experiences: WorkExperience[];
  qualifications: AcademicQualification[];
  certifications: CertificationItem[];
  skills: string[];
  languages: string[];
  references: ReferenceContact[];
}

export interface JobPosting {
  id: string;
  title: string;
  employer: string;
  employerLogo?: string;
  isGovernment: boolean;
  isPrivateSector: boolean;
  isInternational: boolean;
  country: string;
  city: string;
  region: 'Kenya Local' | 'GCC / Middle East' | 'Europe / Americas' | 'Remote';
  category: 'Healthcare' | 'Engineering & Tech' | 'Hospitality & Tourism' | 'Logistics & Trades' | 'Public Service' | 'Education & Science' | 'Security & Operations';
  salaryRange: string;
  salaryCurrency: string;
  jobType: 'Full-time' | 'Contract' | 'Apprenticeship' | 'Internship' | 'Remote';
  experienceRequired: string;
  educationRequired: string;
  deadline: string;
  postedDate: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  neaLicenseNumber?: string;
  agencyName?: string;
  isAgencyVerified: boolean;
}

export type JourneyStageStatus = 'completed' | 'in_progress' | 'pending' | 'action_required';

export interface JourneyStage {
  stepNumber: number;
  title: string;
  description: string;
  status: JourneyStageStatus;
  dateCompleted?: string;
  responsibleOrg: string;
  requiredDocuments: string[];
  outstandingActions: string[];
  nextSteps: string;
  verifiedBy?: string;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  employer: string;
  country: string;
  submittedDate: string;
  currentStatus: 'Received' | 'Reviewing' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Issued' | 'Contract Attested' | 'Visa Approved' | 'Travel Ready';
  stages: JourneyStage[];
  hasInterview: boolean;
  interviewDetails?: InterviewAppointment;
  hasOffer: boolean;
  hasDeparturePack: boolean;
  departurePackId?: string;
}

export interface InterviewAppointment {
  id: string;
  applicationId: string;
  jobTitle: string;
  employer: string;
  candidateName: string;
  nationalId: string;
  country: string;
  date: string;
  time: string;
  timeZone: string;
  format: 'In-Person (Nairobi Centre)' | 'Online Video (Google Meet)' | 'Employer Premises';
  locationOrLink: string;
  appointmentRef: string;
  qrCodeUrl?: string;
  requiredDocuments: string[];
  instructions: string[];
  status: 'Confirmed' | 'Reschedule Requested' | 'Completed' | 'Cancelled';
}

export interface DeparturePackItem {
  id: string;
  name: string;
  category: 'Contract' | 'Visa' | 'Attestation' | 'Clearance' | 'Medical' | 'Travel' | 'Guide';
  verified: boolean;
  verifiedAt?: string;
  documentRef?: string;
}

export interface DeparturePack {
  id: string;
  referenceNumber: string; // e.g. KP-2026-DOH-8821
  applicantName: string;
  nationalId: string;
  destinationCountry: string;
  destinationCity: string;
  employer: string;
  jobTitle: string;
  flightNumber: string;
  departureDate: string;
  status: 'Preparation' | 'Quality Review' | 'Ready for Collection' | 'Verified & Released';
  items: DeparturePackItem[];
  applicantSignature?: string;
  staffCountersign?: string;
  releaseReceiptRef?: string;
  releasedAt?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  channel: 'In-App' | 'Email' | 'WhatsApp';
  timestamp: string;
  type: 'status_update' | 'interview' | 'offer' | 'medical' | 'attestation' | 'travel';
  read: boolean;
  referenceId?: string;
}

export interface MigrantProtectionComplaint {
  id: string;
  trackingNumber: string;
  applicantName: string;
  country: string;
  employerOrAgency: string;
  category: 'Contract Discrepancy' | 'Illegal Recruitment Fee' | 'Passport Retention' | 'Unsafe Working Conditions' | 'Delayed Salary' | 'Emergency Assistance';
  description: string;
  submittedAt: string;
  status: 'Received' | 'Under Investigation by NEA/MFA' | 'Escalated to Labour Attaché' | 'Resolved';
  resolutionNotes?: string;
}

/* =========================================================================
   EXPANDED ECOSYSTEM TYPES (PARTS 1 - 15)
   ========================================================================= */

// Part 1: AI Career Intelligence
export interface JobMatchCompatibility {
  jobId: string;
  jobTitle: string;
  employer: string;
  country: string;
  score: number; // 0 to 100
  category: 'Excellent Match' | 'Strong Match' | 'Potential Match' | 'Skills Development Required' | 'Not Eligible';
  whyYouQualify: string[];
  missingQualifications: string[];
  recommendedCourses: string[];
  salaryEstimate: string;
  progressionOutlook: string;
}

export interface AIMockInterviewQuestion {
  id: string;
  roleTarget: string;
  question: string;
  questionSwahili: string;
  competencyArea: 'Technical' | 'Behavioral / Leadership' | 'Clinical / Trade' | 'Cross-Cultural / International';
  sampleStrongAnswer: string;
}

export interface AIInterviewEvaluation {
  score: number; // 0 to 100
  strengths: string[];
  growthAreas: string[];
  atsImpactRating: 'Outstanding' | 'Proficient' | 'Needs Coaching';
  constructiveTip: string;
}

// Part 2: Global Job Discovery Engine
export interface CountryDossier {
  code: string; // e.g. QA, AE, SA, GB, CA, DE, US, AU, etc.
  name: string;
  flagEmoji: string;
  capital: string;
  region: 'Middle East / GCC' | 'Europe' | 'North America' | 'Asia Pacific' | 'Africa';
  currency: string;
  currencySymbol: string;
  avgSalaryExpat: string;
  topSectors: string[];
  workPermitTitle: string;
  visaGuidance: string;
  employmentRegulations: string[];
  costOfLivingIndex: string; // e.g. Moderate, High, Tax-Free
  verifiedEmployersCount: number;
  officialGovPortal: string;
  recruitmentProcessSteps: string[];
  activeOpportunities: JobPosting[];
}

// Part 3: Talent Passport
export interface TalentPassport {
  passportNumber: string; // e.g. KE-TP-9921-2026
  qrVerificationUrl: string;
  fullName: string;
  professionalHeadline: string;
  profilePhotoUrl: string;
  nationalIdMasked: string; // e.g. ID: ••••••024
  county: string;
  experienceYears: number;
  highestDegree: string;
  verifiedBadges: {
    idVerified: boolean;
    academicVerified: boolean;
    policeClearanceVerified: boolean;
    medicalFitVerified: boolean;
    neaLaborAttested: boolean;
  };
  skills: string[];
  certifications: CertificationItem[];
  languages: string[];
  portfolioLinks: { label: string; url: string }[];
  privacySettings: {
    hideContactUntilShortlisted: boolean;
    hidePassportCivilId: boolean;
    allowDirectRecruiterContact: boolean;
  };
}

// Part 7: Career Opportunities across 15 sectors
export type OpportunityType =
  | 'government'
  | 'private'
  | 'international'
  | 'remote'
  | 'freelance'
  | 'internship'
  | 'graduate'
  | 'apprenticeship'
  | 'scholarship'
  | 'fellowship'
  | 'research'
  | 'volunteering'
  | 'skilled_migration'
  | 'entrepreneurship'
  | 'executive';

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  country: string;
  city: string;
  stipendOrSalary: string;
  deadline: string;
  duration?: string;
  eligibility: string;
  description: string;
  tags: string[];
}

// Part 8: AI Career School
export interface AICourse {
  id: string;
  title: string;
  category: 'Healthcare & Nursing' | 'Aviation & Logistics' | 'Cloud & Software' | 'Language & Culture' | 'Vocational Trades' | 'Leadership & Ethics';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  modulesCount: number;
  skillsGained: string[];
  description: string;
  enrolledStudentsCount: number;
  isCertified: boolean;
  passingScore: number;
  certificateTitle: string;
}

// Part 9: Professional Services Marketplace (Freelancers & Artisans)
export interface FreelancerServiceProfile {
  id: string;
  name: string;
  county: string;
  specialty: string;
  category: 'Software & Cloud' | 'Design & Creative' | 'Writing & Translation' | 'Artisan & Electrical' | 'Accounting & Advisory' | 'Culinary & Hospitality';
  hourlyRateKes: number;
  rating: number;
  jobsCompleted: number;
  verifiedBadge: boolean;
  avatarUrl: string;
  bio: string;
  samplePortfolioTitle: string;
}

// Part 10: Anti-Scam Intelligence
export interface ScamRiskReport {
  jobIdOrAgency: string;
  riskScore: number; // 0 to 100 (high = dangerous)
  riskLevel: 'Low Risk — Verified NEA Licensed' | 'Caution — Incomplete Details' | 'High Risk Scam Alert';
  redFlagsDetected: string[];
  licenseVerificationStatus: 'Valid NEA License' | 'Expired License' | 'Unregistered / Fraudulent Claim';
  guidanceSummary: string;
}

// Part 12: National Talent Intelligence (47 Counties)
export interface CountyTalentStat {
  code: number; // 1 to 47
  name: string;
  workforceCount: number;
  registeredTalent: number;
  primaryIndustries: string[];
  emergingSkillsDemand: string[];
  tvetHubsCount: number;
  topExportTrades: string[];
}
