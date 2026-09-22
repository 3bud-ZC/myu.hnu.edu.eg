import React, { useState } from 'react';
import { User, GraduationCap, Lock, KeyRound, CheckCircle2, AlertCircle, X, Shield } from 'lucide-react';
import { DEMO_STUDENT } from '../data/student';
import { useAuth } from '../context/AuthContext';

export const StudentInfoPage: React.FC = () => {
  const { updatePassword } = useAuth();

  // Change Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const res = updatePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMsg(null);
      }, 1500);
    } else {
      setPasswordMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner (Matching Screenshot_5.png) */}
      <div className="bg-[#20406b] rounded-3xl p-6 md:p-8 text-white shadow-md flex items-center gap-6">
        {/* Large Circular Avatar with Initials */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center font-bold text-xl md:text-2xl font-arabic shrink-0 shadow-inner">
          {DEMO_STUDENT.initials}
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold font-arabic tracking-tight">
            {DEMO_STUDENT.fullNameArabic}
          </h2>
          <p className="text-xs md:text-sm text-blue-200/90 font-mono mt-1 space-x-2">
            <span>ID: {DEMO_STUDENT.id}</span>
            <span>·</span>
            <span>{DEMO_STUDENT.username}</span>
          </p>
        </div>
      </div>

      {/* Two Column Grid: Personal Info & Academic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Personal Information Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm md:text-base font-bold text-gray-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-xs">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">FIRST NAME</p>
              <p className="text-sm font-semibold font-arabic text-gray-800 mt-1">{DEMO_STUDENT.firstName}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">MIDDLE NAME</p>
              <p className="text-sm font-semibold font-arabic text-gray-800 mt-1">{DEMO_STUDENT.middleName}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">LAST NAME</p>
              <p className="text-sm font-semibold font-arabic text-gray-800 mt-1">{DEMO_STUDENT.lastName}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">NATIONAL ID</p>
              <p className="text-sm font-mono font-semibold text-gray-800 mt-1">
                {DEMO_STUDENT.nationalIdMasked}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">GENDER</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{DEMO_STUDENT.gender}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">EMAIL</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{DEMO_STUDENT.email}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">PHONE</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{DEMO_STUDENT.phone}</p>
            </div>
          </div>
        </div>

        {/* 2. Academic Information Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <h3 className="text-sm md:text-base font-bold text-gray-900">Academic Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 text-xs">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">STUDENT ID</p>
              <p className="text-sm font-mono font-extrabold text-gray-900 mt-1">{DEMO_STUDENT.id}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">USERNAME</p>
              <p className="text-sm font-mono font-extrabold text-gray-900 mt-1">{DEMO_STUDENT.username}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">SCHOOL ID</p>
              <p className="text-sm font-mono font-semibold text-gray-800 mt-1">{DEMO_STUDENT.schoolId}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ACADEMIC YEAR</p>
              <p className="text-sm font-semibold text-gray-800 mt-1">{DEMO_STUDENT.academicYear}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">GRADE ID</p>
              <p className="text-sm font-mono font-semibold text-gray-800 mt-1">{DEMO_STUDENT.gradeId}</p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">LAST LOGIN</p>
              <p className="text-xs font-medium text-gray-700 mt-1">{DEMO_STUDENT.lastLogin}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">LAST SYNCED</p>
              <p className="text-xs font-medium text-gray-700 mt-1">{DEMO_STUDENT.lastSynced}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section (Matches Screenshot_5.png) */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Security</h4>
            <p className="text-xs text-gray-500 mt-0.5">Manage portal credentials and access security</p>
          </div>
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="px-4 py-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          Change Password
        </button>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-[#204d80] mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Change Password</h3>
                <p className="text-xs text-gray-500">Update your student portal password</p>
              </div>
            </div>

            {passwordMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {passwordMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#204d80] focus:ring-2 focus:ring-[#204d80]/15 outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#204d80] focus:ring-2 focus:ring-[#204d80]/15 outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#204d80] focus:ring-2 focus:ring-[#204d80]/15 outline-hidden text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#204d80] hover:bg-[#183d66] text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
