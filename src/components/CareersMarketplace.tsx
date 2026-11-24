import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Share2,
} from 'lucide-react';
import { JobPosting, JobseekerProfile } from '../types';
import { filterJobs } from '../utils/rules';

interface CareersMarketplaceProps {
  jobs: JobPosting[];
  userProfile: JobseekerProfile;
  onApplyJob: (job: JobPosting) => void;
  appliedJobIds: string[];
}

export const CareersMarketplace: React.FC<CareersMarketplaceProps> = ({
  jobs,
  userProfile,
  onApplyJob,
  appliedJobIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [selectedRegion, setSelectedRegion] = useState('All Destinations');
  const [selectedSector, setSelectedSector] = useState<'all' | 'government' | 'private' | 'international' | 'agency_verified'>('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const categories = [
    'All Sectors',
    'Healthcare',
    'Engineering & Tech',
    'Hospitality & Tourism',
    'Logistics & Trades',
    'Public Service',
  ];

  const regions = [
    'All Destinations',
    'Kenya Local',
    'GCC / Middle East',
    'Europe / Americas',
    'Remote',
  ];

  const filtered = filterJobs(jobs, searchQuery, selectedCategory, selectedRegion, selectedSector);

  return (
    <div className="w-full space-y-6">
      {/* Hero Header with Search Bar */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/20 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Opportunities & Licensed NEA Recruitment Agencies
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Kenya’s National & International Careers Marketplace
          </h1>
          <p className="text-sm text-slate-300">
            Apply to verified government positions, premier local enterprises, and overseas placements in Qatar, UAE, Saudi Arabia, Germany & Canada with one unified KenyaOne career dossier.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-xl">
          <div className="md:col-span-5 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, skill, company (e.g. Nurse, Engineer, Safaricom)..."
              className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="glass-input w-full px-3 py-2.5 rounded-xl text-xs text-white"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="glass-input w-full px-3 py-2.5 rounded-xl text-xs text-white"
            >
              {regions.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 font-medium">Quick Filter:</span>
          {[
            { id: 'all', label: 'All Vacancies' },
            { id: 'government', label: '🇰🇪 Kenyan Government / PSC' },
            { id: 'private', label: '🏢 Private Sector (Safaricom, KeNHA)' },
            { id: 'international', label: '✈️ Overseas Placements (GCC, Europe)' },
            { id: 'agency_verified', label: '🛡️ NEA Licensed Agencies Only' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedSector(pill.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSector === pill.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{filtered.length}</strong> verified opportunities</span>
          <span>Zero illegal recruitment placement fees charged to jobseekers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => {
            const hasApplied = appliedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg hover:shadow-emerald-950/20"
              >
                <div className="space-y-3">
                  {/* Card Header Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        job.isInternational
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : job.isGovernment
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}
                    >
                      {job.region}
                    </span>

                    {job.isAgencyVerified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-amber-400" /> NEA Licensed
                      </span>
                    )}
                  </div>

                  {/* Title & Employer */}
                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.employer}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {job.city}, {job.country}
                    </p>
                  </div>

                  {/* Salary & Openings */}
                  <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      {job.salaryRange}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{job.openings} Openings Available</span>
                      <span>Exp: {job.experienceRequired}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 2).map((req, rIdx) => (
                      <span
                        key={rIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        ✓ {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {hasApplied ? (
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => onApplyJob(job)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md cursor-pointer"
                    >
                      Apply with Profile
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  {selectedJob.region} • {selectedJob.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-slate-300 font-semibold mt-0.5">
                  {selectedJob.employer} — {selectedJob.city}, {selectedJob.country}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* License & Verification Badge */}
            {selectedJob.neaLicenseNumber && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-300">
                <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <strong className="block text-white">NEA Accredited Recruitment Agency</strong>
                  Recruiter: {selectedJob.agencyName} (Licence: {selectedJob.neaLicenseNumber})
                </div>
              </div>
            )}

            {/* Salary & Benefits */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
              <div className="text-sm font-extrabold text-emerald-400">
                Compensation: {selectedJob.salaryRange}
              </div>
              <div className="text-xs text-slate-300">
                <strong>Provided Benefits:</strong> {selectedJob.benefits.join(' • ')}
              </div>
            </div>

            {/* Responsibilities & Requirements */}
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-1.5">
                  Key Responsibilities
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-1.5">
                  Qualifications & Eligibility
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedJob.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Application Deadline: {selectedJob.deadline}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onApplyJob(selectedJob);
                    setSelectedJob(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40"
                >
                  Confirm Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
