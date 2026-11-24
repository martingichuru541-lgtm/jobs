import React, { useState } from 'react';
import { FreelancerServiceProfile } from '../types';
import { FREELANCE_SERVICES } from '../data/expandedData';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Star,
  MapPin,
  Send,
  ShieldCheck,
  Briefcase,
  Clock,
} from 'lucide-react';

export const ServicesMarketplace: React.FC = () => {
  const [freelancers] = useState<FreelancerServiceProfile[]>(FREELANCE_SERVICES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeHireProfile, setActiveHireProfile] = useState<FreelancerServiceProfile | null>(null);
  const [quoteMessage, setQuoteMessage] = useState<string>('');
  const [quoteSent, setQuoteSent] = useState<boolean>(false);

  const categories = [
    'All',
    'Electrical & Renewable Energy',
    'Software & Technology',
    'Mechanical & Automotive',
    'Translation & Documentation',
    'Welding & Fabrication',
    'Career & HR Consulting',
  ];

  const filtered = freelancers.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSendQuoteRequest = () => {
    if (!quoteMessage.trim()) return;
    setQuoteSent(true);
    setTimeout(() => {
      setQuoteSent(false);
      setActiveHireProfile(null);
      setQuoteMessage('');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-emerald-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>National Verified Freelance & Artisan Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kenya’s Professional Services & Skilled Artisans Marketplace
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Hire background-checked solar technicians, bilingual medical translators, M-PESA software engineers, and master mechanics across all 47 counties. Direct contracts with milestone-based settlement.
          </p>
        </div>

        {/* Filter / Search */}
        <div className="flex flex-col md:flex-row gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by specialty, skill, or county (e.g. Solar, Welder, Mombasa, Nairobi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Freelancers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((freelancer) => (
          <div
            key={freelancer.id}
            className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{freelancer.rating}</span>
                  <span className="text-slate-400 font-normal">({freelancer.reviewsCount} reviews)</span>
                </div>
                {freelancer.verifiedBadge && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> NITA / Council Verified
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-black text-white text-base leading-snug">{freelancer.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">{freelancer.title}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{freelancer.county}</span>
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {freelancer.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {freelancer.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Rate & Hire */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Standard Rate</span>
                <span className="text-sm font-black text-white">KES {freelancer.hourlyRateKES.toLocaleString()} / hr</span>
              </div>
              <button
                onClick={() => setActiveHireProfile(freelancer)}
                className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md cursor-pointer transition-all"
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Request Modal */}
      {activeHireProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Milestone-Protected Engagement
                </span>
                <h3 className="text-lg font-black text-white mt-1">Request Quote: {activeHireProfile.name}</h3>
                <p className="text-xs text-slate-400">{activeHireProfile.title}</p>
              </div>
              <button
                onClick={() => setActiveHireProfile(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {quoteSent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Engagement Request Transmitted!</h4>
                <p className="text-xs text-slate-300">
                  {activeHireProfile.name} has received your brief and will respond within 4 business hours via verified channel.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Standard Hourly Benchmark:</span>
                  <span className="font-black text-emerald-400 text-sm">KES {activeHireProfile.hourlyRateKES.toLocaleString()} / hour</span>
                  <span className="text-slate-400 block text-[11px]">Funds remain in milestone custody until you sign off completion.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">Scope of Work / Deliverables Required:</label>
                  <textarea
                    rows={4}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    placeholder="Describe your project requirement, site location (county), timeline, and required certifications..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveHireProfile(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendQuoteRequest}
                    disabled={!quoteMessage.trim()}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                  >
                    Send Work Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
