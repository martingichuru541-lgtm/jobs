import React, { useState } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  CheckCheck,
  Calendar,
  FileCheck,
  Package,
  HeartPulse,
} from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationsModalProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification?: (notif: AppNotification) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'All' | 'In-App' | 'Email' | 'WhatsApp'>('All');

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => selectedChannel === 'All' || n.channel === selectedChannel
  );

  const getIconForType = (type: AppNotification['type']) => {
    switch (type) {
      case 'interview':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'offer':
        return <FileCheck className="w-4 h-4 text-blue-400" />;
      case 'medical':
        return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'travel':
        return <Package className="w-4 h-4 text-amber-400" />;
      case 'attestation':
      default:
        return <CheckCheck className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Multi-Channel Notifications
              </h2>
              <p className="text-xs text-slate-400">
                KenyaOne Account • Email Notifications • WhatsApp Verified Alerts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Channel Filters */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5">
            {(['All', 'In-App', 'Email', 'WhatsApp'] as const).map((channel) => (
              <button
                key={channel}
                onClick={() => setSelectedChannel(channel)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedChannel === channel
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {channel === 'WhatsApp' ? '💬 WhatsApp' : channel === 'Email' ? '✉️ Email' : channel === 'In-App' ? '🔔 In-App' : 'All Channels'}
              </button>
            ))}
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No notifications on this channel.
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification && onSelectNotification(notif)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-slate-900/40 border-slate-800'
                    : 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getIconForType(notif.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs text-white">{notif.title}</strong>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            notif.channel === 'WhatsApp'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : notif.channel === 'Email'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {notif.channel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">{notif.message}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 flex-shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
