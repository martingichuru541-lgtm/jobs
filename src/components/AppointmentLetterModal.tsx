import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Download,
  Printer,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { InterviewAppointment } from '../types';
import { exportAppointmentLetterPdf } from '../utils/pdfGenerator';

interface AppointmentLetterModalProps {
  appointment: InterviewAppointment;
  isOpen: boolean;
  onClose: () => void;
  onConfirmStatus?: (status: InterviewAppointment['status']) => void;
}

export const AppointmentLetterModal: React.FC<AppointmentLetterModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onConfirmStatus,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    setIsExporting(true);
    try {
      exportAppointmentLetterPdf(appointment);
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirm = () => {
    if (onConfirmStatus) {
      onConfirmStatus('Confirmed');
      setStatusMessage('Appointment Confirmed! Confirmation SMS & Email dispatched.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleReschedule = () => {
    if (onConfirmStatus) {
      onConfirmStatus('Reschedule Requested');
      setStatusMessage('Reschedule request sent to KenyaOne Interview Desk.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ref: {appointment.appointmentRef}
                </span>
                <span className="text-xs text-slate-400">
                  Status: <strong className="text-white">{appointment.status}</strong>
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">
                Interview Appointment Letter
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
              title="Print Letter"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating...' : 'Download PDF Letter'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {statusMessage}
          </div>
        )}

        {/* Printable Official Document Container */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl font-sans text-xs space-y-5 border border-slate-200">
          {/* Letterhead */}
          <div className="border-b-2 border-emerald-600 pb-3 flex justify-between items-start">
            <div>
              <h3 className="text-base font-black text-emerald-700 tracking-wide">
                KENYAONE CAREERS INTERVIEW COORDINATION DOCKET
              </h3>
              <p className="text-[10px] text-slate-600">
                National Employment Authority (NEA) Registered Partner • Nairobi Documentation Centre
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Verification QR</span>
              <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-slate-700">
                <QrCode className="w-9 h-9" />
              </div>
            </div>
          </div>

          {/* Recipient Dossier Details */}
          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div>
              <span className="text-slate-500 block">Candidate Full Name:</span>
              <strong className="text-slate-900 text-xs block">{appointment.candidateName}</strong>
              <span className="text-slate-600">National ID / Passport: {appointment.nationalId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Position & Employer:</span>
              <strong className="text-slate-900 text-xs block">{appointment.jobTitle}</strong>
              <span className="text-slate-600">{appointment.employer} ({appointment.country})</span>
            </div>
          </div>

          {/* High-visibility Appointment Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5 text-xs">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800">
              Appointment Schedule & Venue
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">Date & Time: </span>
                <strong className="text-slate-900">
                  {appointment.date} at {appointment.time} ({appointment.timeZone})
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Format: </span>
                <strong className="text-slate-900">{appointment.format}</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500">Location or Digital Meeting: </span>
                <strong className="text-slate-900">{appointment.locationOrLink}</strong>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Mandatory Original Documents Required at Interview
            </h4>
            <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
              {appointment.requiredDocuments.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Candidate Guidelines & Protocols
            </h4>
            <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700 text-[10.5px]">
              {appointment.instructions.map((inst, idx) => (
                <li key={idx}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Verification Code Footer */}
          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between items-center">
            <span>Security Digest: SHA-256-AUTHENTICATED-{appointment.appointmentRef}</span>
            <span>Issued by KenyaOne Recruitment Directorate</span>
          </div>
        </div>

        {/* Action Controls for Candidate */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Please confirm your attendance at least 48 hours prior to the scheduled date.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReschedule}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30"
            >
              Request Reschedule
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
            >
              Confirm Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
