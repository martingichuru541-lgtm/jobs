import React, { useState } from 'react';
import { CVData, JobPosting } from '../types';
import {
  calculateJobCompatibility,
  evaluateInterviewAnswer,
  generateTailoredCoverLetter,
} from '../utils/aiCareerEngine';
import { SAMPLE_INTERVIEW_QUESTIONS } from '../data/expandedData';
import {
  Bot,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  Languages,
  BookOpen,
  Send,
  MessageSquare,
  FileText,
  Briefcase,
  Copy,
  Check,
} from 'lucide-react';

interface AICareerIntelligenceProps {
  cvData: CVData;
  jobs: JobPosting[];
  onApplyJob: (job: JobPosting) => void;
  appliedJobIds: string[];
}

export const AICareerIntelligence: React.FC<AICareerIntelligenceProps> = ({
  cvData,
  jobs,
  onApplyJob,
  appliedJobIds,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [activeSubTab, setActiveSubTab] = useState<'match' | 'interview' | 'cover_letter' | 'progression'>('match');

  // Interview simulator state
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(SAMPLE_INTERVIEW_QUESTIONS[0].id);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [interviewResult, setInterviewResult] = useState<ReturnType<typeof evaluateInterviewAnswer> | null>(null);

  // Copied state
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const compatibility = selectedJob ? calculateJobCompatibility(cvData, selectedJob) : null;
  const currentQuestion = SAMPLE_INTERVIEW_QUESTIONS.find((q) => q.id === selectedQuestionId) || SAMPLE_INTERVIEW_QUESTIONS[0];

  const handleSimulateInterview = () => {
    if (!candidateAnswer.trim()) return;
    const evaluation = evaluateInterviewAnswer(selectedQuestionId, candidateAnswer, language);
    setInterviewResult(evaluation);
  };

  const handleCopyCoverLetter = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const tailoredLetter = selectedJob ? generateTailoredCoverLetter(cvData, selectedJob, language) : '';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-emerald-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>KenyaOne AI Career Intelligence • Mshauri wa Ajira</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Career Copilot & Real-Time Fit Analysis
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Transparent 5-tier job compatibility scoring, interview simulation with STAR method evaluation, and tailored ATS cover letter generation calibrated for Kenya and overseas corridors.
            </p>
          </div>

          {/* Bilingual Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80 self-start md:self-auto">
            <Languages className="w-4 h-4 text-emerald-400 ml-2" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English (Official)
            </button>
            <button
              onClick={() => setLanguage('sw')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === 'sw'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kiswahili (Taifa)
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('match')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'match'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Compatibility & Gap Analysis</span>
          </button>
          <button
            onClick={() => setActiveSubTab('interview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'interview'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Simulated AI Interview (STAR)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('cover_letter')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'cover_letter'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tailored Cover Letter</span>
          </button>
          <button
            onClick={() => setActiveSubTab('progression')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === 'progression'
                ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Salary & Progression</span>
          </button>
        </div>
      </div>

      {/* Target Vacancy Selector */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Active Benchmark Vacancy:</span>
            <span className="text-sm font-bold text-white">{selectedJob?.title} • {selectedJob?.employer}</span>
          </div>
        </div>
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
        >
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title} ({j.country} - {j.employer})
            </option>
          ))}
        </select>
      </div>

      {/* Sub-tab 1: Compatibility & Gap Analysis */}
      {activeSubTab === 'match' && compatibility && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Big Score Meter */}
          <div className="glass-panel rounded-3xl p-6 border border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Compatibility Quotient
            </span>

            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * compatibility.scorePercent) / 100}
                  strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-white">{compatibility.scorePercent}%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Fit Score</span>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {compatibility.matchTier}
            </div>

            <p className="text-xs text-slate-300 px-2 italic">
              {language === 'sw' ? compatibility.swahiliExplanation : `Evaluated against ${selectedJob.employer}'s verified job specification.`}
            </p>

            <button
              onClick={() => onApplyJob(selectedJob)}
              disabled={appliedJobIds.includes(selectedJob.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                appliedJobIds.includes(selectedJob.id)
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/50'
              }`}
            >
              {appliedJobIds.includes(selectedJob.id) ? 'Application Submitted' : 'Submit Instant Application'}
            </button>
          </div>

          {/* Right: Breakdown & Gap Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Qualifying Factors */}
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Why You Qualify (Nguvu Zako za Kimasomo & Kazi)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {compatibility.qualifyingReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disqualifying / Missing Skills */}
            <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Identified Skill Gaps (Pengo za Ujuzi za Kurekebisha)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {compatibility.disqualifyingFactors.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Bridging Courses */}
            <div className="glass-panel rounded-2xl p-6 border border-teal-500/20 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>AI Recommended Bridging Courses (Kozi za Kukuza Nafasi Yako)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {compatibility.recommendedBridgingCourses.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                    <span className="text-[10px] text-teal-400 font-bold block uppercase">Accelerated</span>
                    <span className="text-slate-200 font-semibold line-clamp-2">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Simulated AI Interview */}
      {activeSubTab === 'interview' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  STAR Method Interview Arena
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {currentQuestion.category}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Select Case Study:</span>
                <select
                  value={selectedQuestionId}
                  onChange={(e) => {
                    setSelectedQuestionId(e.target.value);
                    setInterviewResult(null);
                  }}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {SAMPLE_INTERVIEW_QUESTIONS.map((q, idx) => (
                    <option key={q.id} value={q.id}>
                      Scenario #{idx + 1}: {q.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* The Question Prompt */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed font-medium">
              "{language === 'sw' ? currentQuestion.questionSw : currentQuestion.questionEn}"
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Your Verbal / Written Response (Simulated Delivery):</span>
                <span className="text-[11px] text-slate-400 font-normal">Format: Situation → Task → Action → Result</span>
              </label>
              <textarea
                rows={5}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder={
                  language === 'sw'
                    ? 'Andika jibu lako hapa. Mfano: "Nilipokuwa nikisimamia wadi ya dharura, mgonjwa alipoteza fahamu (Hali)... Nilichukua hatua mara moja kwa kufuata itifaki (Hatua)... na mgonjwa alitulia (Matokeo)..."'
                    : 'Type your response here using the STAR framework. e.g. "In my previous hospital, when a patient suffered sudden cardiopulmonary arrest (Situation), I immediately mobilized the resuscitation code team (Task)... I led airway stabilization and defibrillation within 90 seconds (Action), which resulted in spontaneous circulation restoration with zero neurological deficit (Result)..."'
                }
                className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
              />
            </div>

            <button
              onClick={handleSimulateInterview}
              disabled={!candidateAnswer.trim()}
              className="px-6 py-3 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Evaluate My Answer with AI Triage</span>
            </button>
          </div>

          {/* Interview Evaluation Feedback */}
          {interviewResult && (
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    AI Performance Evaluation
                  </span>
                  <h4 className="text-xl font-black text-white mt-0.5">
                    Interview Competency Score: {interviewResult.overallScore}/100
                  </h4>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Communication Clarity: {interviewResult.communicationClarityScore}%
                </div>
              </div>

              {/* STAR Breakdown Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Situation</span>
                  <span className="text-lg font-black text-white mt-1">{interviewResult.starComponents.situationScore}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Task</span>
                  <span className="text-lg font-black text-white mt-1">{interviewResult.starComponents.taskScore}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Action (Critical)</span>
                  <span className="text-lg font-black text-emerald-400 mt-1">{interviewResult.starComponents.actionScore}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Result (Metrics)</span>
                  <span className="text-lg font-black text-white mt-1">{interviewResult.starComponents.resultScore}%</span>
                </div>
              </div>

              {/* Actionable Feedback Points */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Constructive Coaching Directives:
                </span>
                <ul className="space-y-2 text-xs text-slate-200">
                  {interviewResult.actionableFeedback.map((fb, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{fb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-tab 3: Tailored Cover Letter Generator */}
      {activeSubTab === 'cover_letter' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                ATS-Optimized Cover Letter Engine
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Customized for {selectedJob?.title} ({selectedJob?.employer})
              </h3>
            </div>
            <button
              onClick={() => handleCopyCoverLetter(tailoredLetter)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed shadow-inner">
            {tailoredLetter}
          </div>
        </div>
      )}

      {/* Sub-tab 4: Salary & Progression */}
      {activeSubTab === 'progression' && compatibility && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salary Intelligence */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
                KES
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Realistic Market Salary Expectation</span>
                <span className="text-xl font-black text-white">{compatibility.realisticSalaryExpectation}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on official gazetted wages, verified collective bargaining agreements, and recent bilateral corridor placements in {selectedJob?.country}.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-emerald-300">
              ✓ Tax-exempt status applies for UAE/Qatar placements under host labour codes.
            </div>
          </div>

          {/* Career Horizon */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Career Trajectory Horizon (Njia ya Kupanda Ngazi)</span>
            </div>
            <ul className="space-y-3">
              {compatibility.progressionOpportunities.map((opp, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
