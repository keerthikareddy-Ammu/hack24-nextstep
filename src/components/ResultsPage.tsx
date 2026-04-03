import { useState } from 'react';
import {
  Code, Globe, Heart, Microscope, Palette, Paintbrush,
  BarChart, TrendingUp, Cog, PenTool, Briefcase,
  CheckCircle, ArrowLeft, BookOpen, Target
} from 'lucide-react';
import { Career, User, UserProgress } from '../types';
import CareerRoadmap from './CareerRoadmap';
import ProfilePanel from './ProfilePanel';

interface ResultsPageProps {
  careers: Career[];
  onStartOver: () => void;
  user: User;
  progress: UserProgress;
  onProgressChange: (careerId: string, completedSteps: number[]) => void;
  onLogout: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Globe, Heart, Microscope, Palette, Paintbrush,
  BarChart, TrendingUp, Cog, PenTool, Briefcase,
};

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-200',   gradient: 'from-blue-500 to-blue-600' },
  green:  { bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-200',  gradient: 'from-green-500 to-green-600' },
  red:    { bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200',    gradient: 'from-red-500 to-red-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
  pink:   { bg: 'bg-pink-50',   text: 'text-pink-600',   border: 'border-pink-200',   gradient: 'from-pink-500 to-pink-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', gradient: 'from-indigo-500 to-indigo-600' },
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-600',   border: 'border-teal-200',   gradient: 'from-teal-500 to-teal-600' },
  gray:   { bg: 'bg-gray-50',   text: 'text-gray-600',   border: 'border-gray-200',   gradient: 'from-gray-500 to-gray-600' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', gradient: 'from-yellow-500 to-yellow-600' },
};

const bgStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#f0f4ff',
  backgroundImage: `
    radial-gradient(ellipse 90% 70% at 0% 0%, rgba(199,210,254,0.7) 0%, transparent 55%),
    radial-gradient(ellipse 70% 70% at 100% 100%, rgba(187,247,208,0.55) 0%, transparent 55%),
    radial-gradient(ellipse 55% 55% at 55% 45%, rgba(238,242,255,0.6) 0%, transparent 65%),
    url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%234f46e5' fill-opacity='0.06'/%3E%3C/svg%3E")
  `,
};

export default function ResultsPage({ careers, onStartOver, user, progress, onProgressChange, onLogout }: ResultsPageProps) {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  if (selectedCareer) {
    return (
      <CareerRoadmap
        career={selectedCareer}
        onBack={() => setSelectedCareer(null)}
        onStartOver={onStartOver}
        progress={progress}
        onProgressChange={onProgressChange}
      />
    );
  }

  return (
    <div style={bgStyle}>
      {/* Decorative orbs */}
      <div style={{
        position: 'fixed', top: '-120px', left: '-120px', width: '480px', height: '480px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-150px', right: '-150px', width: '560px', height: '560px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="relative container mx-auto px-4 py-12" style={{ zIndex: 1 }}>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onStartOver}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Start Over</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="/logo.jpeg"
              alt="Next Step Logo"
              className="w-8 h-8 object-contain rounded-lg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-widest uppercase hidden sm:block">NEXT STEP</span>
          </div>

          <ProfilePanel
            user={user}
            progress={progress}
            careers={careers}
            onLogout={onLogout}
          />
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 rounded-full p-4 shadow-md">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Your Perfect Career Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your interests and skills, here are the top career paths we recommend for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {careers.map((career, index) => {
            const Icon = iconMap[career.icon] || Briefcase;
            const colors = colorMap[career.color] || colorMap.blue;
            const done = progress[career.id]?.length || 0;
            const total = career.roadmap_steps.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div
                key={career.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/60 hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-slide-up"
                style={{ boxShadow: '0 4px 24px rgba(79,70,229,0.08)', animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-3" />
                  <h3 className="text-2xl font-bold">{career.name}</h3>
                  {pct > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-white/80 mb-1">
                        <span>Progress</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-700 leading-relaxed">{career.description}</p>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className={`w-5 h-5 ${colors.text}`} />
                      <h4 className="font-semibold text-gray-800">Required Skills</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {career.required_skills.slice(0, 4).map((skill) => (
                        <span key={skill} className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium`}>
                          {skill}
                        </span>
                      ))}
                      {career.required_skills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          +{career.required_skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className={`w-5 h-5 ${colors.text}`} />
                      <h4 className="font-semibold text-gray-800">Suggested Courses</h4>
                    </div>
                    <ul className="space-y-1">
                      {career.suggested_courses.slice(0, 3).map((course) => (
                        <li key={course} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedCareer(career)}
                    className={`w-full py-3 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105 active:scale-95`}
                  >
                    {pct > 0 ? `Resume Roadmap (${pct}%)` : 'View Career Roadmap'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60 max-w-4xl mx-auto"
          style={{ boxShadow: '0 4px 24px rgba(79,70,229,0.08)' }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Explore Roadmaps</h3>
              <p className="text-sm text-gray-600">Click on any career to see detailed step-by-step guidance</p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Start Learning</h3>
              <p className="text-sm text-gray-600">Begin with the suggested courses to build your foundation</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Mark steps complete and watch your progress grow</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
