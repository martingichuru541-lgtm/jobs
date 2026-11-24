/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CVBuilder } from './components/CVBuilder';
import { CareersMarketplace } from './components/CareersMarketplace';
import { RecruitmentJourneyTracker } from './components/RecruitmentJourneyTracker';
import { ApplicantDashboard } from './components/ApplicantDashboard';
import { DeparturePackModal } from './components/DeparturePackModal';
import { AppointmentLetterModal } from './components/AppointmentLetterModal';
import { NairobiCentreModal } from './components/NairobiCentreModal';
import { GovernmentCoordinationModal } from './components/GovernmentCoordinationModal';
import { MigrantWorkerProtectionModal } from './components/MigrantWorkerProtectionModal';
import { NotificationsModal } from './components/NotificationsModal';
import { EmployerDashboard } from './components/EmployerDashboard';
import { AICareerIntelligence } from './components/AICareerIntelligence';
import { GlobalJobDiscovery } from './components/GlobalJobDiscovery';
import { GlobalTalentPassport } from './components/GlobalTalentPassport';
import { OpportunityIntelligence } from './components/OpportunityIntelligence';
import { AICareerSchool } from './components/AICareerSchool';
import { ServicesMarketplace } from './components/ServicesMarketplace';
import { AntiScamProtection } from './components/AntiScamProtection';
import { NationalTalentIntelligence } from './components/NationalTalentIntelligence';
import { CareersAnalytics } from './components/CareersAnalytics';
import {
  INITIAL_USER_PROFILE,
  MOCK_JOBS,
  INITIAL_APPLICATION,
  INITIAL_DEPARTURE_PACK,
  INITIAL_NOTIFICATIONS,
  INITIAL_CV_DATA,
} from './data/mockData';
import {
  UserRole,
  JobPosting,
  ApplicationRecord,
  DeparturePack,
  AppNotification,
  CVData,
  CareerOpportunity,
} from './types';
import {
  Compass,
  MapPin,
  FileText,
  Building2,
  UserCheck,
  ShieldAlert,
  Package,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [userRole, setUserRole] = useState<UserRole>('jobseeker');

  // Application Data States
  const [profile, setProfile] = useState(INITIAL_USER_PROFILE);
  const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<ApplicationRecord[]>([INITIAL_APPLICATION]);
  const [departurePack, setDeparturePack] = useState<DeparturePack>(INITIAL_DEPARTURE_PACK);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(['job-ke-001']);

  // Modal Visibility States
  const [isDeparturePackOpen, setIsDeparturePackOpen] = useState(false);
  const [isAppointmentLetterOpen, setIsAppointmentLetterOpen] = useState(false);
  const [isNairobiCentreOpen, setIsNairobiCentreOpen] = useState(false);
  const [isGovCoordinationOpen, setIsGovCoordinationOpen] = useState(false);
  const [isWorkerProtectionOpen, setIsWorkerProtectionOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle Job Application
  const handleApplyJob = (job: JobPosting) => {
    if (appliedJobIds.includes(job.id)) return;

    setAppliedJobIds((prev) => [...prev, job.id]);

    const newApp: ApplicationRecord = {
      id: `app-ke-${Date.now().toString().slice(-4)}`,
      jobId: job.id,
      jobTitle: job.title,
      employer: job.employer,
      country: job.country,
      submittedDate: new Date().toLocaleDateString('en-CA'),
      currentStatus: 'Received',
      stages: INITIAL_APPLICATION.stages.map((stg) => ({
        ...stg,
        status: stg.stepNumber === 1 ? 'completed' : stg.stepNumber === 4 ? 'in_progress' : 'pending',
        dateCompleted: stg.stepNumber === 1 ? new Date().toLocaleDateString('en-CA') : undefined,
      })),
      hasInterview: false,
      hasOffer: false,
      hasDeparturePack: false,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Dispatch automatic notifications across all 3 channels
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Application Received: ' + job.title,
      message: `Your KenyaOne reusable profile and ATS CV have been transmitted to ${job.employer}. Application Ref: ${newApp.id}.`,
      channel: 'In-App',
      timestamp: 'Just now',
      type: 'status_update',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handle Career Opportunity Application
  const handleApplyOpportunity = (opp: CareerOpportunity) => {
    const oppNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Opportunity Transmitted: ' + opp.title,
      message: `Your KenyaOne verified dossier has been submitted to ${opp.organization} (${opp.location}).`,
      channel: 'Email',
      timestamp: 'Just now',
      type: 'status_update',
      read: false,
    };
    setNotifications((prev) => [oppNotif, ...prev]);
  };

  // Handle CV save
  const handleSaveCVToProfile = (updatedCv: CVData) => {
    setCvData(updatedCv);
    setProfile((prev) => ({
      ...prev,
      fullName: updatedCv.fullName || prev.fullName,
      title: updatedCv.professionalTitle || prev.title,
      email: updatedCv.email || prev.email,
      phone: updatedCv.phone || prev.phone,
      skills: updatedCv.skills.length > 0 ? updatedCv.skills : prev.skills,
    }));
  };

  // Handle Departure Pack Handover Confirmation
  const handleConfirmDeparturePackHandover = (updatedPack: DeparturePack) => {
    setDeparturePack(updatedPack);
    const handoffNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Departure Pack Verified & Released',
      message: `Your official Departure Pack (${updatedPack.referenceNumber}) has been verified and released at Nairobi Documentation Centre. Digital docket receipt generated.`,
      channel: 'WhatsApp',
      timestamp: 'Just now',
      type: 'travel',
      read: false,
    };
    setNotifications((prev) => [handoffNotif, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Liquid Glass Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* If Role is Employer / Agency */}
        {userRole === 'employer' ? (
          <EmployerDashboard
            jobs={jobs}
            applications={applications}
            onAddNewJob={(newJob) => setJobs((prev) => [newJob, ...prev])}
            onOpenScheduleInterview={() => setIsAppointmentLetterOpen(true)}
          />
        ) : userRole === 'staff' ? (
          /* Centre Staff View: Fast Handover & Centre Management */
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-amber-500/30">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Staff Counter Station
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                Nairobi Documentation Centre Counter Terminal
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Biometric verification, physical Departure Pack sealing, and digital handover docket management.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => setIsDeparturePackOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <Package className="w-4 h-4" /> Open Active Departure Pack Docket
                </button>
                <button
                  onClick={() => setIsNairobiCentreOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer"
                >
                  View Today’s Appointment Queue
                </button>
              </div>
            </div>

            <RecruitmentJourneyTracker
              application={applications[0]}
              onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
              onOpenAppointmentLetter={() => setIsAppointmentLetterOpen(true)}
            />
          </div>
        ) : userRole === 'admin' ? (
          /* Admin View: Full Analytics & Governance */
          <CareersAnalytics />
        ) : (
          /* Jobseeker View: Based on activeTab */
          <>
            {activeTab === 'marketplace' && (
              <CareersMarketplace
                jobs={jobs}
                userProfile={profile}
                onApplyJob={handleApplyJob}
                appliedJobIds={appliedJobIds}
              />
            )}

            {activeTab === 'ai_agent' && (
              <AICareerIntelligence
                cvData={cvData}
                jobs={jobs}
                onApplyJob={handleApplyJob}
                appliedJobIds={appliedJobIds}
              />
            )}

            {activeTab === 'global_discovery' && (
              <GlobalJobDiscovery
                onApplyJob={handleApplyJob}
                appliedJobIds={appliedJobIds}
              />
            )}

            {activeTab === 'passport' && (
              <GlobalTalentPassport />
            )}

            {activeTab === 'opportunities' && (
              <OpportunityIntelligence
                onApplyOpportunity={handleApplyOpportunity}
              />
            )}

            {activeTab === 'journey' && (
              <RecruitmentJourneyTracker
                application={applications[0]}
                onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
                onOpenAppointmentLetter={() => setIsAppointmentLetterOpen(true)}
              />
            )}

            {activeTab === 'cvbuilder' && (
              <CVBuilder
                initialData={cvData}
                onSaveToProfile={handleSaveCVToProfile}
              />
            )}

            {activeTab === 'ai_school' && (
              <AICareerSchool candidateName={profile.fullName} />
            )}

            {activeTab === 'services' && (
              <ServicesMarketplace />
            )}

            {activeTab === 'anti_scam' && (
              <AntiScamProtection />
            )}

            {activeTab === 'counties' && (
              <NationalTalentIntelligence />
            )}

            {activeTab === 'analytics' && (
              <CareersAnalytics />
            )}

            {activeTab === 'nairobi_centre' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/20">
                  <div className="max-w-2xl space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Physical Infrastructure
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Nairobi Recruitment & Documentation Centre
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Our flagship facility located in Upper Hill, Nairobi provides one-stop biometric verification, physical interview suites, document authentication, pre-departure orientation auditorium, and the Departure Pack counter.
                    </p>
                    <button
                      onClick={() => setIsNairobiCentreOpen(true)}
                      className="mt-3 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Building2 className="w-4 h-4" /> Book an Appointment Slot
                    </button>
                  </div>
                </div>

                <ApplicantDashboard
                  profile={profile}
                  application={applications[0]}
                  departurePack={departurePack}
                  onOpenCVBuilder={() => setActiveTab('cvbuilder')}
                  onOpenJourney={() => setActiveTab('journey')}
                  onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
                  onOpenAppointmentLetter={() => setIsAppointmentLetterOpen(true)}
                  onOpenNairobiCentre={() => setIsNairobiCentreOpen(true)}
                />
              </div>
            )}

            {activeTab === 'gov_docs' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl p-6 border border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Statutory Coordination
                  </span>
                  <h1 className="text-2xl font-black text-white mt-1">
                    Government Documentation Tracking & Medical Desk
                  </h1>
                  <p className="text-xs text-slate-300 mt-1">
                    Guided coordination with DCI Police Clearance (eCitizen), Ministry of Foreign Affairs (MFA legalization), Ministry of Labour (foreign contract attestation), and GCC Wafid medical centers.
                  </p>
                  <button
                    onClick={() => setIsGovCoordinationOpen(true)}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" /> Launch Government Documentation Guide
                  </button>
                </div>

                <RecruitmentJourneyTracker
                  application={applications[0]}
                  onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
                  onOpenAppointmentLetter={() => setIsAppointmentLetterOpen(true)}
                />
              </div>
            )}

            {activeTab === 'protection' && (
              <div className="space-y-6">
                <div className="glass-panel rounded-2xl p-6 border border-rose-500/30">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Migrant Welfare & Legal Rights
                  </span>
                  <h1 className="text-2xl font-black text-white mt-1">
                    Migrant Worker Protection & Welfare Centre
                  </h1>
                  <p className="text-xs text-slate-300 mt-1">
                    Zero recruitment fees enforcement, passport custody rights, emergency hotlines across Qatar, UAE, Saudi Arabia, Germany, and the UK, and confidential dispute reporting.
                  </p>
                  <button
                    onClick={() => setIsWorkerProtectionOpen(true)}
                    className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5"
                  >
                    <ShieldAlert className="w-4 h-4" /> Open Protection & Grievance Desk
                  </button>
                </div>

                <ApplicantDashboard
                  profile={profile}
                  application={applications[0]}
                  departurePack={departurePack}
                  onOpenCVBuilder={() => setActiveTab('cvbuilder')}
                  onOpenJourney={() => setActiveTab('journey')}
                  onOpenDeparturePack={() => setIsDeparturePackOpen(true)}
                  onOpenAppointmentLetter={() => setIsAppointmentLetterOpen(true)}
                  onOpenNairobiCentre={() => setIsNairobiCentreOpen(true)}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Interactive Modals */}
      <DeparturePackModal
        pack={departurePack}
        isOpen={isDeparturePackOpen}
        onClose={() => setIsDeparturePackOpen(false)}
        onConfirmHandover={handleConfirmDeparturePackHandover}
      />

      {applications[0]?.interviewDetails && (
        <AppointmentLetterModal
          appointment={applications[0].interviewDetails}
          isOpen={isAppointmentLetterOpen}
          onClose={() => setIsAppointmentLetterOpen(false)}
          onConfirmStatus={(status) => {
            const updated = {
              ...applications[0],
              interviewDetails: {
                ...applications[0].interviewDetails!,
                status,
              },
            };
            setApplications([updated, ...applications.slice(1)]);
          }}
        />
      )}

      <NairobiCentreModal
        isOpen={isNairobiCentreOpen}
        onClose={() => setIsNairobiCentreOpen(false)}
      />

      <GovernmentCoordinationModal
        isOpen={isGovCoordinationOpen}
        onClose={() => setIsGovCoordinationOpen(false)}
      />

      <MigrantWorkerProtectionModal
        isOpen={isWorkerProtectionOpen}
        onClose={() => setIsWorkerProtectionOpen(false)}
      />

      <NotificationsModal
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={(notif) => {
          if (notif.type === 'travel') {
            setIsNotificationsOpen(false);
            setIsDeparturePackOpen(true);
          } else if (notif.type === 'interview') {
            setIsNotificationsOpen(false);
            setIsAppointmentLetterOpen(true);
          }
        }}
      />

      {/* Global Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">KENYAONE CAREERS</span>
            <span>• National Employment Authority (NEA) Registered Ecosystem</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>One Account. One Recruitment Journey.</span>
            <span>Zero Placement Fees to Jobseekers.</span>
            <span>Nairobi Documentation Centre: Upper Hill, Nairobi.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
