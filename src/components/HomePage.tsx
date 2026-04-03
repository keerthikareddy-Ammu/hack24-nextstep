import { useState } from 'react';
import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { FormData } from '../types';

interface HomePageProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const SKILLS_OPTIONS = [
  'Programming (Python/Java/C++)',
  'HTML/CSS',
  'JavaScript',
  'Data Structures',
  'Problem Solving',
  'Biology',
  'Chemistry',
  'Mathematics',
  'Physics',
  'Design Tools (Figma/Adobe)',
  'Communication',
  'Writing',
  'Research',
  'Analytics',
  'Marketing',
  'CAD Software',
  'Laboratory Skills',
];

const EDUCATION_LEVELS = [
  'High School (10th)',
  'Intermediate (12th)',
  'Undergraduate (B.Tech/B.Sc/BA)',
  'Postgraduate (M.Tech/M.Sc/MBA)',
  'PhD/Doctorate',
];

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

export default function HomePage({ onSubmit, isLoading }: HomePageProps) {
  const [formData, setFormData] = useState<FormData>({
    interest: '',
    skills: [],
    educationLevel: '',
  });

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interest && formData.skills.length > 0 && formData.educationLevel) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.interest && formData.skills.length > 0 && formData.educationLevel;

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
      <div style={{
        position: 'fixed', top: '40%', right: '5%', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="relative container mx-auto px-4 py-12" style={{ zIndex: 1 }}>

        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-6">
            <img
              src="/logo.jpeg"
              alt="Next Step Logo"
              className="w-16 h-16 object-contain rounded-2xl shadow-md"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent font-extrabold tracking-widest uppercase">NEXT STEP</span>
            </h1>
          </div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover your perfect career path based on your interests, skills, and education.
            Our intelligent system analyzes your profile and recommends the best opportunities for you.
          </p>

          <div className="flex justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-sm">
              <Target className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium">Personalized Recommendations</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white shadow-sm">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">Career Roadmaps</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/60"
            style={{ boxShadow: '0 12px 60px rgba(79,70,229,0.10), 0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Tell Us About Yourself
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  What are you interested in? 🎯
                </label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="e.g., coding, biology, design, writing, marketing..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all outline-none bg-white/70"
                  required
                />
                <p className="text-sm text-gray-500">
                  Describe your passions, hobbies, or subjects you enjoy learning about
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  Select Your Skills 💪
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-4 border-2 border-gray-200 rounded-xl bg-gray-50/80">
                  {SKILLS_OPTIONS.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        formData.skills.includes(skill)
                          ? 'bg-indigo-500 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Select all skills you have or want to develop ({formData.skills.length} selected)
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-700">
                  Education Level 🎓
                </label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all outline-none bg-white/70"
                  required
                >
                  <option value="">Choose your education level</option>
                  {EDUCATION_LEVELS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-5 text-xl font-bold rounded-xl transition-all transform ${
                  isFormValid && !isLoading
                    ? 'text-white hover:scale-105 hover:shadow-2xl active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={isFormValid && !isLoading ? {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 60%, #0d9488 100%)',
                  boxShadow: '0 6px 30px rgba(79,70,229,0.35)',
                } : {}}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Finding Your Perfect Career...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Discover My Career Path
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
