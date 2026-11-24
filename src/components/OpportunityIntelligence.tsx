import React, { useState } from 'react';
import { CareerOpportunity } from '../types';
import { CAREER_OPPORTUNITY_VERTICALS } from '../data/expandedData';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface OpportunityIntelligenceProps {
  onApplyOpportunity: (opp: CareerOpportunity) => void;
}

export const OpportunityIntelligence: React.FC<OpportunityIntelligenceProps> = ({
  onApplyOpportunity,
}) => {
  const [selectedVertical, setSelectedVertical] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [activeModalOpp, setActiveModalOpp] = useState<CareerOpportunity | null>(null);

  const verticalLabels: Record<string, string> = {
    all: 'All 15 Verticals',
    government: 'Kenyan National Government',
    county: '47 County Governments',
    private: 'Kenyan Private Sector',
    international: 'Global Multi-Nationals',
    gulf: 'Qatar, UAE & Gulf Corridors',
    western: 'UK, Germany, Canada & Europe',
    skilled_trades: 'Certified TVET Skilled Trades',
    unskilled_trades: 'General & Support Roles',
    internships: 'Presidential & Corporate Internships',
    apprenticeships: 'Dual Apprenticeships & Industrial Attachments',
    graduate_programmes: 'Fast-Track Graduate Management',
    scholarships: 'International Full Scholarships',
    training: 'NITA & TVETA Subsidized Certifications',
    remote_employment: 'Global Remote & Digital Gig Work',
  };

  const filteredOpps = CAREER_OPPORTUNITY_VERTICALS.filter((opp) => {
    const matchesVertical = selectedVertical === 'all' || opp.verticalCategory === selectedVertical;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.eligibilitySummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVertical && matchesSearch;
  });

  const handleApply = (opp: CareerOpportunity) => {
    onApplyOpportunity(opp);
    if (!appliedIds.includes(opp.id)) {
      setAppliedIds((prev) => [...prev, opp.id]);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-emerald-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>National & International Opportunity Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            15 Career Opportunity Verticals
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            From Public Service Commission postings and devolved County Governments to Gulf healthcare contracts, German dual apprenticeships, TVET trade certifications, and DAAD scholarships.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keyword, agency, county, or profession (e.g. KeNHA, Nursing, DevOps)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select
            value={selectedVertical}
            onChange={(e) => setSelectedVertical(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.entries(verticalLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map((opp) => (
          <div
            key={opp.id}
            className={`glass-panel rounded-2xl p-5 border flex flex-col justify-between transition-all hover:scale-[1.01] ${
              opp.isFeatured
                ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                : 'border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  {opp.verticalCategory.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Due {opp.deadline}</span>
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{opp.organization}</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{opp.location} ({opp.country})</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Remuneration / Terms</span>
                <p className="text-xs font-black text-emerald-400">{opp.remunerationOrStipend}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{opp.openPositionsCount} Open Positions</p>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">
                {opp.eligibilitySummary}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-800/80 mt-4">
              <button
                onClick={() => setActiveModalOpp(opp)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer text-center"
              >
                Full Dossier
              </button>
              <button
                onClick={() => handleApply(opp)}
                disabled={appliedIds.includes(opp.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  appliedIds.includes(opp.id)
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-md'
                }`}
              >
                {appliedIds.includes(opp.id) ? 'Transmitted' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activeModalOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Official Opportunity Dossier
                </span>
                <h3 className="text-xl font-black text-white mt-1">{activeModalOpp.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{activeModalOpp.organization} • {activeModalOpp.location}</p>
              </div>
              <button
                onClick={() => setActiveModalOpp(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Remuneration & Package</span>
                <p className="text-sm font-black text-emerald-400">{activeModalOpp.remunerationOrStipend}</p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Prerequisites & Eligibility:</span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {activeModalOpp.eligibilitySummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Total Vacancies</span>
                  <span className="text-sm font-bold text-white">{activeModalOpp.openPositionsCount} Posts</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Submission Cutoff</span>
                  <span className="text-sm font-bold text-amber-400">{activeModalOpp.deadline}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveModalOpp(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleApply(activeModalOpp);
                  setActiveModalOpp(null);
                }}
                disabled={appliedIds.includes(activeModalOpp.id)}
                className="flex-1 py-2.5 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                {appliedIds.includes(activeModalOpp.id) ? 'Already Applied' : 'Transmit Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
