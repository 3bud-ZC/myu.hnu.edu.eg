import React, { useState } from 'react';
import { Ban, Edit3, X, AlertCircle, Calendar } from 'lucide-react';
import { DEMO_STUDENT } from '../data/student';
import { ACADEMIC_DATA } from '../data/transcript';
import { UnofficialDemoBadge } from '../components/Layout/UnofficialDemoBadge';

const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

const WEEK_DAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];

export const RegistrationPage: React.FC = () => {
  const { summary } = ACADEMIC_DATA;
  const [selectedSemester, setSelectedSemester] = useState('fall-2026');
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <UnofficialDemoBadge variant="banner" />

      {/* Red Warning Banner (Matches Screenshot_3.png) */}
      <div className="bg-red-50 border border-red-200/90 rounded-2xl p-4 flex items-center gap-3 text-sm text-red-700 shadow-xs">
        <Ban className="w-5 h-5 text-red-600 shrink-0" />
        <div>
          <span className="font-bold text-red-800">Cannot Register:</span>{' '}
          <span>Did not pay any previous fee</span>
        </div>
      </div>

      {/* Student Status & Limits Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
        {/* Top row: Avatar, Name, ID, GPA & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1b3457] text-white flex items-center justify-center font-bold text-base shadow-xs">
              J
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold font-arabic text-gray-900 leading-snug">
                {DEMO_STUDENT.fullNameArabic}
              </h2>
              <p className="text-xs text-gray-500 font-mono mt-0.5 space-x-2">
                <span>ID: {DEMO_STUDENT.id}</span>
                <span>1</span>
                <span>GPA: {summary.cumulativeGpa.toFixed(3)}</span>
              </p>
            </div>
          </div>

          {/* Registration on hold badge */}
          <div className="px-4 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold tracking-wider uppercase">
            REGISTRATION ON HOLD
          </div>
        </div>

        {/* Counter Row (REGISTERED / MIN / MAX / REMAINING) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">REGISTERED</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">0</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">MIN</p>
            <p className="text-2xl md:text-3xl font-extrabold text-blue-600 mt-1">10</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">MAX</p>
            <p className="text-2xl md:text-3xl font-extrabold text-amber-600 mt-1">12</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">REMAINING</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">12</p>
          </div>
        </div>
      </div>

      {/* Semester Selector & Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="semester-select" className="text-xs md:text-sm font-semibold text-gray-700">
            Semester:
          </label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-xs md:text-sm font-medium text-gray-800 shadow-xs focus:ring-2 focus:ring-[#204d80]/20 focus:border-[#204d80] outline-hidden min-w-[200px]"
          >
            <option value="fall-2026">Fall 2026 / 2027</option>
            <option value="spring-2026">Spring 2025 / 2026</option>
          </select>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#60728c] hover:bg-[#4f5f76] text-white text-xs md:text-sm font-medium rounded-xl shadow-xs transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Registration</span>
        </button>
      </div>

      {/* Timetable Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-sm md:text-base font-bold text-gray-900 tracking-tight">Timetable</h3>
          <span className="text-xs text-gray-500 font-medium">0 courses</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse min-w-[880px]">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4 text-left w-28">DAY</th>
                {TIME_SLOTS.map((slot) => (
                  <th key={slot} className="py-3 px-2 whitespace-nowrap">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {WEEK_DAYS.map((day) => (
                <tr key={day} className="h-16 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2 px-4 text-left font-semibold text-gray-700 bg-gray-50/30 border-r border-gray-100">
                    {day}
                  </td>
                  {TIME_SLOTS.map((slot) => (
                    <td
                      key={slot}
                      className="py-2 px-2 border-r border-gray-100 last:border-r-0 text-gray-300"
                    >
                      {/* Empty timetable cell */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Registration Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Ban className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Registration Locked</h3>
            </div>

            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Course registration is currently locked because you have outstanding financial holds. Please settle the pending tuition fees in the Payments section before modifying your course schedule.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
