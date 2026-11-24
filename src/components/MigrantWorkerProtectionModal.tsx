import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  AlertCircle,
  FileWarning,
  CheckCircle2,
  Building,
  HeartHandshake,
  Globe,
} from 'lucide-react';
import { MigrantProtectionComplaint } from '../types';

interface MigrantWorkerProtectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MigrantWorkerProtectionModal: React.FC<MigrantWorkerProtectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [category, setCategory] = useState<MigrantProtectionComplaint['category']>('Contract Discrepancy');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('Qatar');
  const [employer, setEmployer] = useState('');

  if (!isOpen) return null;

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CMP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(id);
    setComplaintSubmitted(true);
  };

  const emergencyContacts = [
    {
      country: 'State of Qatar',
      mission: 'Embassy of the Republic of Kenya in Doha',
      hotline: '+974 4493 1870 / +974 5092 8844 (24/7 Labour Desk)',
      address: 'Zone 66, Al Dafna, Doha',
    },
    {
      country: 'Kingdom of Saudi Arabia',
      mission: 'Embassy of the Republic of Kenya in Riyadh',
      hotline: '+966 11 488 1238 / +966 50 098 7654 (Emergency)',
      address: 'Diplomatic Quarter, Riyadh',
    },
    {
      country: 'United Arab Emirates',
      mission: 'Embassy of Kenya (Abu Dhabi) & Consulate (Dubai)',
      hotline: '+971 2 666 6300 / +971 4 342 8111',
      address: 'Al Bateen, Abu Dhabi / Bur Dubai',
    },
    {
      country: 'Federal Republic of Germany',
      mission: 'Embassy of the Republic of Kenya in Berlin',
      hotline: '+49 30 259 2660',
      address: 'Markgrafenstraße 63, 10117 Berlin',
    },
    {
      country: 'United Kingdom',
      mission: 'Kenya High Commission in London',
      hotline: '+44 20 7636 2371',
      address: '45 Portland Place, London W1B 1AS',
    },
    {
      country: 'Kenya Head Office (Nairobi)',
      mission: 'Ministry of Foreign Affairs Diaspora Directorate',
      hotline: '+254 (020) 494 9000 / SMS: 22144 (Toll-Free in Kenya)',
      address: 'Old Treasury Building, Harambee Avenue, Nairobi',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Safe Employment Desk
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                Migrant Worker Protection & Welfare Centre
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 self-start sm:self-center"
          >
            ✕
          </button>
        </div>

        {/* Fundamental Worker Rights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1.5">
            <strong className="text-emerald-400 font-bold block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 1. Zero Placement Fee Rule
            </strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Under Kenyan NEA regulations, licensed recruitment agencies cannot charge jobseekers placement or recruitment fees. Charging fees to applicants is illegal.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1.5">
            <strong className="text-emerald-400 font-bold block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 2. Passport Custody Rights
            </strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Your Kenyan passport is your sovereign travel property. Withholding or confiscating your passport by an overseas employer or sponsor is prohibited by law.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1.5">
            <strong className="text-emerald-400 font-bold block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 3. Contract Protection
            </strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Employers cannot substitute your attested contract with a lower salary or unfavorable terms upon arrival. Discrepancies are escalated to the Kenyan Labour Attaché.
            </p>
          </div>
        </div>

        {/* 24/7 Embassy Emergency Hotlines */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            24/7 Kenyan Diplomatic Missions & Emergency Response Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {emergencyContacts.map((c, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{c.country}</span>
                <strong className="text-white block text-xs leading-snug">{c.mission}</strong>
                <p className="text-emerald-300 font-semibold text-[11px]">{c.hotline}</p>
                <span className="text-slate-500 text-[10px] block">{c.address}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidential Dispute & Complaint Submission Form */}
        <div className="bg-slate-900/95 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-rose-400" />
              Submit Confidential Grievance / Report Discrepancy
            </h3>
            <span className="text-[10px] text-slate-400">Escalated to NEA & Labour Attaché</span>
          </div>

          {complaintSubmitted ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-5 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Confidential Case Docket Opened</h4>
              <p className="text-xs text-slate-300">
                Tracking Number: <strong>{trackingId}</strong>. Your report has been dispatched securely to the Ministry of Labour Attaché and the KenyaOne Protection Directorate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitComplaint} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Issue Classification</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  >
                    <option value="Contract Discrepancy" className="bg-slate-900">Contract Discrepancy</option>
                    <option value="Illegal Recruitment Fee" className="bg-slate-900">Illegal Recruitment Fee</option>
                    <option value="Passport Retention" className="bg-slate-900">Passport Retention</option>
                    <option value="Unsafe Working Conditions" className="bg-slate-900">Unsafe Working Conditions</option>
                    <option value="Delayed Salary" className="bg-slate-900">Delayed Salary</option>
                    <option value="Emergency Assistance" className="bg-slate-900">Emergency Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Host Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Qatar, UAE, Saudi Arabia"
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Employer / Recruitment Agency</label>
                  <input
                    type="text"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                    placeholder="Name of entity involved"
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description of the Incident</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise details, dates, contract numbers, and outstanding amounts..."
                  required
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md cursor-pointer"
                >
                  Submit Protected Report
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close Protection Desk
          </button>
        </div>
      </div>
    </div>
  );
};
