import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAtsScore, filterJobs, validateDeparturePack, getJourneyProgress } from './rules';
import { CVData, JobPosting, DeparturePack, JourneyStage } from '../types';

test('calculateAtsScore evaluates incomplete CV with low score and recommendations', () => {
  const emptyCv: CVData = {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    nationalIdOrPassport: '',
    professionalSummary: '',
    experiences: [],
    qualifications: [],
    certifications: [],
    skills: [],
    languages: [],
    references: [],
  };

  const evalResult = calculateAtsScore(emptyCv);
  assert.equal(evalResult.score, 0);
  assert.equal(evalResult.rating, 'Critical Issues');
  assert.ok(evalResult.recommendations.length > 3);
});

test('calculateAtsScore awards high score for comprehensive ATS formatted CV', () => {
  const fullCv: CVData = {
    fullName: 'Grace Wanjiku Mwangi',
    professionalTitle: 'Senior Critical Care Registered Nurse',
    email: 'grace.wanjiku@kenyaone.co.ke',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    nationalIdOrPassport: 'ID-28491024',
    professionalSummary: 'Dedicated and compassionate Senior Critical Care Nurse with 8+ years of ICU clinical experience across major tertiary referral hospitals. Proven track record in patient hemodynamic monitoring, mechanical ventilation, and multidisciplinary emergency response.',
    experiences: [
      {
        id: '1',
        jobTitle: 'Senior ICU Nurse',
        company: 'Nairobi Hospital',
        location: 'Nairobi',
        country: 'Kenya',
        startDate: '2020-03',
        endDate: 'Present',
        isCurrent: true,
        achievements: [
          'Managed 12-bed intensive care unit overseeing complex surgical and trauma patients',
          'Delivered continuous hemodynamic stabilization and ventilator management with zero clinical errors',
          'Trained 24 junior nurses and nursing interns on emergency resuscitation protocols',
        ],
      },
    ],
    qualifications: [
      {
        id: '1',
        qualification: 'Bachelor of Science in Nursing (BScN)',
        fieldOfStudy: 'Nursing & Health Sciences',
        institution: 'University of Nairobi',
        country: 'Kenya',
        graduationYear: '2016',
        gradeOrDistinction: 'First Class Honours',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'Registered Nurse License',
        issuingBody: 'Nursing Council of Kenya (NCK)',
        issueDate: '2016-08',
      },
    ],
    skills: ['Critical Care', 'Ventilator Management', 'Emergency Triage', 'Patient Care', 'ACLS / BLS Certified'],
    languages: ['English (Fluent)', 'Swahili (Native)'],
    references: [
      {
        id: '1',
        name: 'Dr. Peter Otieno',
        title: 'Chief Medical Officer',
        organization: 'Nairobi Hospital',
        email: 'p.otieno@nairobihospital.org',
        phone: '+254 722 000 111',
      },
    ],
  };

  const evalResult = calculateAtsScore(fullCv);
  assert.ok(evalResult.score >= 85, `Score should be at least 85, got ${evalResult.score}`);
  assert.equal(evalResult.rating, 'Exceptional');
  assert.ok(evalResult.passedChecks.length >= 6);
});

test('filterJobs correctly filters by query, region, and sector', () => {
  const jobs: JobPosting[] = [
    {
      id: 'job-1',
      title: 'ICU Staff Nurse',
      employer: 'Hamad Medical Corporation',
      isGovernment: false,
      isPrivateSector: false,
      isInternational: true,
      country: 'Qatar',
      city: 'Doha',
      region: 'GCC / Middle East',
      category: 'Healthcare',
      salaryRange: 'QAR 12,000 - 16,000',
      salaryCurrency: 'QAR',
      jobType: 'Full-time',
      experienceRequired: '3+ Years',
      educationRequired: 'BSc Nursing',
      deadline: '2026-12-15',
      postedDate: '2026-11-01',
      openings: 25,
      description: 'Hamad Medical Corporation seeks licensed Kenyan nurses.',
      responsibilities: ['Patient care'],
      requirements: ['BSc Nursing', 'NCK license'],
      benefits: ['Free accommodation', 'Annual return flight'],
      neaLicenseNumber: 'NEA/K/2024/0088',
      isAgencyVerified: true,
    },
    {
      id: 'job-2',
      title: 'Senior Civil Engineer',
      employer: 'Kenya National Highways Authority (KeNHA)',
      isGovernment: true,
      isPrivateSector: false,
      isInternational: false,
      country: 'Kenya',
      city: 'Nairobi',
      region: 'Kenya Local',
      category: 'Engineering & Tech',
      salaryRange: 'KES 180,000 - 240,000',
      salaryCurrency: 'KES',
      jobType: 'Full-time',
      experienceRequired: '5+ Years',
      educationRequired: 'BSc Civil Engineering',
      deadline: '2026-11-30',
      postedDate: '2026-10-25',
      openings: 4,
      description: 'Supervision of national highway projects.',
      responsibilities: ['Structural analysis'],
      requirements: ['EBK Registration'],
      benefits: ['Medical cover', 'Pension'],
      isAgencyVerified: false,
    },
  ];

  // Test keyword search
  const nurseMatches = filterJobs(jobs, 'nurse', 'All Sectors', 'All Destinations', 'all');
  assert.equal(nurseMatches.length, 1);
  assert.equal(nurseMatches[0].id, 'job-1');

  // Test GCC region filter
  const gccMatches = filterJobs(jobs, '', 'All Sectors', 'GCC / Middle East', 'all');
  assert.equal(gccMatches.length, 1);
  assert.equal(gccMatches[0].country, 'Qatar');

  // Test Government sector filter
  const govMatches = filterJobs(jobs, '', 'All Sectors', 'All Destinations', 'government');
  assert.equal(govMatches.length, 1);
  assert.equal(govMatches[0].employer, 'Kenya National Highways Authority (KeNHA)');
});

test('validateDeparturePack requires all documents verified', () => {
  const incompletePack: DeparturePack = {
    id: 'pack-1',
    referenceNumber: 'KP-2026-DOH-8821',
    applicantName: 'Brian Kimani',
    nationalId: 'ID-31298492',
    destinationCountry: 'Qatar',
    destinationCity: 'Doha',
    employer: 'Qatar Airways',
    jobTitle: 'Cargo Operations Specialist',
    flightNumber: 'QR 1336',
    departureDate: '2026-11-20',
    status: 'Preparation',
    items: [
      { id: '1', name: 'Original Employment Contract', category: 'Contract', verified: true },
      { id: '2', name: 'Work Permit & Entry Visa', category: 'Visa', verified: false },
    ],
  };

  const validation = validateDeparturePack(incompletePack);
  assert.equal(validation.isValidForRelease, false);
  assert.equal(validation.missingItems.length, 1);
  assert.equal(validation.completionPercentage, 50);

  // Mark all verified
  incompletePack.items[1].verified = true;
  const completeValidation = validateDeparturePack(incompletePack);
  assert.equal(completeValidation.isValidForRelease, true);
  assert.equal(completeValidation.completionPercentage, 100);
});

test('getJourneyProgress calculates progress percentage and active stage correctly', () => {
  const stages: JourneyStage[] = [
    {
      stepNumber: 1,
      title: 'Account registration',
      description: 'Account registered and activated',
      status: 'completed',
      responsibleOrg: 'KenyaOne',
      requiredDocuments: ['National ID'],
      outstandingActions: [],
      nextSteps: 'Proceed to ID verification',
    },
    {
      stepNumber: 2,
      title: 'Identity verification',
      description: 'National ID and phone verified via IPRS/eCitizen',
      status: 'completed',
      responsibleOrg: 'KenyaOne / NRB',
      requiredDocuments: ['ID Card'],
      outstandingActions: [],
      nextSteps: 'Submit CV and credentials',
    },
    {
      stepNumber: 3,
      title: 'CV and document submission',
      description: 'Uploaded academic and professional credentials',
      status: 'in_progress',
      responsibleOrg: 'Jobseeker',
      requiredDocuments: ['ATS CV', 'Degree Certificate'],
      outstandingActions: ['Upload police clearance'],
      nextSteps: 'Awaiting submission review',
    },
    {
      stepNumber: 4,
      title: 'Application received',
      description: 'Sent to employer',
      status: 'pending',
      responsibleOrg: 'Employer',
      requiredDocuments: [],
      outstandingActions: [],
      nextSteps: 'Review by HR team',
    },
  ];

  const progress = getJourneyProgress(stages);
  assert.equal(progress.completedCount, 2);
  assert.equal(progress.totalStages, 4);
  assert.equal(progress.percentage, 50);
  assert.equal(progress.currentActiveStage?.stepNumber, 3);
});
