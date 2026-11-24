import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Users,
  Briefcase,
  ShieldCheck,
  Calendar,
  FileCheck,
  CheckCircle2,
  ChevronRight,
  Search,
} from 'lucide-react';
import { JobPosting, ApplicationRecord } from '../types';

interface EmployerDashboardProps {
  jobs: JobPosting[];
  applications: ApplicationRecord[];
  onAddNewJob: (newJob: JobPosting) => void;
  onOpenScheduleInterview?: () => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  jobs,
  applications,
  onAddNewJob,
  onOpenScheduleInterview,
}) => {
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [agencyLicense, setAgencyLicense] = useState('NEA/K/2024/0114');
  const [isAgencyVerified, setIsAgencyVerified] = useState(true);

  // New Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newEmployer, setNewEmployer] = useState('Hamad Medical Corporation');
  const [newCountry, setNewCountry] = useState('Qatar');
  const [newCity, setNewCity] = useState('Doha');
  const [newCategory, setNewCategory] = useState<JobPosting['category']>('Healthcare');
  const [newSalary, setNewSalary] = useState('QAR 12,000 - 15,000 / month');
  const [newOpenings, setNewOpenings] = useState(15);
  const [newExp, setNewExp] = useState('3+ Years');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const createdJob: JobPosting = {
      id: `job-custom-${Date.now()}`,
      title: newTitle,
      employer: newEmployer,
      isGovernment: false,
      isPrivateSector: true,
      isInternational: newCountry !== 'Kenya',
      country: newCountry,
      city: newCity,
      region: newCountry === 'Kenya' ? 'Kenya Local' : 'GCC / Middle East',
      category: newCategory,
      salaryRange: newSalary,
      salaryCurrency: newCountry === 'Kenya' ? 'KES' : 'QAR',
      jobType: 'Full-time',
      experienceRequired: newExp,
      educationRequired: 'Bachelor’s or Diploma',
      deadline: '2026-12-31',
      postedDate: '2026-11-09',
      openings: Number(newOpenings) || 1,
      description: `Newly published opening by ${newEmployer}. Full recruitment coordination via KenyaOne.`,
      responsibilities: ['Execute key technical responsibilities', 'Maintain high standards of performance and ethics'],
      requirements: ['Certified relevant qualifications', 'Valid National ID / Passport', 'Clean Police Clearance'],
      benefits: ['Competitive tax-free remuneration', 'Accommodation provided', 'Return flights'],
      neaLicenseNumber: agencyLicense,
      agencyName: 'GulfKenya Global Talent Agency',
      isAgencyVerified: true,
    };

    onAddNewJob(createdJob);
    setShowNewJobModal(false);
    setNewTitle('');
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: Verified Agency Status */}
      <div className="glass-panel rounded-2xl p-6 relative border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NEA Licensed Agency Portal
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Licence: {agencyLicense}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white mt-0.5">
                Employer & Licensed Agency Recruitment Command
              </h1>
            </div>
          </div>

          <button
            onClick={() => setShowNewJobModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Publish New Vacancy
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Active Vacancies</span>
            <strong className="text-lg font-bold text-white block mt-0.5">{jobs.length}</strong>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Applications In Pipeline</span>
            <strong className="text-lg font-bold text-emerald-400 block mt-0.5">148</strong>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Interviews Scheduled</span>
            <strong className="text-lg font-bold text-blue-400 block mt-0.5">34</strong>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Departure Packs Issued</span>
            <strong className="text-lg font-bold text-amber-400 block mt-0.5">19</strong>
          </div>
        </div>
      </div>

      {/* Candidate Pipeline Review */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Candidate Pipeline & Action Docket
            </h2>
            <p className="text-xs text-slate-400">Review submitted ATS CVs, credentials, and schedule interviews</p>
          </div>
          {onOpenScheduleInterview && (
            <button
              onClick={onOpenScheduleInterview}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule New Interview
            </button>
          )}
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-card rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-bold text-white">
                    Faith Chebet Kipkorir
                  </strong>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    BSc Nursing (94% ATS Match)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Applied for: <span className="font-semibold text-white">{app.jobTitle}</span> ({app.employer})
                </p>
                <div className="text-[11px] text-slate-400 flex flex-wrap gap-2 pt-0.5">
                  <span>✓ ID Verified</span>
                  <span>✓ NCK License Verified</span>
                  <span>✓ DCI Clearance Clean</span>
                  <span>✓ Wafid Medical Fit</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                  Stage: {app.currentStatus}
                </span>
                {app.interviewDetails && onOpenScheduleInterview && (
                  <button
                    onClick={onOpenScheduleInterview}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    View Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Vacancy Publishing Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-xl rounded-2xl p-6 sm:p-7 border border-slate-700 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Publish New Verified Vacancy</h3>
              <button
                onClick={() => setShowNewJobModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Critical Care Nurse, Heavy Fleet Mechanic"
                  required
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Employer Organization *</label>
                  <input
                    type="text"
                    value={newEmployer}
                    onChange={(e) => setNewEmployer(e.target.value)}
                    required
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Country *</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    required
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Sector Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  >
                    <option value="Healthcare" className="bg-slate-900">Healthcare</option>
                    <option value="Engineering & Tech" className="bg-slate-900">Engineering & Tech</option>
                    <option value="Hospitality & Tourism" className="bg-slate-900">Hospitality & Tourism</option>
                    <option value="Logistics & Trades" className="bg-slate-900">Logistics & Trades</option>
                    <option value="Public Service" className="bg-slate-900">Public Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Monthly Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. QAR 12,000 - 16,000"
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Number of Openings</label>
                  <input
                    type="number"
                    value={newOpenings}
                    onChange={(e) => setNewOpenings(Number(e.target.value))}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Required Experience</label>
                  <input
                    type="text"
                    value={newExp}
                    onChange={(e) => setNewExp(e.target.value)}
                    placeholder="e.g. 2+ Years"
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-[11px] text-amber-300">
                Overseas vacancy will be published with your verified NEA license reference: <strong>{agencyLicense}</strong>.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
