import { useState, useEffect } from 'react';
import { User as UserIcon, Mail, BookOpen, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface AuthPageProps {
  onAuth: (user: User) => void;
}

const EDUCATION_LEVELS = [
  'High School (10th)',
  'Intermediate (12th)',
  'Undergraduate (B.Tech/B.Sc/BA)',
  'Postgraduate (M.Tech/M.Sc/MBA)',
  'PhD/Doctorate',
];

const STORAGE_KEY = 'career_app_users';

function getSavedUsers(): Record<string, User> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

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

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', educationLevel: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const lastEmail = localStorage.getItem('career_app_last_email');
    if (lastEmail) {
      const users = getSavedUsers();
      if (users[lastEmail]) {
        onAuth(users[lastEmail]);
        return;
      }
    }
  }, []);

  const handleSubmit = () => {
    setError('');
    const users = getSavedUsers();
    if (mode === 'login') {
      if (!form.email.trim()) { setError('Please enter your email.'); return; }
      const existing = users[form.email.toLowerCase()];
      if (!existing) { setError('No account found. Please register first.'); return; }
      localStorage.setItem('career_app_last_email', form.email.toLowerCase());
      onAuth(existing);
    } else {
      if (!form.name.trim() || !form.email.trim() || !form.educationLevel) {
        setError('Please fill in all fields.');
        return;
      }
      const newUser: User = {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        educationLevel: form.educationLevel,
      };
      users[newUser.email] = newUser;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem('career_app_last_email', newUser.email);
      onAuth(newUser);
    }
  };

  return (
    <div style={bgStyle} className="flex items-center justify-center p-4">

      {/* Decorative blurred orbs */}
      <div style={{
        position: 'fixed', top: '-80px', left: '-80px', width: '340px', height: '340px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px', width: '420px', height: '420px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/60"
        style={{ boxShadow: '0 8px 48px rgba(79,70,229,0.10), 0 2px 8px rgba(0,0,0,0.06)' }}>

        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logo.jpeg"
              alt="Next Step Logo"
              className="w-16 h-16 object-contain rounded-2xl shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-extrabold tracking-widest uppercase">NEXT STEP</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login' ? 'Sign in to continue your career journey' : 'Join to discover your career roadmap'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); setForm({ name: '', email: '', educationLevel: '' }); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setForm({ name: '', email: '', educationLevel: '' }); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/70"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/70"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={form.educationLevel}
                  onChange={e => setForm(f => ({ ...f, educationLevel: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white appearance-none"
                >
                  <option value="">Select your education level</option>
                  {EDUCATION_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all text-white"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)', boxShadow: '0 4px 20px rgba(79,70,229,0.3)' }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
