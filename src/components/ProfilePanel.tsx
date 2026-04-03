import { useState, useRef, useEffect } from 'react';
import { LogOut, User as UserIcon, BookOpen, TrendingUp } from 'lucide-react';
import { User, UserProgress, Career } from '../types';

interface ProfilePanelProps {
  user: User;
  progress: UserProgress;
  careers: Career[];
  onLogout: () => void;
}

export default function ProfilePanel({ user, progress, careers, onLogout }: ProfilePanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const totalSteps = careers.reduce((sum, c) => sum + c.roadmap_steps.length, 0);
  const completedSteps = careers.reduce((sum, c) => {
    return sum + (progress[c.id]?.length || 0);
  }, 0);
  const overallPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div ref={ref} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-full pl-1 pr-3 py-1 hover:border-blue-400 hover:shadow-md transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name.split(' ')[0]}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

          {/* Profile Header with logo + app name */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.jpeg"
                  alt="Next Step Logo"
                  className="w-6 h-6 object-contain rounded-md bg-white/20 p-0.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-xs font-extrabold tracking-widest uppercase bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">NEXT STEP</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                {initials}
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">{user.name}</p>
                <p className="text-blue-100 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">

            {/* Education */}
            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
              <BookOpen className="text-blue-500 flex-shrink-0" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Education</p>
                <p className="text-sm text-gray-800 font-semibold">{user.educationLevel || 'Not specified'}</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-green-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-500" size={18} />
                <p className="text-xs text-gray-500 font-medium">Overall Progress</p>
                <span className="ml-auto text-sm font-bold text-green-600">{overallPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{completedSteps} of {totalSteps} steps completed</p>
            </div>

            {/* Per-career progress */}
            {careers.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Career Progress</p>
                {careers.map(career => {
                  const done = progress[career.id]?.length || 0;
                  const total = career.roadmap_steps.length;
                  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                  return (
                    <div key={career.id} className="flex items-center gap-3">
                      <p className="text-xs text-gray-700 w-32 truncate flex-shrink-0">{career.name}</p>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-green-400 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Logout */}
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-100 text-red-500 rounded-xl hover:bg-red-50 transition-all text-sm font-medium"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
