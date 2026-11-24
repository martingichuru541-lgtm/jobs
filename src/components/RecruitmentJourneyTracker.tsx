import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Building,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Package,
  Calendar,
  Lock,
} from 'lucide-react';
import { JourneyStage, ApplicationRecord } from '../types';
import { getJourneyProgress } from '../utils/rules';

interface RecruitmentJourneyTrackerProps {
  application: ApplicationRecord;
  onOpenDeparturePack?: () => void;
  onOpenAppointmentLetter?: () => void;
}

export const RecruitmentJourneyTracker: React.FC<RecruitmentJourneyTrackerProps> = ({
  application,
  onOpenDeparturePack,
  onOpenAppointmentLetter,
}) => {
  const [selectedStepNumber, setSelectedStepNumber] = useState<number>(
    application.stages.find((s) => s.status === 'in_progress' || s.status === 'action_required')?.stepNumber || 16
  );

  const { completedCount, totalStages, percentage, currentActiveStage } = getJourneyProgress(
    application.stages
  );

  const activeStage = application.stages.find((s) => s.stepNumber === selectedStepNumber) || application.stages[0];

  const getStatusBadge = (status: JourneyStage['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Stage Verified & Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 animate-spin" /> In Progress
          </span>
        );
      case 'action_required':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Action Required by Candidate
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Locked / Pending Preceding Steps
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Overview Banner: Parcel Tracking Style */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-emerald-500/20 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Application Tracking ID: {application.id}
              </span>
              <span className="text-xs text-slate-400">
                Submitted on {application.submittedDate}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {application.jobTitle}
            </h1>
            <p className="text-sm text-slate-300 mt-0.5">
              Employer: <span className="text-white font-semibold">{application.employer}</span> ({application.country})
            </p>
          </div>

          {/* Overall Percentage Progress */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-300">Recruitment Milestones</span>
              <span className="text-emerald-400 text-sm font-extrabold">{percentage}% Completed</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
              <span>{completedCount} of {totalStages} Verified Stages</span>
              <span className="text-slate-300 font-medium">Stage {currentActiveStage?.stepNumber || 16} Active</span>
            </div>
          </div>
        </div>

        {/* Quick Context Action Pills */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5">
          {application.hasInterview && onOpenAppointmentLetter && (
            <button
              onClick={onOpenAppointmentLetter}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              View Interview Appointment Letter (QR Verified)
            </button>
          )}

          {application.hasDeparturePack && onOpenDeparturePack && (
            <button
              onClick={onOpenDeparturePack}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              Departure Pack Ready (Ref: KP-2026-DOH-8821)
            </button>
          )}

          <div className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strict Verification Policy: No stage marked completed without authenticated agency confirmation</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 23-Stage Interactive Timeline + Stage Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 23 Stages Scrollable List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[740px] overflow-y-auto pr-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            The 23 Sequential Recruitment Stages
          </div>

          {application.stages.map((stg) => {
            const isSelected = selectedStepNumber === stg.stepNumber;
            const isDone = stg.status === 'completed';
            const isInProgress = stg.status === 'in_progress';
            const isAction = stg.status === 'action_required';

            return (
              <div
                key={stg.stepNumber}
                onClick={() => setSelectedStepNumber(stg.stepNumber)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg'
                    : 'glass-card border-slate-800/60 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Step Number Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isInProgress
                        ? 'bg-blue-600 text-white animate-pulse'
                        : isAction
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isDone ? '✓' : stg.stepNumber}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isSelected ? 'text-emerald-300' : 'text-slate-200'
                      }`}
                    >
                      {stg.stepNumber}. {stg.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{stg.responsibleOrg}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {stg.dateCompleted && (
                    <span className="text-[10px] text-slate-500">{stg.dateCompleted}</span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-emerald-400 translate-x-0.5' : 'text-slate-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Stage Inspector Card */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6 sticky top-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  Stage {activeStage.stepNumber} of 23
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  {activeStage.title}
                </h2>
              </div>
              <div>{getStatusBadge(activeStage.status)}</div>
            </div>

            <div className="text-sm text-slate-300 leading-relaxed">
              {activeStage.description}
            </div>

            {/* Verification Metadata Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Responsible Entity / Authority
                </span>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  {activeStage.responsibleOrg}
                </span>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Verification Status
                </span>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {activeStage.verifiedBy || 'Pending Official Authentication'}
                </span>
              </div>
            </div>

            {/* Mandatory Required Documents */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Required Documents for this Stage
              </h3>
              <div className="space-y-1.5">
                {activeStage.requiredDocuments.length > 0 ? (
                  activeStage.requiredDocuments.map((docItem, idx) => (
                    <div
                      key={idx}
                      className="glass-card px-3.5 py-2 rounded-xl text-xs text-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            activeStage.status === 'completed'
                              ? 'text-emerald-400'
                              : 'text-slate-500'
                          }`}
                        />
                        <span>{docItem}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {activeStage.status === 'completed' ? 'Verified on File' : 'Required'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No external documents required.</p>
                )}
              </div>
            </div>

            {/* Outstanding Actions */}
            {activeStage.outstandingActions.length > 0 && (
              <div className="space-y-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h3 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> Outstanding Actions
                </h3>
                <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                  {activeStage.outstandingActions.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps in Journey */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Next Transition
              </span>
              <p className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                {activeStage.nextSteps}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
