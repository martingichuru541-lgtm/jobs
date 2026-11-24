import React, { useState } from 'react';
import { CountyTalentStat } from '../types';
import { COUNTY_TALENT_STATS } from '../data/expandedData';
import {
  MapPin,
  Search,
  Building,
  GraduationCap,
  Users,
  TrendingUp,
  Award,
} from 'lucide-react';

export const NationalTalentIntelligence: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCounty, setSelectedCounty] = useState<CountyTalentStat>(COUNTY_TALENT_STATS[0]);

  const filtered = COUNTY_TALENT_STATS.filter(
    (c) =>
      c.countyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.countyCode.includes(searchQuery) ||
      c.topTradeSpecialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalRegisteredTalent = COUNTY_TALENT_STATS.reduce((acc, c) => acc + c.registeredTalentCount, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-emerald-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Devolved County Human Capital Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            National Talent Mapping Across 47 Counties
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time telemetry of certified Kenyan professionals, National Polytechnics, TVET centers of excellence, and regional export trades connecting grassroots artisans with global employers.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Counties Integrated</span>
            <span className="text-xl font-black text-white">47 / 47</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Mapped Workforce</span>
            <span className="text-xl font-black text-emerald-400">{totalRegisteredTalent.toLocaleString()}+</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Accredited TVET Hubs</span>
            <span className="text-xl font-black text-teal-400">280+ Centers</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Placement Accuracy</span>
            <span className="text-xl font-black text-amber-400">99.4%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: County Selector & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* County List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search county or trade (e.g. Eldoret, Welding)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1 pt-1">
            Counties Registry ({filtered.length})
          </span>

          {filtered.map((c) => (
            <div
              key={c.countyCode}
              onClick={() => setSelectedCounty(c)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedCounty.countyCode === c.countyCode
                  ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/30'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">#{c.countyCode}</span>
                  <h3 className="font-bold text-white text-sm">{c.countyName} County</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {c.registeredTalentCount.toLocaleString()} Verified Talent • {c.activeOverseasExportSharePercent}% Export Share
                </p>
              </div>
              <span className="text-xs font-black text-emerald-400">{c.activeOverseasExportSharePercent}%</span>
            </div>
          ))}
        </div>

        {/* Selected County Detail (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    County Code: {selectedCounty.countyCode}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Republic of Kenya
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1.5">{selectedCounty.countyName} County</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Integrated with National Integrated Population Registration System (IPRS) & County Public Service Board.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block font-bold">Registered Talent</span>
                <span className="text-lg font-black text-white">{selectedCounty.registeredTalentCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Top Trade Specialties */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Primary Regional Trade Specialties
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCounty.topTradeSpecialties.map((trade, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{trade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TVET Centers */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
                Accredited National Polytechnics & TVET Hubs
              </span>
              <div className="space-y-2">
                {selectedCounty.primaryTvetHubs.map((tvet, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                    <GraduationCap className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{tvet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
