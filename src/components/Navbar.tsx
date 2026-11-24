import React from 'react';
import {
  Compass,
  Bot,
  Globe2,
  ShieldCheck,
  Briefcase,
  MapPin,
  FileText,
  GraduationCap,
  Users,
  ShieldAlert,
  BarChart3,
  PackageCheck,
  Bell,
  Building2,
  UserCheck,
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenDeparturePack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenDeparturePack,
}) => {
  const primaryNavItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Compass },
    { id: 'ai_agent', label: 'AI Career Agent', icon: Bot, badge: 'AI' },
    { id: 'global_discovery', label: 'Global Corridors (18+)', icon: Globe2 },
    { id: 'passport', label: 'Talent Passport', icon: ShieldCheck, badge: 'Verified' },
    { id: 'opportunities', label: 'Opportunities (15)', icon: Briefcase },
    { id: 'journey', label: '23-Stage Timeline', icon: MapPin },
    { id: 'cvbuilder', label: 'ATS CV Builder', icon: FileText },
    { id: 'ai_school', label: 'AI School', icon: GraduationCap },
    { id: 'services', label: 'Artisans & Freelance', icon: Users },
    { id: 'anti_scam', label: 'Anti-Scam & NEA', icon: ShieldAlert, badge: 'Safe' },
    { id: 'counties', label: '47 Counties', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo & National Emblem Motif */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('marketplace')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 p-0.5 shadow-lg shadow-emerald-950/50 flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-xs sm:text-sm tracking-wider text-emerald-400">K1</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-black text-base sm:text-lg text-white tracking-tight">
                  KENYA<span className="text-emerald-400">ONE</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-widest">
                  CAREERS
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-tight">
                Global Employment Intelligence Platform
              </p>
            </div>
          </div>

          {/* Right Actions: Role Switcher & Notifications & Departure Pack */}
          <div className="flex items-center gap-2">
            {/* Quick Departure Pack Trigger */}
            <button
              onClick={onOpenDeparturePack}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm cursor-pointer"
              title="Official KenyaOne Departure Pack Dossier"
            >
              <PackageCheck className="w-4 h-4 text-amber-400" />
              <span>Departure Pack</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="bg-slate-900/90 rounded-xl p-1 border border-slate-800 flex items-center text-[10px] sm:text-[11px] font-semibold">
              <button
                onClick={() => setUserRole('jobseeker')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  userRole === 'jobseeker'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Jobseeker
              </button>
              <button
                onClick={() => setUserRole('employer')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  userRole === 'employer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Employer / Recruiter
              </button>
              <button
                onClick={() => setUserRole('staff')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  userRole === 'staff'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Centre Staff
              </button>
              <button
                onClick={() => setUserRole('admin')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  userRole === 'admin'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 relative transition-all cursor-pointer"
              title="Notifications Desk"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-slate-950">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global Navigation Ribbon */}
        <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/80">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                      isActive
                        ? 'bg-slate-950/30 text-slate-950'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
