import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateJobCompatibility,
  evaluateInterviewAnswer,
  generateTailoredCoverLetter,
  analyzeScamRisk,
} from './aiCareerEngine';
import { INITIAL_CV_DATA, MOCK_JOBS } from '../data/mockData';

test('calculateJobCompatibility computes valid score, tier, and gap analysis', () => {
  const cv = INITIAL_CV_DATA; // Nurse
  const job = MOCK_JOBS[0]; // ICU Staff Nurse Qatar

  const result = calculateJobCompatibility(cv, job);
  assert.ok(result.scorePercent >= 60, `Expected score >= 60 for matching nurse profile, got ${result.scorePercent}`);
  assert.ok(result.qualifyingReasons.length > 0, 'Expected qualifying reasons');
  assert.ok(result.swahiliExplanation.length > 0, 'Expected Kiswahili explanation');
  assert.ok(result.progressionOpportunities.length > 0, 'Expected progression opportunities');
});

test('evaluateInterviewAnswer evaluates STAR components and generates feedback', () => {
  const detailedAnswer = 'When my ICU experienced a surge of acute respiratory failure patients, my task was to lead the triage team. I prioritized arterial blood gas testing, initiated non-invasive ventilation, and stabilized vital signs following standard operating protocol. I collaborated with the intensivist to monitored arterial pressures. This resulted in improved patient outcomes and reduced mortality by 40%.';

  const evalResult = evaluateInterviewAnswer('q-1', detailedAnswer, 'en');
  assert.ok(evalResult.overallScore >= 70, `Expected score >= 70, got ${evalResult.overallScore}`);
  assert.ok(evalResult.starComponents.actionScore >= 70, 'Expected high action score');
  assert.ok(evalResult.actionableFeedback.length > 0, 'Expected feedback');
});

test('generateTailoredCoverLetter produces structured ATS letter with references', () => {
  const cv = INITIAL_CV_DATA;
  const job = MOCK_JOBS[0];

  const letterEn = generateTailoredCoverLetter(cv, job, 'en');
  assert.ok(letterEn.includes(cv.fullName), 'Contains full name');
  assert.ok(letterEn.includes(job.title.toUpperCase()), 'Contains capitalized job title');
  assert.ok(letterEn.includes(job.employer), 'Contains employer name');

  const letterSw = generateTailoredCoverLetter(cv, job, 'sw');
  assert.ok(letterSw.includes('KUHUSU: MAOMBI YA KAZI'), 'Contains Swahili subject header');
});

test('analyzeScamRisk catches illegal upfront fees and M-PESA demands', () => {
  const scamText = 'Pay 50,000 KES via M-PESA to personal number for guaranteed visa in 24 hours without interview.';
  const scamReport = analyzeScamRisk(scamText, 'Fake Agency XYZ', 'agent@gmail.com');

  assert.equal(scamReport.riskLevel, 'Critical Scam Warning');
  assert.ok(scamReport.riskScorePercent >= 60, 'Scam risk score should be >= 60%');
  assert.ok(scamReport.redFlagsDetected.length >= 2, 'Should detect multiple red flags');

  const legitText = 'Registered Nurse vacancy under UK-Kenya Bilateral Agreement. Zero fees charged to applicants.';
  const legitReport = analyzeScamRisk(legitText, 'Trans-Sahara Manpower & Global Careers Ltd', 'hr@trans-sahara.co.ke');
  assert.equal(legitReport.riskLevel, 'Low');
  assert.equal(legitReport.isAgencyLicensed, true);
});
