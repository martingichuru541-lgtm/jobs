import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Plus,
  Trash2,
  Download,
  Printer,
  Sparkles,
  FileText,
  AlertCircle,
  Eye,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { CVData, WorkExperience, AcademicQualification, CertificationItem, ReferenceContact } from '../types';
import { calculateAtsScore } from '../utils/rules';
import { exportATSFriendlyCVPdf } from '../utils/pdfGenerator';
import { SAMPLE_CVS } from '../data/mockData';

interface CVBuilderProps {
  initialData?: CVData;
  onSaveToProfile?: (data: CVData) => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ initialData, onSaveToProfile }) => {
  const [cvData, setCvData] = useState<CVData>(initialData || SAMPLE_CVS.nurse);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<'form' | 'preview' | 'split'>('split');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const steps = [
    { id: 'personal', title: 'Personal Details', icon: User },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'education', title: 'Education & Academics', icon: GraduationCap },
    { id: 'certifications', title: 'Certifications & Skills', icon: Award },
  ];

  const atsEvaluation = calculateAtsScore(cvData);

  // Dynamic Array Handlers for Work Experience
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: 'Nairobi',
      country: 'Kenya',
      startDate: '2023-01',
      endDate: 'Present',
      isCurrent: true,
      achievements: ['Delivered core departmental objectives with high accuracy', 'Collaborated with multidisciplinary teams'],
    };
    setCvData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addAchievement = (expId: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            achievements: [...exp.achievements, 'Achieved measurable operational improvement using standard procedures'],
          };
        }
        return exp;
      }),
    }));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          const updated = [...exp.achievements];
          updated[index] = value;
          return { ...exp, achievements: updated };
        }
        return exp;
      }),
    }));
  };

  const removeAchievement = (expId: string, index: number) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            achievements: exp.achievements.filter((_, i) => i !== index),
          };
        }
        return exp;
      }),
    }));
  };

  // Dynamic Array Handlers for Education
  const addEducation = () => {
    const newEdu: AcademicQualification = {
      id: `edu-${Date.now()}`,
      qualification: 'Diploma in Information Technology',
      fieldOfStudy: 'Computer Systems',
      institution: 'Kenya Institute of Highway & Building Technology',
      country: 'Kenya',
      graduationYear: '2022',
      gradeOrDistinction: 'Credit',
    };
    setCvData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newEdu],
    }));
  };

  const updateEducation = (id: string, field: keyof AcademicQualification, value: any) => {
    setCvData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((edu) => edu.id !== id),
    }));
  };

  // Dynamic Array Handlers for Certifications
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'Occupational Safety & Health (OSHA) Level 1',
      issuingBody: 'Directorate of Occupational Safety and Health Services (DOSHS Kenya)',
      issueDate: '2023-06',
      credentialId: 'DOSHS-2023-881',
    };
    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const updateCertification = (id: string, field: keyof CertificationItem, value: any) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const removeCertification = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  // Skill Chip Handlers
  const [newSkillInput, setNewSkillInput] = useState('');
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (!cvData.skills.includes(newSkillInput.trim())) {
      setCvData((prev) => ({ ...prev, skills: [...prev.skills, newSkillInput.trim()] }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Export PDF
  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      exportATSFriendlyCVPdf(cvData);
    } finally {
      setIsExporting(false);
    }
  };

  // Save to profile
  const handleSave = () => {
    if (onSaveToProfile) {
      onSaveToProfile(cvData);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Preset Loaders
  const loadPreset = (presetKey: 'nurse' | 'logistics' | 'tech') => {
    if (SAMPLE_CVS[presetKey]) {
      setCvData(SAMPLE_CVS[presetKey]);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header & Presets */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Official ATS Engine
              </span>
              <span className="text-xs text-slate-400">Standardized Single-Column Format</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              ATS-Optimized CV & Credentials Builder
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Engineered to bypass applicant tracking filters for Kenyan Public Service, local enterprises, and international overseas placements in Qatar, UAE, Canada & Europe.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Load Template:</span>
            <button
              onClick={() => loadPreset('nurse')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              🏥 Healthcare (Nurse)
            </button>
            <button
              onClick={() => loadPreset('logistics')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 transition-colors"
            >
              🚢 Logistics / Fleet
            </button>
            <button
              onClick={() => loadPreset('tech')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-purple-400 border border-purple-500/30 transition-colors"
            >
              💻 Cloud / DevOps
            </button>
          </div>
        </div>

        {/* ATS Score Meter & Action Bar */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Real-time ATS Readiness Score
              </span>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                  atsEvaluation.score >= 85
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : atsEvaluation.score >= 70
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {atsEvaluation.score}/100 — {atsEvaluation.rating}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  atsEvaluation.score >= 85
                    ? 'bg-emerald-500'
                    : atsEvaluation.score >= 70
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${atsEvaluation.score}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
              {atsEvaluation.passedChecks[0] || 'Checking completeness...'}
            </p>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center justify-end gap-2.5">
            {/* View Mode Switcher */}
            <div className="bg-slate-900/90 rounded-xl p-1 border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setPreviewMode('form')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  previewMode === 'form' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Form Editor
              </button>
              <button
                onClick={() => setPreviewMode('split')}
                className={`hidden lg:block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  previewMode === 'split' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  previewMode === 'preview' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                Live Preview
              </button>
            </div>

            {/* Save to Profile */}
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved to Profile
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" /> Save to Profile
                </>
              )}
            </button>

            {/* Export Standard ATS PDF */}
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating PDF...' : 'Download ATS PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Steps & Live Preview */}
      <div className={`grid grid-cols-1 ${previewMode === 'split' ? 'lg:grid-cols-12' : ''} gap-6`}>
        {/* Left Column: Multi-step Form */}
        {(previewMode === 'form' || previewMode === 'split') && (
          <div className={`${previewMode === 'split' ? 'lg:col-span-7' : 'w-full'} space-y-5`}>
            {/* Step Tabs */}
            <div className="glass-panel rounded-xl p-2 flex items-center gap-1 overflow-x-auto border border-slate-800">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                const isActive = activeStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(idx)}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{st.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 0: Personal Details */}
            {activeStep === 0 && (
              <div className="glass-panel rounded-2xl p-6 space-y-4 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" /> Personal & Identification Details
                  </h2>
                  <span className="text-xs text-slate-400">Step 1 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Official Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={cvData.fullName}
                      onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
                      placeholder="e.g. Faith Chebet Kipkorir"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Target Professional Title <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={cvData.professionalTitle}
                      onChange={(e) => setCvData({ ...cvData, professionalTitle: e.target.value })}
                      placeholder="e.g. Senior Critical Care Registered Nurse"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={cvData.email}
                      onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                      placeholder="e.g. faith.chebet@kenyaone.co.ke"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mobile Phone (Include +254) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={cvData.phone}
                      onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                      placeholder="+254 712 345 678"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      City & County (Kenya) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={cvData.location}
                      onChange={(e) => setCvData({ ...cvData, location: e.target.value })}
                      placeholder="e.g. Nairobi, Kenya"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      National ID or Passport Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={cvData.nationalIdOrPassport}
                      onChange={(e) => setCvData({ ...cvData, nationalIdOrPassport: e.target.value })}
                      placeholder="e.g. ID-32948102 or A0192837"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      LinkedIn / Portfolio URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={cvData.linkedinUrl || ''}
                      onChange={(e) => setCvData({ ...cvData, linkedinUrl: e.target.value })}
                      placeholder="linkedin.com/in/yourname"
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-slate-300">
                        Executive Professional Summary <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {cvData.professionalSummary.trim().split(/\s+/).filter(Boolean).length} words
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={cvData.professionalSummary}
                      onChange={(e) => setCvData({ ...cvData, professionalSummary: e.target.value })}
                      placeholder="Highlight years of expertise, core specialties, key impact, and career readiness..."
                      className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 resize-y"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      💡 Tip: ATS parsers prioritize 3-4 concise sentences with relevant action verbs and specialized domain keywords.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md"
                  >
                    Next: Work Experience <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Work Experience (Dynamic Array) */}
            {activeStep === 1 && (
              <div className="glass-panel rounded-2xl p-6 space-y-5 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-400" /> Professional Work History
                    </h2>
                    <p className="text-xs text-slate-400">Add past and current employment records</p>
                  </div>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Job Entry
                  </button>
                </div>

                {cvData.experiences.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
                    <Briefcase className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No work experience entries added yet.</p>
                    <button
                      onClick={addExperience}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Your First Job
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvData.experiences.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="glass-card rounded-xl p-4.5 space-y-3.5 border border-slate-800/80 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-300">
                              {idx + 1}
                            </span>
                            {exp.jobTitle || 'Untitled Position'}
                          </span>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">Job Title</label>
                            <input
                              type="text"
                              value={exp.jobTitle}
                              onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                              placeholder="e.g. Senior ICU Nurse"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">Employer / Hospital / Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              placeholder="e.g. The Nairobi Hospital"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">City / Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                              placeholder="e.g. Nairobi"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">Country</label>
                            <input
                              type="text"
                              value={exp.country}
                              onChange={(e) => updateExperience(exp.id, 'country', e.target.value)}
                              placeholder="e.g. Kenya"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[11px] font-medium text-slate-300">End Date</label>
                              <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={exp.isCurrent}
                                  onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                                  className="rounded text-emerald-500"
                                />
                                Currently working here
                              </label>
                            </div>
                            {!exp.isCurrent && (
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white"
                              />
                            )}
                          </div>
                        </div>

                        {/* Bulleted Achievements */}
                        <div className="pt-2 border-t border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-slate-300">
                              Key Achievements & Responsibilities (Bulleted)
                            </span>
                            <button
                              type="button"
                              onClick={() => addAchievement(exp.id)}
                              className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add Achievement
                            </button>
                          </div>

                          {exp.achievements.map((ach, aIdx) => (
                            <div key={aIdx} className="flex items-center gap-2">
                              <span className="text-slate-500 text-xs">•</span>
                              <input
                                type="text"
                                value={ach}
                                onChange={(e) => updateAchievement(exp.id, aIdx, e.target.value)}
                                placeholder="State an action verb, responsibility, or quantifiable outcome..."
                                className="glass-input flex-1 px-3 py-1.5 rounded-lg text-xs text-white placeholder-slate-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeAchievement(exp.id, aIdx)}
                                className="p-1 text-slate-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(0)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md"
                  >
                    Next: Education & Academics <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Academic Qualifications & Education (Dynamic Array) */}
            {activeStep === 2 && (
              <div className="glass-panel rounded-2xl p-6 space-y-5 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" /> Academic Qualifications & Education
                    </h2>
                    <p className="text-xs text-slate-400">Universities, TVET colleges, and secondary schools</p>
                  </div>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Academic Entry
                  </button>
                </div>

                {cvData.qualifications.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No education entries added yet.</p>
                    <button
                      onClick={addEducation}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white inline-flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Academic Credential
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvData.qualifications.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="glass-card rounded-xl p-4.5 space-y-3 border border-slate-800/80"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-300">
                              {idx + 1}
                            </span>
                            {edu.qualification || 'Academic Qualification'}
                          </span>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Degree / Diploma / Certificate Title
                            </label>
                            <input
                              type="text"
                              value={edu.qualification}
                              onChange={(e) => updateEducation(edu.id, 'qualification', e.target.value)}
                              placeholder="e.g. Bachelor of Science in Nursing (BScN)"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Field of Study / Specialization
                            </label>
                            <input
                              type="text"
                              value={edu.fieldOfStudy}
                              onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                              placeholder="e.g. Clinical Sciences / Computer Science"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Institution / University / College
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              placeholder="e.g. University of Nairobi / JKUAT"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Country of Institution
                            </label>
                            <input
                              type="text"
                              value={edu.country}
                              onChange={(e) => updateEducation(edu.id, 'country', e.target.value)}
                              placeholder="e.g. Kenya"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Graduation Year
                            </label>
                            <input
                              type="text"
                              value={edu.graduationYear}
                              onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                              placeholder="e.g. 2018"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-medium text-slate-300 mb-1">
                              Grade / Honours / Distinction (Optional)
                            </label>
                            <input
                              type="text"
                              value={edu.gradeOrDistinction}
                              onChange={(e) => updateEducation(edu.id, 'gradeOrDistinction', e.target.value)}
                              placeholder="e.g. First Class Honours / Distinction"
                              className="glass-input w-full px-3 py-2 rounded-lg text-xs text-white placeholder-slate-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md"
                  >
                    Next: Certifications & Skills <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Certifications, Skills & Referees */}
            {activeStep === 3 && (
              <div className="glass-panel rounded-2xl p-6 space-y-5 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" /> Certifications, Skills & Referees
                    </h2>
                    <p className="text-xs text-slate-400">Professional licenses and targeted industry keywords</p>
                  </div>
                </div>

                {/* Professional Certifications Dynamic List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      Professional Licenses & Certifications (NCK, EBK, KNEC, OSHA, etc.)
                    </label>
                    <button
                      onClick={addCertification}
                      className="px-2.5 py-1 rounded text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add License
                    </button>
                  </div>

                  {cvData.certifications.map((cert) => (
                    <div key={cert.id} className="glass-card rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="Certificate / License Name"
                        className="glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        value={cert.issuingBody}
                        onChange={(e) => updateCertification(cert.id, 'issuingBody', e.target.value)}
                        placeholder="Issuing Regulatory Body"
                        className="glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cert.credentialId || ''}
                          onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                          placeholder="License No / Year"
                          className="glass-input flex-1 px-3 py-1.5 rounded-lg text-xs text-white"
                        />
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Skills Chips */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="block text-xs font-bold text-slate-200">
                    Core Competencies & Keywords (ATS Search Vectors)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      placeholder="Type a skill (e.g. Critical Care, Mechanical Ventilation, SAP WMS) and press Enter"
                      className="glass-input flex-1 px-3.5 py-2 rounded-xl text-xs text-white placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cvData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80 flex items-center gap-1.5"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-400 hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={handleExportPdf}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
                  >
                    <Download className="w-4 h-4" /> Finish & Download ATS PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Column: Live ATS Preview (Rendered exactly in ATS Standard single-column layout) */}
        {(previewMode === 'preview' || previewMode === 'split') && (
          <div className={`${previewMode === 'split' ? 'lg:col-span-5' : 'w-full'} space-y-4`}>
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live ATS-Standard Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={handleExportPdf}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-emerald-400 hover:text-white bg-emerald-500/20 hover:bg-emerald-600 border border-emerald-500/30 flex items-center gap-1 transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>

            {/* Standard ATS Document Sheet (White high-contrast paper layout) */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl font-sans text-xs space-y-4 max-h-[800px] overflow-y-auto border border-slate-200">
              {/* Header */}
              <div className="border-b pb-3 text-center sm:text-left">
                <h3 className="text-xl font-extrabold uppercase text-slate-900 tracking-wide">
                  {cvData.fullName || 'CANDIDATE FULL NAME'}
                </h3>
                {cvData.professionalTitle && (
                  <p className="text-emerald-700 font-semibold text-xs mt-0.5">
                    {cvData.professionalTitle}
                  </p>
                )}
                <p className="text-[11px] text-slate-600 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 justify-center sm:justify-start">
                  {cvData.email && <span>{cvData.email}</span>}
                  {cvData.phone && <span>• {cvData.phone}</span>}
                  {cvData.location && <span>• {cvData.location}</span>}
                  {cvData.nationalIdOrPassport && <span>• ID: {cvData.nationalIdOrPassport}</span>}
                  {cvData.linkedinUrl && <span>• {cvData.linkedinUrl}</span>}
                </p>
              </div>

              {/* Summary */}
              {cvData.professionalSummary && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-600 pb-0.5 mb-1.5">
                    Professional Summary
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {cvData.professionalSummary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {cvData.experiences.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-600 pb-0.5 mb-2">
                    Professional Experience
                  </h4>
                  <div className="space-y-3">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{exp.jobTitle || 'Role'}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-slate-600">
                          {exp.company} — {exp.location}, {exp.country}
                        </div>
                        {exp.achievements.length > 0 && (
                          <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
                            {exp.achievements.map((ach, i) => (
                              <li key={i}>{ach}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {cvData.qualifications.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-600 pb-0.5 mb-2">
                    Education & Academic Qualifications
                  </h4>
                  <div className="space-y-2">
                    {cvData.qualifications.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{edu.qualification}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{edu.graduationYear}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          {edu.institution} — {edu.fieldOfStudy}{' '}
                          {edu.gradeOrDistinction && `(${edu.gradeOrDistinction})`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {cvData.certifications.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-600 pb-0.5 mb-1.5">
                    Certifications & Licenses
                  </h4>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {cvData.certifications.map((c) => (
                      <li key={c.id}>
                        <span className="font-semibold">{c.name}</span> — {c.issuingBody} (Issued: {c.issueDate})
                        {c.credentialId && ` [ID: ${c.credentialId}]`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {cvData.skills.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-emerald-600 pb-0.5 mb-1.5">
                    Core Competencies
                  </h4>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {cvData.skills.join('  •  ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
