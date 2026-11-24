import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Globe2,
  Users,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

export const CareersAnalytics: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleExportTelemetry = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const corridorMetrics = [
    { country: 'Qatar 🇶🇦', count: 3420, percent: 34, growth: '+18%' },
    { country: 'United Arab Emirates 🇦🇪', count: 2890, percent: 29, growth: '+22%' },
    { country: 'Saudi Arabia 🇸🇦', count: 1850, percent: 18, growth: '+40%' },
    { country: 'United Kingdom 🇬🇧', count: 1120, percent: 11, growth: '+14%' },
    { country: 'Germany 🇩🇪', count: 480, percent: 5, growth: '+65%' },
    { country: 'Others (Canada, Australia, Kuwait)', count: 310, percent: 3, growth: '+12%' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Executive Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-teal-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-teal-950/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>National Employment Intelligence & Governance Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Careers & Labour Mobility Analytics
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consolidated operational intelligence across 47 Kenyan counties and 18 international bilateral corridors. Monitoring compliance with the NEA Act, bilateral MOUs, and worker protection protocols.
            </p>
          </div>

          <button
            onClick={handleExportTelemetry}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Dossier Downloaded!' : 'Export Telemetry Report'}</span>
          </button>
        </div>

        {/* Big KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Talent Pool</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">412,850</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +14.2%
              </span>
            </div>
            <span className="text-[11px] text-slate-400">100% eCitizen biometrically matched</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Successful Deployments</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-teal-400">10,070</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +28.5%
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Across 18 sovereign corridors</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Zero-Fee Compliance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">100.0%</span>
              <span className="text-xs font-bold text-slate-400">Zero tolerance</span>
            </div>
            <span className="text-[11px] text-slate-400">Zero jobseeker recruitment fees</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">NEA Licensed Agencies</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">482</span>
              <span className="text-xs font-bold text-slate-400">Audited</span>
            </div>
            <span className="text-[11px] text-slate-400">38 rogue brokers deregistered</span>
          </div>
        </div>
      </div>

      {/* Corridor Breakdown & Statutory Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Corridor Breakdown (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Bilateral Deployment Distribution
              </span>
              <h3 className="text-base font-black text-white mt-0.5">
                Top Overseas Corridors (Last 12 Months)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">10,070 Deployments</span>
          </div>

          <div className="space-y-4">
            {corridorMetrics.map((corridor, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{corridor.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-mono">{corridor.count.toLocaleString()} workers</span>
                    <span className="text-emerald-400 font-bold">{corridor.growth}</span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                    style={{ width: `${corridor.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Compliance Gauges (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Regulatory Integrity
            </span>
            <h3 className="text-base font-black text-white mt-0.5">
              Statutory Attestation Rates
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-200">DCI Police Clearance Barcode Rate</span>
                <span className="text-emerald-400">99.8%</span>
              </div>
              <p className="text-[11px] text-slate-400">Authenticated directly against Directorate of Criminal Investigations database.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-200">Wafid / GAMCA Fit-to-Work Clearance</span>
                <span className="text-emerald-400">99.2%</span>
              </div>
              <p className="text-[11px] text-slate-400">All GCC bound workers cleared via accredited medical facilities in Nairobi & Mombasa.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-200">National Employment Authority Attestation</span>
                <span className="text-emerald-400">100.0%</span>
              </div>
              <p className="text-[11px] text-slate-400">Zero workers deployed without registered employment contracts under Kenyan law.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
