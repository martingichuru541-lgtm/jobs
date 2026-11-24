import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  Building,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Stamp,
  BookOpen,
} from 'lucide-react';

interface GovernmentCoordinationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernmentCoordinationModal: React.FC<GovernmentCoordinationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'dci' | 'mfa' | 'labour' | 'wafid'>('dci');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Official Agency Workflows
              </span>
              <span className="text-xs text-slate-400">Integrated Government Tracking</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-0.5">
              Government Documentation & Medical Coordination
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 self-start sm:self-center"
          >
            ✕
          </button>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white font-bold">
              Mandatory Legal Authority Statement:
            </strong>
            <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
              KenyaOne coordinates, checks completeness, tracks application references, and stores genuine certificates securely. KenyaOne does NOT issue police clearance certificates, government authentications, work permits, or Labour attestations. These statutory functions remain the sole responsibility of the relevant state authorities (DCI, MFA, Ministry of Labour, and Destination Embassies).
            </p>
          </div>
        </div>

        {/* Coordination Service Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'dci', label: 'DCI Police Clearance', icon: ShieldCheck },
            { id: 'mfa', label: 'Ministry of Foreign Affairs (MFA)', icon: Stamp },
            { id: 'labour', label: 'Ministry of Labour (Attestation)', icon: Building },
            { id: 'wafid', label: 'GCC Wafid Medicals', icon: HeartPulse },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: DCI Police Clearance */}
        {activeTab === 'dci' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Directorate of Criminal Investigations (DCI) eCitizen Clearance
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400">
                Official eCitizen Portal
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              All international deployments require a clean, valid Police Clearance Certificate (Certificate of Good Conduct) issued through the official eCitizen government portal.
            </p>

            <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Official Step-by-Step Guidance
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11.5px]">
                <li>Log in to your genuine personal account on <strong>ecitizen.go.ke</strong>.</li>
                <li>Navigate to Directorate of Criminal Investigations (DCI) department.</li>
                <li>Select "Police Clearance Certificate", choose biometric capture center (DCI HQ Mazingira or Huduma Centre).</li>
                <li>Pay the statutory fee (KES 1,050) via M-PESA Paybill directly to the Government of Kenya.</li>
                <li>Download your C24 fingerprint form and invoice.</li>
                <li>Attend biometric capture and retrieve genuine QR-verifiable certificate.</li>
              </ol>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Candidate Tracking Reference</span>
                <strong className="text-emerald-400 text-xs">EC-DCI-9941824 — Status: Verified on File</strong>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Authentic Certificate Stored
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Ministry of Foreign Affairs */}
        {activeTab === 'mfa' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Ministry of Foreign & Diaspora Affairs (MFA) Authentication
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400">
                Legalization Directorate
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Foreign governments, ministries of health, and overseas embassies require academic certificates and police records to be authenticated by the Kenyan Ministry of Foreign Affairs before visa issuance.
            </p>

            <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Authentication Protocol & Requirements
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11.5px]">
                <li>Original academic degree/diploma must be verified by the issuing institution.</li>
                <li>Original transcripts and police clearance certificate presented.</li>
                <li>MFA Legalization Officer verifies seals and affixes the official red ribbon stamp.</li>
                <li>KenyaOne Documentation Centre assists with authorized courier drop-off and status tracking.</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">MFA Legalization Docket</span>
                <strong className="text-emerald-400 text-xs">MFA-KE-LEGAL-7721 — Status: Legalized</strong>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Seal & Red Ribbon Verified
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Ministry of Labour Attestation */}
        {activeTab === 'labour' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Ministry of Labour Foreign Contract Attestation (NEA)
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300">
                National Employment Authority
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Under Kenyan labour statutes, all citizens deploying for overseas employment must have their foreign employment contracts scrutinized and formally attested by the Ministry of Labour to prevent exploitation, contract substitution, and wage theft.
            </p>

            <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Mandatory Statutory Checks Completed by Labour Officers
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11.5px]">
                <li>Salary matches or exceeds destination national minimum wage for expatriates.</li>
                <li>Comprehensive medical and health insurance explicitly funded by employer.</li>
                <li>Return flight tickets guaranteed at completion of contract tenure.</li>
                <li>No recruitment fees deducted from salary (Zero Placement Fee compliance).</li>
                <li>Accredited licensed Kenyan recruitment agency reference validated.</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Labour Attestation Seal Reference</span>
                <strong className="text-emerald-400 text-xs">NEA-ATTEST-2026-081 — Status: Approved & Stamped</strong>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Government Attestation Complete
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: GCC Wafid Medical Coordination */}
        {activeTab === 'wafid' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                GCC Health Council (Wafid / GAMCA) Medical Examination
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400">
                Accredited Clinics Only
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              For job opportunities in Qatar, UAE, Saudi Arabia, Kuwait, Bahrain, and Oman, candidates must complete standard medical fitness screening at GCC-accredited Wafid clinics in Kenya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card rounded-xl p-3.5 border border-slate-800 space-y-1">
                <strong className="text-white block">Doctors Plaza Wafid Centre</strong>
                <p className="text-slate-400 text-[11px]">3rd Parklands Avenue, Nairobi</p>
                <span className="text-emerald-400 text-[10px] font-semibold">GAMCA Code: NBO-014 (Verified)</span>
              </div>

              <div className="glass-card rounded-xl p-3.5 border border-slate-800 space-y-1">
                <strong className="text-white block">Aga Khan Diagnostic Wafid Partner</strong>
                <p className="text-slate-400 text-[11px]">Upper Hill Medical Centre, Nairobi</p>
                <span className="text-emerald-400 text-[10px] font-semibold">GAMCA Code: NBO-022 (Verified)</span>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Wafid Online Slip Reference</span>
                <strong className="text-emerald-400 text-xs">WFD-FIT-NBO-0442 — Status: FIT FOR EMPLOYMENT</strong>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Medical Clearance Passed
              </span>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Close Coordinator
          </button>
        </div>
      </div>
    </div>
  );
};
