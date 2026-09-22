import React, { useState } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Clock,
  TrendingUp,
  Info,
  ChevronRight,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import {
  DEMO_TERMS,
  ACADEMIC_DATA,
  GPA_SCALE_RULES,
  ACADEMIC_LEVELS
} from '../data/transcript';
import { UnofficialDemoBadge } from '../components/Layout/UnofficialDemoBadge';

export const TranscriptPage: React.FC = () => {
  const { summary, termStats } = ACADEMIC_DATA;

  // Toggle state for expandable sections
  const [scaleOpen, setScaleOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <UnofficialDemoBadge variant="banner" />

      {/* 4 Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Cumulative GPA */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">CUMULATIVE GPA</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl md:text-3xl font-extrabold text-[#d32f2f] tracking-tight">
                {summary.cumulativeGpa.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-gray-400">/ 4.00</span>
            </div>
          </div>
          {/* Subtle decorative blue bar on left matching screenshot */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1d3557] rounded-l-2xl"></div>
        </div>

        {/* 2. Grade */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">GRADE</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
              {summary.gradeLetter}
            </p>
          </div>
        </div>

        {/* 3. Earned Hours */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">EARNED HOURS</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {summary.earnedHours}
              </span>
              <span className="text-xs font-semibold text-gray-500">hrs</span>
            </div>
          </div>
        </div>

        {/* 4. Level */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">LEVEL</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-0.5">
              {summary.level}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Rows (GPA Scale & Academic Levels) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* GPA Scale Accordion */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all">
          <button
            onClick={() => setScaleOpen(!scaleOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/70 transition-colors focus:outline-hidden"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <Info className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-gray-700 uppercase">
                GPA SCALE
              </span>
            </div>
            {scaleOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {scaleOpen && (
            <div className="px-5 pb-5 pt-1 border-t border-gray-100 animate-in fade-in duration-150">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px] font-semibold">
                      <th className="py-2">Grade</th>
                      <th className="py-2">Marks Range</th>
                      <th className="py-2">Grade Points</th>
                      <th className="py-2">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {GPA_SCALE_RULES.map((rule) => (
                      <tr key={rule.grade} className="hover:bg-gray-50/50">
                        <td className="py-2 font-bold text-gray-800">{rule.grade}</td>
                        <td className="py-2 text-gray-600">{rule.minMark}% – {rule.maxMark}%</td>
                        <td className="py-2 font-mono font-semibold text-gray-700">{rule.points.toFixed(2)}</td>
                        <td className="py-2 text-gray-500">{rule.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Academic Levels Accordion */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden transition-all">
          <button
            onClick={() => setLevelsOpen(!levelsOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/70 transition-colors focus:outline-hidden"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-gray-700 uppercase">
                ACADEMIC LEVELS
              </span>
            </div>
            {levelsOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {levelsOpen && (
            <div className="px-5 pb-5 pt-1 border-t border-gray-100 animate-in fade-in duration-150">
              <div className="space-y-2 text-xs">
                {ACADEMIC_LEVELS.map((lvl) => (
                  <div
                    key={lvl.level}
                    className={`flex items-center justify-between p-2.5 rounded-lg border ${
                      summary.level === lvl.level
                        ? 'bg-blue-50/60 border-blue-200 font-semibold text-blue-900'
                        : 'bg-gray-50/50 border-gray-100 text-gray-700'
                    }`}
                  >
                    <span>Level {lvl.level}: {lvl.name}</span>
                    <span className="font-mono text-gray-500">{lvl.creditHours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Term Blocks List */}
      <div className="space-y-5">
        {DEMO_TERMS.map((term) => {
          const stats = termStats[term.id];

          return (
            <div
              key={term.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden"
            >
              {/* Term Header */}
              <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-gray-900 tracking-tight">
                    {term.term}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                    {term.year}
                  </span>
                  {term.status === 'Posted' ? (
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                      Posted
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                      Grades Not Posted
                    </span>
                  )}
                </div>

                {/* Term GPA if posted */}
                {term.status === 'Posted' && stats && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">GPA</span>
                    <span className="text-base font-extrabold text-[#d32f2f] bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-100 font-mono">
                      {stats.termGpa.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Term Content */}
              {term.courses.length === 0 ? (
                /* Empty state matching Screenshot_2.png */
                <div className="py-12 text-center text-sm text-gray-400 font-medium">
                  No grades available for this term.
                </div>
              ) : (
                /* Table matching Screenshot_2.png */
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                        <th className="py-3 px-5">COURSE</th>
                        <th className="py-3 px-4 text-center">CREDIT HOURS</th>
                        <th className="py-3 px-4 text-center">MARKS</th>
                        <th className="py-3 px-4 text-center">GRADE</th>
                        <th className="py-3 px-4 text-center">POINTS</th>
                        <th className="py-3 px-5 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs">
                      {term.courses.map((course) => {
                        const isFail = course.status === 'Fail';

                        return (
                          <tr key={course.code} className="hover:bg-gray-50/60 transition-colors">
                            {/* Course name & code */}
                            <td className="py-3 px-5">
                              <p className="font-semibold text-gray-900 leading-snug">
                                {course.code}-{course.name}
                              </p>
                              <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                                {course.code}
                              </p>
                              {course.notes && (
                                <p className="text-[11px] text-red-500 font-arabic mt-0.5">
                                  {course.notes}
                                </p>
                              )}
                            </td>

                            {/* Credit Hours */}
                            <td className="py-3 px-4 text-center font-medium text-gray-800">
                              {course.creditHours}
                            </td>

                            {/* Marks */}
                            <td className="py-3 px-4 text-center font-medium text-gray-800">
                              {course.marks !== null ? course.marks.toFixed(1) : '-'}
                            </td>

                            {/* Grade pill */}
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                  isFail
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                {course.grade}
                              </span>
                            </td>

                            {/* Points */}
                            <td className="py-3 px-4 text-center font-mono font-medium text-gray-700">
                              {course.points !== null && !isFail ? course.points.toFixed(1) : '–'}
                            </td>

                            {/* Status */}
                            <td className="py-3 px-5 text-right">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                  isFail
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {course.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footnote UNOFFICIAL DEMO */}
      <div className="pt-2">
        <UnofficialDemoBadge variant="card" />
      </div>
    </div>
  );
};
