import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, ShieldAlert } from 'lucide-react';
import { DEMO_STUDENT } from '../../data/student';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, onToggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200/80 px-4 md:px-6 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-[#1a2d48] tracking-tight">{title}</h1>
      </div>

      {/* Right side: Actions, Badges & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">

        {/* Notifications Icon */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors relative"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-5 h-5 fill-amber-400/20" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-gray-100 font-semibold text-gray-700 flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">1 new</span>
              </div>
              <div className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-800">Registration Notice</p>
                <p className="text-gray-500 mt-0.5">Please settle outstanding semester fees to proceed with course enrollment.</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Fall Term 2026/2027</span>
              </div>
            </div>
          )}
        </div>

        {/* Student ID Chip */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#edf2f8] text-[#1e3a5f] rounded-lg text-xs font-semibold border border-[#d6e2ee]">
          <svg className="w-3.5 h-3.5 text-[#2d598b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="14" x="3" y="5" rx="2"/>
            <path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>
          </svg>
          <span className="tracking-wide font-mono">{DEMO_STUDENT.id}</span>
        </div>

        {/* Profile Info & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-gray-50 transition-colors group focus:outline-hidden"
          >
            {/* Circular Avatar with Arabic Initials */}
            <div className="w-9 h-9 rounded-full bg-[#1b3457] text-white flex items-center justify-center font-bold text-sm shadow-xs select-none">
              <span className="font-arabic">{DEMO_STUDENT.initials}</span>
            </div>

            {/* Arabic Display Name */}
            <div className="hidden lg:block text-left">
              <span className="font-arabic text-xs md:text-sm font-semibold text-gray-800 block text-right leading-tight">
                {DEMO_STUDENT.fullNameArabic}
              </span>
            </div>

            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="text-sm font-semibold font-arabic text-gray-800 truncate mt-0.5">
                  {DEMO_STUDENT.fullNameArabic}
                </p>
                <p className="text-[11px] font-mono text-gray-500 mt-0.5">ID: {DEMO_STUDENT.id}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/student-info');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 text-left"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Student Profile</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
