import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { useApp } from '../context/AppContext';
import TrustBadge from '../components/ui/TrustBadge';
import {
  ShieldCheck, AlertTriangle, Users, Compass, DollarSign, CheckCircle2,
  XCircle, Filter, Search, ChevronRight, BarChart3, Flag, UserCheck, Activity
} from 'lucide-react';

export default function AdminPage() {
  const { state, actions } = useApp();
  const [activeTab, setActiveTab] = useState('verifications');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample pending verifications
  const pendingVerifications = [
    { id: 'v1', name: 'Aarav Patel', email: 'aarav@example.com', type: 'Government ID', submitted: '2 hours ago', document: 'Passport', trustScore: 88 },
    { id: 'v2', name: 'Elena Rostova', email: 'elena@example.com', type: 'College ID', submitted: '5 hours ago', document: 'University Card', trustScore: 92 },
    { id: 'v3', name: 'Marcus Chen', email: 'marcus@example.com', type: 'Phone Verification', submitted: '1 day ago', document: 'SMS OTP Verified', trustScore: 85 },
  ];

  // Sample reported items
  const reports = [
    { id: 'r1', reportedUser: 'Sam Wilson', reporter: 'Priya Sharma', reason: 'Unresponsive after trip commitment', category: 'Behavior', date: 'Yesterday', status: 'Pending' },
    { id: 'r2', reportedUser: 'Fake Account Bot', reporter: 'Marcus Chen', reason: 'Spam messages soliciting payments outside platform', category: 'Spam', date: '3 days ago', status: 'Pending' },
  ];

  const handleApproveVerification = (id) => {
    actions.showToast('Verification approved successfully!', 'success');
  };

  const handleRejectVerification = (id) => {
    actions.showToast('Verification request rejected', 'info');
  };

  return (
    <AppLayout title="Admin Moderation Portal">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-slate-100">{state.users?.length || 12}</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Pending Badges</p>
              <p className="text-2xl font-bold text-slate-100">{pendingVerifications.length}</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
              <Flag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Open Reports</p>
              <p className="text-2xl font-bold text-slate-100">{reports.length}</p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Trips</p>
              <p className="text-2xl font-bold text-slate-100">{state.trips?.length || 8}</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-700/80 gap-6">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`pb-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'verifications'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            ID Verifications ({pendingVerifications.length})
          </button>
          
          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Safety & Reports ({reports.length})
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`pb-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'system'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            Platform Health
          </button>
        </div>

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700/60 flex flex-wrap justify-between items-center gap-4">
              <h2 className="font-semibold text-slate-200">Pending Verification Requests</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900/60 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-700/60">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-xs text-slate-400">({item.email})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Submitted <span className="text-slate-300 font-medium">{item.document}</span> for {item.type} • {item.submitted}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrustBadge score={item.trustScore} showLabel />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleRejectVerification(item.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => handleApproveVerification(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve Badge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700/60">
              <h2 className="font-semibold text-slate-200">Community Reports & Moderation</h2>
            </div>
            <div className="divide-y divide-slate-700/60">
              {reports.map((report) => (
                <div key={report.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-semibold">
                        {report.category}
                      </span>
                      <span className="text-xs text-slate-400">{report.date}</span>
                    </div>
                    <p className="text-sm text-slate-200 font-medium mt-2">
                      <span className="text-indigo-400 font-semibold">{report.reporter}</span> reported <span className="text-amber-400 font-semibold">{report.reportedUser}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">"{report.reason}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-700/50 text-xs font-medium">
                      Dismiss Report
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium">
                      Issue Warning / Ban
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-slate-200 text-lg">System Metrics & Match Engine Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <p className="text-sm text-slate-400">AI Compatibility Engine Latency</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">42 ms (Optimal)</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <p className="text-sm text-slate-400">Trust Score Verification Index</p>
                <p className="text-xl font-bold text-indigo-400 mt-1">94.8% Verified</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
