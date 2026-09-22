import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  variant?: 'topbar' | 'banner' | 'card';
  className?: string;
}

export const UnofficialDemoBadge: React.FC<Props> = ({ variant = 'topbar', className = '' }) => {
  if (variant === 'topbar') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs select-none ${className}`}
        title="Demonstration site - not an official university service"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        <span className="tracking-wide">UNOFFICIAL DEMO</span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-amber-50/90 border border-amber-200 text-amber-900 px-4 py-2 rounded-lg text-xs flex items-center justify-between shadow-xs ${className}`}>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Unofficial Demonstration:</strong> This portal is a mock interface demonstration created for portfolio/academic review purposes only. It is not affiliated with or endorsed by Helwan National University.
          </span>
        </div>
        <span className="text-[11px] font-mono uppercase bg-amber-200/60 text-amber-800 px-2 py-0.5 rounded ml-2 shrink-0">
          DEMO MODE
        </span>
      </div>
    );
  }

  return (
    <div className={`p-2.5 bg-slate-100/80 rounded-md border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
      <span>Mock demonstration records only. Not an official academic document.</span>
    </div>
  );
};
