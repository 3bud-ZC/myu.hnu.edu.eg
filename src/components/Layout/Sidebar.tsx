import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  FileText,
  BookOpen,
  Wallet,
  CreditCard,
  User,
  LogOut,
  ChevronDown,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative ${
      isActive
        ? 'bg-[#1f385c] text-white border-r-4 border-amber-400 font-semibold shadow-xs'
        : 'text-slate-300 hover:text-white hover:bg-[#1a2d48]'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#14233c] text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Block */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1c3153]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1d3557] border border-[#2b4c7a] flex items-center justify-center font-bold text-white tracking-wide shadow-sm text-sm">
              HNU
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight text-white tracking-tight">HNU Portal</span>
              <span className="text-xs text-slate-400 leading-tight">Student Portal</span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 select-none">
          {/* Group 1: ACADEMIC */}
          <div>
            <div className="flex items-center justify-between px-5 py-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Academic</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="mt-2 space-y-0.5">
              <NavLink to="/transcript" className={navItemClass} onClick={() => onClose()}>
                <FileText className="w-4 h-4 shrink-0 text-slate-300" />
                <span>Transcript</span>
              </NavLink>

              <NavLink to="/registration" className={navItemClass} onClick={() => onClose()}>
                <BookOpen className="w-4 h-4 shrink-0 text-slate-300" />
                <span>Registration</span>
              </NavLink>
            </div>
          </div>

          {/* Group 2: FINANCIAL */}
          <div>
            <div className="flex items-center justify-between px-5 py-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-slate-400" />
                <span>Financial</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="mt-2 space-y-0.5">
              <NavLink to="/payments" className={navItemClass} onClick={() => onClose()}>
                <CreditCard className="w-4 h-4 shrink-0 text-slate-300" />
                <span>Payments</span>
              </NavLink>
            </div>
          </div>

          {/* Group 3: ACCOUNT */}
          <div>
            <div className="flex items-center justify-between px-5 py-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>Account</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="mt-2 space-y-0.5">
              <NavLink to="/student-info" className={navItemClass} onClick={() => onClose()}>
                <User className="w-4 h-4 shrink-0 text-slate-300" />
                <span>Student Info</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Logout */}
        <div className="p-3 border-t border-[#1c3153]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-[#1a2d48] rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
