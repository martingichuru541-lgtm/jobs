import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Users,
  FileCheck,
} from 'lucide-react';

interface NairobiCentreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NairobiCentreModal: React.FC<NairobiCentreModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState('Biometrics & ID Verification');
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('09:30 AM');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  if (!isOpen) return null;

  const services = [
    {
      id: 'id_biometrics',
      title: 'Biometrics & ID Verification',
      desc: 'National ID, biometric fingerprint scanning, and IPRS civil registry match.',
    },
    {
      id: 'cv_cert',
      title: 'ATS CV & Certificate Scanning',
      desc: 'High-res document digitization, academic transcript certification, and ATS tuning.',
    },
    {
      id: 'contract_review',
      title: 'Foreign Contract Review & Legal Desk',
      desc: 'Labour attorney contract analysis, salary rate verification, and clause checks.',
    },
    {
      id: 'medical_coord',
      title: 'Wafid Medical Slip Coordination',
      desc: 'Guidance and appointment booking for GCC-approved medical clinics in Nairobi.',
    },
    {
      id: 'orientation',
      title: 'Pre-Departure Orientation Sessions',
      desc: 'Mandatory 4-hour cultural, labour rights, and travel safety briefing in the auditorium.',
    },
    {
      id: 'pack_collection',
      title: 'Departure Pack Inspection & Collection',
      desc: 'Counter handover of sealed Departure Pack, digital signing, and receipt issuance.',
    },
    {
      id: 'complaint_desk',
      title: 'Migrant Worker Assistance & Dispute Desk',
      desc: 'Confidential reporting of illegal recruitment fees or employer contract breaches.',
    },
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Physical Hub
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                Nairobi Recruitment & Documentation Centre
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

        {/* Centre Location & Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="glass-card rounded-xl p-3.5 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Physical Address
            </span>
            <strong className="text-white block">Level 4, KenyaOne Tower</strong>
            <span className="text-slate-400 text-[11px]">Hospital Road, Upper Hill, Nairobi</span>
          </div>

          <div className="glass-card rounded-xl p-3.5 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Operating Hours
            </span>
            <strong className="text-white block">Monday - Friday: 08:00 - 17:00</strong>
            <span className="text-slate-400 text-[11px]">Saturday (Pre-departure): 09:00 - 13:00</span>
          </div>

          <div className="glass-card rounded-xl p-3.5 border border-slate-800 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Official Helpdesk
            </span>
            <strong className="text-white block">+254 (020) 790 8800</strong>
            <span className="text-slate-400 text-[11px]">centre.nairobi@kenyaone.co.ke</span>
          </div>
        </div>

        {bookedSuccess ? (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Centre Appointment Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Booking Ref: <strong>K1-NBO-{Date.now().toString().slice(-6)}</strong>. An SMS confirmation and QR gate pass has been sent to your registered mobile number.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                Select Documentation Centre Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv.title)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedService === srv.title
                        ? 'bg-slate-800/90 border-emerald-500/60 shadow-md'
                        : 'glass-card border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-white">{srv.title}</strong>
                      {selectedService === srv.title && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs text-white"
                >
                  <option value="08:30 AM" className="bg-slate-900">08:30 AM (Early Slot)</option>
                  <option value="09:30 AM" className="bg-slate-900">09:30 AM</option>
                  <option value="11:00 AM" className="bg-slate-900">11:00 AM</option>
                  <option value="02:00 PM" className="bg-slate-900">02:00 PM</option>
                  <option value="03:30 PM" className="bg-slate-900">03:30 PM (Late Slot)</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              Physical attendance is only required when the law, biometrics, or official document counter requires it.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer"
              >
                Reserve Slot at Nairobi Centre
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
