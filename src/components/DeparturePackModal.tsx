import React, { useState } from 'react';
import {
  Package,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Plane,
  AlertTriangle,
  Download,
  PenTool,
  Award,
} from 'lucide-react';
import { DeparturePack } from '../types';
import { exportDeparturePackReceiptPdf } from '../utils/pdfGenerator';
import { validateDeparturePack } from '../utils/rules';

interface DeparturePackModalProps {
  pack: DeparturePack;
  isOpen: boolean;
  onClose: () => void;
  onConfirmHandover: (updatedPack: DeparturePack) => void;
}

export const DeparturePackModal: React.FC<DeparturePackModalProps> = ({
  pack,
  isOpen,
  onClose,
  onConfirmHandover,
}) => {
  const [currentPack, setCurrentPack] = useState<DeparturePack>(pack);
  const [handoverStep, setHandoverStep] = useState<number>(1);
  const [applicantSigned, setApplicantSigned] = useState<boolean>(pack.status === 'Verified & Released');
  const [staffSigned, setStaffSigned] = useState<boolean>(pack.status === 'Verified & Released');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const validation = validateDeparturePack(currentPack);

  const toggleItemVerified = (itemId: string) => {
    setCurrentPack((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.id === itemId
          ? {
              ...i,
              verified: !i.verified,
              verifiedAt: !i.verified ? new Date().toISOString().slice(0, 10) : undefined,
            }
          : i
      ),
    }));
  };

  const handleCompleteHandover = () => {
    const updated: DeparturePack = {
      ...currentPack,
      status: 'Verified & Released',
      applicantSignature: 'DIGITALLY_SIGNED_BY_BEARER',
      staffCountersign: 'STF-KENYAONE-OFFICER-049',
      releaseReceiptRef: `RCP-${currentPack.referenceNumber}`,
      releasedAt: new Date().toLocaleDateString('en-GB'),
    };
    setCurrentPack(updated);
    onConfirmHandover(updated);
  };

  const handleDownloadReceipt = () => {
    setIsExporting(true);
    try {
      exportDeparturePackReceiptPdf(currentPack);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6 my-8 relative">
        {/* Header with Reference & QR Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Signature Feature
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Ref: {currentPack.referenceNumber}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">
                Official KenyaOne Departure Pack
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-start sm:self-center p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Candidate & Flight Details Strip */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Authorized Recipient</span>
            <strong className="text-white block mt-0.5">{currentPack.applicantName}</strong>
            <span className="text-slate-500 text-[10px]">ID: {currentPack.nationalId}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Destination</span>
            <strong className="text-white block mt-0.5">
              {currentPack.destinationCity}, {currentPack.destinationCountry}
            </strong>
            <span className="text-slate-500 text-[10px]">{currentPack.employer}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Flight Details</span>
            <strong className="text-emerald-400 block mt-0.5 flex items-center gap-1">
              <Plane className="w-3.5 h-3.5" /> {currentPack.flightNumber}
            </strong>
            <span className="text-slate-500 text-[10px]">Departs: {currentPack.departureDate}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Pack Status</span>
            <span
              className={`inline-block mt-0.5 px-2 py-0.5 rounded font-bold text-[11px] ${
                currentPack.status === 'Verified & Released'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {currentPack.status}
            </span>
          </div>
        </div>

        {/* 8-Point Physical Docket Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Document Contents Checklist ({validation.completionPercentage}% Authenticated)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              8 of 8 Sealed Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentPack.items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItemVerified(item.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                  item.verified
                    ? 'bg-slate-900/80 border-emerald-500/40'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                      item.verified ? 'bg-emerald-500 text-white' : 'border border-slate-600'
                    }`}
                  >
                    {item.verified && '✓'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">{item.name}</h5>
                    <span className="text-[10px] text-slate-400">
                      Ref: {item.documentRef || 'Verified in Envelope'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Migrant Worker Passport Protection Policy Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-white font-bold">
              Lawful Document Custody Policy (Kenya Migrant Worker Code):
            </strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Original passports and civil identification documents belong exclusively to the bearer. KenyaOne Documentation Centre verifies credentials in person and immediately returns original passports to the candidate. Employers and intermediaries are legally prohibited from withholding worker passports.
            </p>
          </div>
        </div>

        {/* Interactive In-Person Handover Workflow */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-emerald-400" />
            In-Person Handover & Digital Acknowledgement
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Applicant Digital Sign */}
            <div className="glass-card rounded-xl p-3.5 space-y-2 border border-slate-800">
              <span className="text-xs font-bold text-slate-200 block">
                1. Candidate Inspection & Signature
              </span>
              <p className="text-[11px] text-slate-400">
                I confirm I have physically inspected and received all 8 attested documents in this sealed pack.
              </p>
              <button
                onClick={() => setApplicantSigned(true)}
                disabled={applicantSigned}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  applicantSigned
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                }`}
              >
                {applicantSigned ? '✓ Signed by Faith Chebet Kipkorir' : 'Sign Digital Acknowledgment'}
              </button>
            </div>

            {/* Staff Countersign */}
            <div className="glass-card rounded-xl p-3.5 space-y-2 border border-slate-800">
              <span className="text-xs font-bold text-slate-200 block">
                2. KenyaOne Officer Countersignature
              </span>
              <p className="text-[11px] text-slate-400">
                Officer verifies candidate biometrics, opens package, and records official handoff seal.
              </p>
              <button
                onClick={() => setStaffSigned(true)}
                disabled={staffSigned}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  staffSigned
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer border border-slate-700'
                }`}
              >
                {staffSigned ? '✓ Sealed: Officer STF-049 (Nairobi Centre)' : 'Officer Countersign & Seal'}
              </button>
            </div>
          </div>

          {applicantSigned && staffSigned && currentPack.status !== 'Verified & Released' && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleCompleteHandover}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                Complete Official Handover & Release Docket
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer: Generate PDF Docket Receipt */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <QrCode className="w-4 h-4 text-amber-400" />
            Security Barcode: KP-{currentPack.referenceNumber}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadReceipt}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating PDF...' : 'Download Official PDF Receipt'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
