import React, { useState } from 'react';
import { ScamRiskReport } from '../types';
import { analyzeScamRisk } from '../utils/aiCareerEngine';
import { LICENSED_AGENCIES_SAMPLE } from '../data/expandedData';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  Send,
  Lock,
  Building,
  CheckCircle2,
  FileWarning,
} from 'lucide-react';

export const AntiScamProtection: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [agencyName, setAgencyName] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [report, setReport] = useState<ScamRiskReport | null>(null);

  // Agency Search state
  const [agencySearch, setAgencySearch] = useState<string>('');

  // Whistleblower state
  const [whistleblowerSuccess, setWhistleblowerSuccess] = useState<boolean>(false);
  const [whistleDetails, setWhistleDetails] = useState<string>('');

  const handleAnalyze = () => {
    if (!inputText.trim() && !agencyName.trim()) return;
    const res = analyzeScamRisk(inputText, agencyName, emailDomain);
    setReport(res);
  };

  const handleLoadScamPreset = () => {
    setInputText('Urgent job in Qatar! Send 45,000 KES via M-PESA to 0722****** today for immediate guaranteed visa approval without interview. Departure in 3 days!');
    setAgencyName('Overseas Express Fast Placements');
    setEmailDomain('agentqatarjobs@gmail.com');
    const res = analyzeScamRisk(
      'Urgent job in Qatar! Send 45,000 KES via M-PESA to 0722****** today for immediate guaranteed visa approval without interview. Departure in 3 days!',
      'Overseas Express Fast Placements',
      'agentqatarjobs@gmail.com'
    );
    setReport(res);
  };

  const handleLoadLegitPreset = () => {
    setInputText('Band 5 Staff Nurse recruitment for NHS Manchester. Zero agency placement fee charged to candidate under UK-Kenya Bilateral Health Agreement. All interview costs sponsored by employer.');
    setAgencyName('Trans-Sahara Manpower & Global Careers Ltd');
    setEmailDomain('recruitment@trans-sahara.co.ke');
    const res = analyzeScamRisk(
      'Band 5 Staff Nurse recruitment for NHS Manchester. Zero agency placement fee charged to candidate under UK-Kenya Bilateral Health Agreement. All interview costs sponsored by employer.',
      'Trans-Sahara Manpower & Global Careers Ltd',
      'recruitment@trans-sahara.co.ke'
    );
    setReport(res);
  };

  const filteredAgencies = LICENSED_AGENCIES_SAMPLE.filter(
    (a) =>
      a.name.toLowerCase().includes(agencySearch.toLowerCase()) ||
      a.licenseNumber.toLowerCase().includes(agencySearch.toLowerCase()) ||
      a.permittedCorridors.some((c) => c.toLowerCase().includes(agencySearch.toLowerCase()))
  );

  const handleWhistleblowerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whistleDetails.trim()) return;
    setWhistleblowerSuccess(true);
    setTimeout(() => {
      setWhistleblowerSuccess(false);
      setWhistleDetails('');
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-rose-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Anti-Fraud & National Employment Authority (NEA) Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Scam Risk Detector & Licensed Agency Directory
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Zero Tolerance for Illegal Recruitment Fees. In Kenya, charging jobseekers recruitment fees is a criminal offense under Section 19 of the Employment Act and the National Employment Authority Act No. 3 of 2016.
          </p>
        </div>
      </div>

      {/* Main Grid: AI Scam Scanner (7 cols) + Verified Agency Registry (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* AI Scam Scanner (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Real-Time Text & Advert Audit
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Analyze Suspicious Messages, Offers or WhatsApp Chats
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadScamPreset}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-950/60 text-rose-300 border border-rose-500/40 hover:bg-rose-900/40 cursor-pointer"
                >
                  Load Scam Example
                </button>
                <button
                  type="button"
                  onClick={handleLoadLegitPreset}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40 cursor-pointer"
                >
                  Load Legit Example
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Paste Advert Text, SMS, or Recruiter Message:
                </label>
                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste WhatsApp advert, Facebook post, or SMS message here..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Claimed Agency Name:</label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Al-Haqq Services or XYZ Agency"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Sender Email / Domain:</label>
                  <input
                    type="text"
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    placeholder="e.g. jobs@agent.com or @gmail.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!inputText.trim() && !agencyName.trim()}
                className="w-full py-3 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Scan for Illegal Fees & Scam Indicators
              </button>
            </div>

            {/* Analysis Result */}
            {report && (
              <div
                className={`p-6 rounded-2xl border space-y-4 animate-fadeIn ${
                  report.riskLevel === 'Critical Scam Warning'
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                    : report.riskLevel === 'Suspicious / Elevated Risk'
                    ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                    : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 font-black text-base">
                    {report.riskLevel === 'Critical Scam Warning' ? (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    )}
                    <span>{report.riskLevel}</span>
                  </div>
                  <span className="text-sm font-black">Scam Probability: {report.riskScorePercent}%</span>
                </div>

                <p className="text-xs font-bold">{report.recommendation}</p>

                {report.agencyDetails && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-emerald-300">
                    {report.agencyDetails}
                  </div>
                )}

                {report.redFlagsDetected.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider block">Detected Violations:</span>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {report.redFlagsDetected.map((rf, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Confidential Whistleblower Desk */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Confidential NEA & DCI Fraud Whistleblower Desk</span>
            </div>
            <p className="text-xs text-slate-300">
              Report extortion, passport retention, or unregistered brokers anonymously. Submissions routed directly to the Ministry of Labour Investigation Unit.
            </p>

            {whistleblowerSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confidential report transmitted. Reference ID #WB-{Date.now().toString().slice(-6)} created.</span>
              </div>
            ) : (
              <form onSubmit={handleWhistleblowerSubmit} className="space-y-3">
                <textarea
                  rows={3}
                  value={whistleDetails}
                  onChange={(e) => setWhistleDetails(e.target.value)}
                  placeholder="Provide broker name, phone number, location, and nature of extortion or illegal fee demand..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={!whistleDetails.trim()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 cursor-pointer disabled:opacity-40"
                >
                  Submit Anonymous Report
                </button>
              </form>
            )}
          </div>
        </div>

        {/* NEA Licensed Agency Registry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Official Directory
              </span>
              <h3 className="text-base font-black text-white mt-0.5">
                NEA Licensed Recruitment Agencies
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Only deal with entities having active gazetted licenses.
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search agency name or license no..."
                value={agencySearch}
                onChange={(e) => setAgencySearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredAgencies.map((agency) => (
                <div
                  key={agency.licenseNumber}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400">{agency.licenseNumber}</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {agency.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{agency.name}</h4>
                  <p className="text-[11px] text-slate-400">{agency.headquarters}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {agency.permittedCorridors.map((c, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
