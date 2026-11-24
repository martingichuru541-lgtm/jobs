import React from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calendar,
  Package,
  ArrowRight,
  Download,
  Building,
  HeartPulse,
  Award,
} from 'lucide-react';
import { JobseekerProfile, ApplicationRecord, DeparturePack } from '../types';

interface ApplicantDashboardProps {
  profile: JobseekerProfile;
  application: ApplicationRecord;
  departurePack: DeparturePack;
  onOpenCVBuilder: () => void;
  onOpenJourney: () => void;
  onOpenDeparturePack: () => void;
  onOpenAppointmentLetter: () => void;
  onOpenNairobiCentre: () => void;
}

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({
  profile,
  application,
  departurePack,
  onOpenCVBuilder,
  onOpenJourney,
  onOpenDeparturePack,
  onOpenAppointmentLetter,
  onOpenNairobiCentre,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Profile Overview Card with Verification Badges */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-lg shadow-emerald-950/40 flex-shrink-0">
              <img
                src={profile.profilePhotoUrl}
                alt={profile.fullName}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {profile.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {profile.title} • {profile.county}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-1">
                <span>{profile.idType}: <strong>{profile.nationalIdOrPassport}</strong></span>
                <span>• Phone: <strong>{profile.phone}</strong></span>
                <span>• Email: <strong>{profile.email}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCVBuilder}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" /> Edit ATS CV
            </button>
            <button
              onClick={onOpenNairobiCentre}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <Building className="w-4 h-4 text-emerald-400" /> Book Centre Visit
            </button>
          </div>
        </div>

        {/* 5-Point Verification Status Ribbon */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">National ID / Passport</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> IPRS Verified
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Mobile & Email OTP</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">DCI Police Clearance</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Certificate Clean
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Wafid GCC Medical</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fit to Work
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 block">Labour Attestation</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> NEA Stamped
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Application & Travel Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Application Journey Card */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                Active Overseas Recruitment
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">
                {application.jobTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {application.employer} ({application.country}) • Submitted on {application.submittedDate}
              </p>
            </div>
            <button
              onClick={onOpenJourney}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/40 flex items-center gap-1 transition-all"
            >
              23-Stage Tracker <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Progress Indicator */}
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Stage 16: Work Permit & Entry Visa</span>
              <span className="text-emerald-400">65% Overall Completion</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[65%]" />
            </div>
            <p className="text-[11px] text-slate-400 pt-0.5">
              Current Entity: <strong>Host Country Immigration & Destination Embassy</strong>
            </p>
          </div>

          {/* Interview Details Card */}
          {application.interviewDetails && (
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Confirmed Interview Appointment
                </span>
                <strong className="text-xs text-white block">
                  {application.interviewDetails.date} at {application.interviewDetails.time} ({application.interviewDetails.timeZone})
                </strong>
                <p className="text-[11px] text-slate-400">
                  Venue: {application.interviewDetails.locationOrLink}
                </p>
              </div>
              <button
                onClick={onOpenAppointmentLetter}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                View Appointment Letter
              </button>
            </div>
          )}
        </div>

        {/* Right: Signature Departure Pack Ready Card */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-amber-500/30 space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Departure Pack
              </h3>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Ready for Collection
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Your physical and authenticated digital travel docket is sealed and ready for inspection at the Nairobi Documentation Centre.
          </p>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Reference:</span>
              <strong className="text-amber-400 font-mono">{departurePack.referenceNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Flight:</span>
              <strong className="text-white">{departurePack.flightNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Departure:</span>
              <strong className="text-emerald-400">{departurePack.departureDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Contents:</span>
              <span className="text-slate-200 font-semibold">8 of 8 Attested Documents</span>
            </div>
          </div>

          <button
            onClick={onOpenDeparturePack}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/40 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            Inspect & Sign Departure Pack
          </button>
        </div>
      </div>
    </div>
  );
};
