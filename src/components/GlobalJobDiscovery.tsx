import React, { useState } from 'react';
import { CountryDossier, JobPosting } from '../types';
import { COUNTRY_DOSSIERS } from '../data/expandedData';
import { MOCK_JOBS } from '../data/mockData';
import {
  Globe2,
  Building,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Coins,
  CheckCircle2,
} from 'lucide-react';

interface GlobalJobDiscoveryProps {
  onApplyJob: (job: JobPosting) => void;
  appliedJobIds: string[];
}

export const GlobalJobDiscovery: React.FC<GlobalJobDiscoveryProps> = ({
  onApplyJob,
  appliedJobIds,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDossier, setActiveDossier] = useState<CountryDossier | null>(COUNTRY_DOSSIERS[0]);

  const regions = ['All', 'GCC / Middle East', 'Europe / Americas', 'Asia / Pacific', 'Africa Regional', 'Kenya Local'];

  const filteredDossiers = COUNTRY_DOSSIERS.filter((d) => {
    const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
    const matchesSearch =
      d.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.topInDemandRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const activeCountryJobs = activeDossier
    ? MOCK_JOBS.filter(
        (j) =>
          j.country.toLowerCase().includes(activeDossier.countryName.toLowerCase()) ||
          activeDossier.countryName.toLowerCase().includes(j.country.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-teal-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Labour Mobility & Country Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            18+ International Employment Corridors & Host Nation Dossiers
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Direct bilateral access to verified vacancies across Qatar, UAE, Saudi Arabia, Germany, the UK, Canada, Australia, Japan, and Singapore. Review host labour codes, tax benchmarks, and bilateral treaties before deployment.
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search destination country, capital, or top profession (e.g. Qatar, Germany, Nurse)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Country Cards & Active Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Country Selector Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[850px] overflow-y-auto pr-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Verified Bilateral Corridors ({filteredDossiers.length})
          </span>
          {filteredDossiers.map((dossier) => (
            <div
              key={dossier.countryCode}
              onClick={() => setActiveDossier(dossier)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                activeDossier?.countryCode === dossier.countryCode
                  ? 'bg-slate-900 border-teal-500/80 shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/30'
                  : 'glass-panel border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{dossier.flagEmoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-sm">{dossier.countryName}</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {dossier.countryCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{dossier.capital} • {dossier.currency}</p>
                  <p className="text-[11px] text-teal-400 font-semibold mt-1">
                    {dossier.activeVacanciesCount} active verified vacancies
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform ${activeDossier?.countryCode === dossier.countryCode ? 'text-teal-400 translate-x-1' : 'text-slate-600'}`} />
            </div>
          ))}
        </div>

        {/* Detailed Country Dossier Inspector (7 Cols) */}
        {activeDossier && (
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{activeDossier.flagEmoji}</span>
                  <div>
                    <span className="text-xs text-teal-400 font-bold uppercase tracking-wider block">
                      Host Nation Labour Dossier
                    </span>
                    <h2 className="text-2xl font-black text-white">{activeDossier.countryName}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Safety Score</span>
                    <span className="text-sm font-extrabold text-emerald-400">{activeDossier.safetyIndex}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Tax Rate</span>
                    <span className="text-sm font-extrabold text-amber-400">{activeDossier.incomeTaxRate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stat Pill Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <Coins className="w-3.5 h-3.5 text-teal-400" />
                    <span>Average Expat Salary Benchmark</span>
                  </div>
                  <p className="text-xs font-black text-white">{activeDossier.averageSalaryRange}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Statutory Working Hours</span>
                  </div>
                  <p className="text-xs font-black text-white">{activeDossier.standardWorkingHours}</p>
                </div>
              </div>

              {/* Host Labour Code Summary */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-400" />
                  <span>Host Nation Labour Code & Worker Safeguards</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  {activeDossier.labourCodeSummary}
                </p>
              </div>

              {/* Bilateral Agreement with Kenya */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bilateral Treaty with the Republic of Kenya</span>
                </div>
                <p className="text-xs text-slate-300">
                  {activeDossier.bilateralAgreementWithKenya}
                </p>
              </div>

              {/* Work Permit Pathways */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Permitted Visa & Work Authorisation Types
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDossier.workPermitTypes.map((pt, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200">
                      ✓ {pt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top in Demand Roles */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  High-Priority Kenyan Talent Demands
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeDossier.topInDemandRoles.map((role, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl text-xs font-bold bg-teal-500/10 border border-teal-500/30 text-teal-300">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cultural Brief */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-slate-200 block">Workplace Culture & Expat Living Brief:</span>
                <p>{activeDossier.culturalBrief}</p>
              </div>

              {/* Active Jobs in this Country */}
              {activeCountryJobs.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                    Featured Active Vacancies in {activeDossier.countryName}
                  </span>
                  <div className="space-y-3">
                    {activeCountryJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-white">{job.title}</h4>
                          <p className="text-xs text-slate-400">{job.employer} • {job.city}</p>
                          <p className="text-xs text-emerald-400 font-semibold mt-1">{job.salaryRange}</p>
                        </div>
                        <button
                          onClick={() => onApplyJob(job)}
                          disabled={appliedJobIds.includes(job.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            appliedJobIds.includes(job.id)
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold shadow-sm'
                          }`}
                        >
                          {appliedJobIds.includes(job.id) ? 'Applied' : 'Apply Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
