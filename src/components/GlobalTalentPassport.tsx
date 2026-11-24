import React, { useState } from 'react';
import { TalentPassport } from '../types';
import { INITIAL_TALENT_PASSPORT } from '../data/expandedData';
import {
  ShieldCheck,
  QrCode,
  Lock,
  Eye,
  EyeOff,
  Printer,
  Download,
  Share2,
  CheckCircle,
  Award,
  Fingerprint,
  Activity,
  FileCheck,
} from 'lucide-react';

export const GlobalTalentPassport: React.FC = () => {
  const [passport, setPassport] = useState<TalentPassport>(INITIAL_TALENT_PASSPORT);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const togglePrivacySetting = (key: keyof TalentPassport['privacySettings']) => {
    setPassport((prev) => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [key]: !prev.privacySettings[key],
      },
    }));
  };

  const handleCopyVerificationLink = () => {
    navigator.clipboard.writeText(passport.qrVerificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Fingerprint':
        return <Fingerprint className="w-5 h-5 text-teal-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-emerald-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Republic of Kenya • National Digital Credentials Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            KenyaOne Global Talent Passport
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            One tamper-evident, globally recognized career passport. Authenticated with eCitizen biometric identity, DCI good conduct, professional council licenses, Wafid GCC medicals, and NEA labour attestation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 text-slate-950 flex items-center gap-2 hover:bg-emerald-400 transition-all cursor-pointer shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>Show QR Verification Seal</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-2 hover:bg-slate-750 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Passport Dossier</span>
          </button>
          <button
            onClick={handleCopyVerificationLink}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-2 hover:bg-slate-750 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? 'Link Copied!' : 'Copy Verification URL'}</span>
          </button>
        </div>
      </div>

      {/* Holographic Passport Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Holographic Card Visual (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/60 overflow-hidden text-slate-100">
            {/* Holographic Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/5 to-amber-500/10 pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center font-black text-xs text-emerald-400">
                    K1
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase text-white">
                    KENYAONE TALENT PASSPORT
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-semibold tracking-wider">
                    NATIONAL EMPLOYMENT AUTHORITY • CERTIFIED DOSSIER
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">DOCKET NO.</span>
                <span className="text-xs font-mono font-bold text-amber-400">{passport.passportNumber}</span>
              </div>
            </div>

            {/* Holder Identity Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 relative z-10">
              <div className="sm:col-span-2 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Holder Name (Jina Kamili)
                  </span>
                  <h2 className="text-xl font-black text-white">{passport.holderName}</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">National ID / Passport</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {passport.privacySettings.maskCivilIdNumber ? passport.nationalIdMasked : passport.civilIdFull}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Nationality</span>
                    <span className="font-semibold text-white">{passport.nationality} 🇰🇪</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">County of Origin</span>
                    <span className="font-semibold text-white">{passport.residenceCounty}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Experience</span>
                    <span className="font-semibold text-emerald-400">{passport.totalExperienceYears} Years Verified</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Certified Specialty</span>
                  <span className="text-xs font-bold text-slate-200">{passport.profileTitle}</span>
                </div>
              </div>

              {/* Digital Hologram Stamp & QR preview */}
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-2">
                <div
                  onClick={() => setShowQrModal(true)}
                  className="w-24 h-24 bg-white p-1.5 rounded-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <svg className="w-full h-full text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h2v4h-2v-4zm-4-4h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-4 2h2v4h-2v-4zm2 2h2v2h-2v-2z" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Scan to Verify
                </span>
                <span className="text-[9px] text-slate-400">Valid thru {passport.expiryDate}</span>
              </div>
            </div>

            {/* Card Footer Security Line */}
            <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{passport.verificationLevel}</span>
              </span>
              <span className="font-mono">KENYA &bull; NEA &bull; IPRS &bull; DCI</span>
            </div>
          </div>
        </div>

        {/* Privacy & Recruiter Access Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Jobseeker Privacy & Anonymity Toggles</span>
            </div>
            <p className="text-xs text-slate-300">
              Control what verified recruiters and international agencies can see prior to formal shortlisting and signed interview offers.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <span className="text-xs font-bold text-white block">Mask Civil ID / Passport Number</span>
                  <span className="text-[11px] text-slate-400">Reveals only 2987**** until contract drafting</span>
                </div>
                <button
                  onClick={() => togglePrivacySetting('maskCivilIdNumber')}
                  className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passport.privacySettings.maskCivilIdNumber
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {passport.privacySettings.maskCivilIdNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <span className="text-xs font-bold text-white block">Hide Direct Contact Info</span>
                  <span className="text-[11px] text-slate-400">Phone and personal email shielded until shortlisted</span>
                </div>
                <button
                  onClick={() => togglePrivacySetting('maskContactUntilShortlisted')}
                  className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passport.privacySettings.maskContactUntilShortlisted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {passport.privacySettings.maskContactUntilShortlisted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-0.5 pr-2">
                  <span className="text-xs font-bold text-white block">NEA Licensed Agencies Only</span>
                  <span className="text-[11px] text-slate-400">Block unauthorized headhunters and unverified brokers</span>
                </div>
                <button
                  onClick={() => togglePrivacySetting('allowOverseasLicensedAgenciesOnly')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    passport.privacySettings.allowOverseasLicensedAgenciesOnly
                      ? 'bg-emerald-500 text-slate-950 font-extrabold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {passport.privacySettings.allowOverseasLicensedAgenciesOnly ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Verified Credential Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Government & Regulatory Attestations
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              5 Primary Source Verified Badges
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">100% Attested & Tamper-Evident</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {passport.verifiedBadges.map((badge) => (
            <div
              key={badge.id}
              className="glass-panel rounded-2xl p-5 border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {getBadgeIcon(badge.iconName)}
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  {badge.badgeStatus}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{badge.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{badge.issuingAuthority}</p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2">
                {badge.description}
              </p>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Verified: {badge.verificationDate}</span>
                <span className="text-emerald-400 font-semibold">Authentic</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full rounded-3xl p-6 border border-emerald-500/40 text-center space-y-4 animate-scaleUp">
            <h3 className="text-base font-black text-white">KenyaOne Digital Verification QR</h3>
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-xl">
              <svg className="w-full h-full text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h2v4h-2v-4zm-4-4h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-4 2h2v4h-2v-4zm2 2h2v2h-2v-2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-300">
              Scannable by airline check-in staff, embassy visa officers, and GCC hospital directors.
            </p>
            <span className="text-xs font-mono font-bold text-emerald-400 block break-all">
              {passport.qrVerificationUrl}
            </span>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 cursor-pointer"
            >
              Close Verification Seal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
