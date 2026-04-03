import { useState } from 'react';
import { ArrowLeft, CheckCircle, Target, BookOpen, Zap, ChevronDown, ExternalLink } from 'lucide-react';
import { Career, UserProgress } from '../types';

interface CareerRoadmapProps {
  career: Career;
  onBack: () => void;
  onStartOver: () => void;
  progress: UserProgress;
  onProgressChange: (careerId: string, completedSteps: number[]) => void;
}

function getStepDescription(step: string, index: number, careerName: string): string {
  const intros = [
    `This is your first and most important milestone. ${step} — laying this foundation will define how quickly you grow in ${careerName}. Focus on understanding core concepts deeply before moving on, since everything else builds on what you establish here.`,
    `With your foundation set, it's time to build upward. ${step} — this phase is about turning knowledge into capability. Expect some challenges here; they're a sign you're pushing past the beginner stage into real competence.`,
    `You're now entering intermediate territory. ${step} — real-world application becomes central at this point. Start working on small projects or collaborations that let you practice in realistic contexts, not just exercises.`,
    `This step marks a meaningful leap in your career trajectory. ${step} — you're developing specialized depth that makes you stand out. Seek mentors, communities, or peer groups who are at a similar level or beyond.`,
    `By now you have solid skills to build on. ${step} — your focus should shift toward portfolio quality and professional presence. Document your progress publicly; it opens doors faster than most other strategies.`,
    `This is where many people plateau — don't let that be you. ${step} — push through this stage with consistency. The difference between good and great often comes down to showing up during the hard middle part.`,
  ];
  return intros[index] ?? `An important milestone on your journey to becoming a ${careerName}. ${step} — take this step seriously, invest the right time, and use every resource available to you.`;
}

export default function CareerRoadmap({ career, onBack, onStartOver, progress, onProgressChange }: CareerRoadmapProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const colorMap: Record<string, { gradient: string; light: string; text: string; border: string; learnBtn: string; checkbox: string }> = {
    blue:   { gradient: 'from-blue-500 to-blue-600',     light: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-300',   learnBtn: 'bg-blue-600 hover:bg-blue-700',   checkbox: 'accent-blue-600' },
    green:  { gradient: 'from-green-500 to-green-600',   light: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-300',  learnBtn: 'bg-green-600 hover:bg-green-700', checkbox: 'accent-green-600' },
    red:    { gradient: 'from-red-500 to-red-600',       light: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-300',    learnBtn: 'bg-red-600 hover:bg-red-700',     checkbox: 'accent-red-600' },
    purple: { gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-300', learnBtn: 'bg-purple-600 hover:bg-purple-700', checkbox: 'accent-purple-600' },
    pink:   { gradient: 'from-pink-500 to-pink-600',     light: 'bg-pink-50',   text: 'text-pink-600',   border: 'border-pink-300',   learnBtn: 'bg-pink-600 hover:bg-pink-700',   checkbox: 'accent-pink-600' },
    orange: { gradient: 'from-orange-500 to-orange-600', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-300', learnBtn: 'bg-orange-600 hover:bg-orange-700', checkbox: 'accent-orange-600' },
    indigo: { gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-300', learnBtn: 'bg-indigo-600 hover:bg-indigo-700', checkbox: 'accent-indigo-600' },
    teal:   { gradient: 'from-teal-500 to-teal-600',     light: 'bg-teal-50',   text: 'text-teal-600',   border: 'border-teal-300',   learnBtn: 'bg-teal-600 hover:bg-teal-700',   checkbox: 'accent-teal-600' },
    gray:   { gradient: 'from-gray-500 to-gray-600',     light: 'bg-gray-50',   text: 'text-gray-600',   border: 'border-gray-300',   learnBtn: 'bg-gray-600 hover:bg-gray-700',   checkbox: 'accent-gray-600' },
    yellow: { gradient: 'from-yellow-500 to-yellow-600', light: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-300', learnBtn: 'bg-yellow-600 hover:bg-yellow-700', checkbox: 'accent-yellow-600' },
  };

  const colors = colorMap[career.color] || colorMap.blue;
  const completedSteps = progress[career.id] || [];
  const totalSteps = career.roadmap_steps.length;
  const completedCount = completedSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const toggleStep = (index: number) => {
    const current = progress[career.id] || [];
    const updated = current.includes(index)
      ? current.filter(i => i !== index)
      : [...current, index];
    onProgressChange(career.id, updated);
  };

  const getLearnUrl = (step: string): { url: string; label: string } => {
    const name = career.name.toLowerCase();
    const query = encodeURIComponent(`${step} ${career.name}`);

    if (name.includes('software') || name.includes('developer') || name.includes('engineer') || name.includes('programming') || name.includes('coding') || name.includes('web') || name.includes('data')) {
      return { url: `https://www.freecodecamp.org/news/search/?query=${query}`, label: 'Learn on freeCodeCamp' };
    }
    if (name.includes('design') || name.includes('ui') || name.includes('ux') || name.includes('graphic')) {
      return { url: `https://www.coursera.org/search?query=${query}`, label: 'Learn on Coursera' };
    }
    if (name.includes('data science') || name.includes('machine learning') || name.includes('ai') || name.includes('analyst')) {
      return { url: `https://www.kaggle.com/learn`, label: 'Learn on Kaggle' };
    }
    if (name.includes('medical') || name.includes('doctor') || name.includes('health') || name.includes('nurse') || name.includes('biology')) {
      return { url: `https://www.khanacademy.org/search?page_search_query=${query}`, label: 'Learn on Khan Academy' };
    }
    if (name.includes('finance') || name.includes('accounting') || name.includes('banking') || name.includes('business')) {
      return { url: `https://www.investopedia.com/search#q=${query}`, label: 'Learn on Investopedia' };
    }
    if (name.includes('marketing') || name.includes('content') || name.includes('seo') || name.includes('social media')) {
      return { url: `https://www.hubspot.com/resources/search#q=${query}`, label: 'Learn on HubSpot' };
    }
    if (name.includes('science') || name.includes('research') || name.includes('chemistry') || name.includes('physics')) {
      return { url: `https://www.khanacademy.org/search?page_search_query=${query}`, label: 'Learn on Khan Academy' };
    }
    // Default fallback: YouTube search
    return { url: `https://www.youtube.com/results?search_query=${query}`, label: 'Learn on YouTube' };
  };

  const toggleExpand = (index: number) => {
    setExpandedStep(prev => (prev === index ? null : index));
  };

  const pageBgStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#f0f4ff',
    backgroundImage: `
      radial-gradient(ellipse 90% 70% at 0% 0%, rgba(199,210,254,0.7) 0%, transparent 55%),
      radial-gradient(ellipse 70% 70% at 100% 100%, rgba(187,247,208,0.55) 0%, transparent 55%),
      radial-gradient(ellipse 55% 55% at 55% 45%, rgba(238,242,255,0.6) 0%, transparent 65%),
      url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%234f46e5' fill-opacity='0.06'/%3E%3C/svg%3E")
    `,
  };

  return (
    <div style={pageBgStyle}>
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

        {/* Top nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Results</span>
            </button>
            <button
              onClick={onStartOver}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="font-medium">Start Over</span>
            </button>
          </div>

          {/* Logo + name */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpeg"
              alt="Next Step Logo"
              className="w-8 h-8 object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-widest uppercase hidden sm:block">NEXT STEP</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-r ${colors.gradient} rounded-3xl shadow-2xl p-8 md:p-12 text-white mb-8`}>
            <h1 className="text-5xl font-bold mb-4">{career.name}</h1>
            <p className="text-xl opacity-90 leading-relaxed">{career.description}</p>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white/80">Your Progress</span>
                <span className="text-sm font-bold text-white">{completedCount}/{totalSteps} steps — {progressPercent}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {progressPercent === 100 && (
                <p className="text-white font-semibold mt-2 text-center">🎉 Roadmap Complete! Congratulations!</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60" style={{ boxShadow: '0 4px 24px rgba(79,70,229,0.08)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`${colors.light} p-3 rounded-xl`}>
                  <Target className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Required Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.required_skills.map((skill) => (
                  <span key={skill} className={`px-3 py-1.5 ${colors.light} ${colors.text} rounded-full text-sm font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60" style={{ boxShadow: '0 4px 24px rgba(79,70,229,0.08)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`${colors.light} p-3 rounded-xl`}>
                  <BookOpen className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Suggested Courses</h2>
              </div>
              <ul className="space-y-2">
                {career.suggested_courses.map((course) => (
                  <li key={course} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60" style={{ boxShadow: '0 4px 24px rgba(79,70,229,0.08)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`${colors.light} p-3 rounded-xl`}>
                <Zap className={`w-6 h-6 ${colors.text}`} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Your Roadmap to Success</h2>
            </div>
            <p className="text-sm text-gray-500 mb-8 ml-1">
              Expand a step to learn more. Tick the <strong>"Task Completed"</strong> checkbox only when you've actually finished the task — that's what updates your progress.
            </p>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>

              <div className="space-y-8">
                {career.roadmap_steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(index);
                  const isExpanded = expandedStep === index;
                  const searchQuery = encodeURIComponent(`${career.name} ${step}`);
                  const googleUrl = `https://www.google.com/search?q=${searchQuery}`;
                  const description = getStepDescription(step, index, career.name);

                  return (
                    <div key={index} className="relative flex gap-6 group">

                      {/* Step number circle (visual only) */}
                      <div
                        className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500 text-white ring-4 ring-green-200'
                            : `bg-gradient-to-r ${colors.gradient} text-white`
                        }`}
                      >
                        {isCompleted ? '✅' : index + 1}
                      </div>

                      {/* Step card */}
                      <div className={`flex-1 rounded-xl border-2 transition-all ${
                        isCompleted
                          ? 'bg-green-50 border-green-300 opacity-80'
                          : isExpanded
                          ? `bg-gradient-to-r from-gray-50 to-white ${colors.border} shadow-lg`
                          : 'bg-gradient-to-r from-gray-50 to-white border-gray-100 group-hover:border-blue-300 group-hover:shadow-lg'
                      }`}>

                        {/* Top row: step title + expand toggle */}
                        <div className="flex items-stretch">
                          <div className="flex-1 p-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-xl font-semibold ${isCompleted ? 'text-green-700' : 'text-gray-800'}`}>
                                Step {index + 1}
                              </h3>
                            </div>
                            <p className={`leading-relaxed ${isCompleted ? 'text-green-600' : 'text-gray-700'}`}>{step}</p>
                          </div>

                          {/* Expand chevron button */}
                          <button
                            onClick={() => toggleExpand(index)}
                            className={`px-4 flex items-center border-l ${isCompleted ? 'border-green-200' : 'border-gray-200'} ${colors.text} hover:bg-gray-100 transition-colors rounded-r-xl`}
                            title={isExpanded ? 'Collapse' : 'Expand description'}
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        {/* Expanded: description + Learn button + Search link */}
                        {isExpanded && (
                          <div className={`px-6 pb-6 border-t ${isCompleted ? 'border-green-200' : colors.border} pt-4`}>
                            <p className="text-gray-600 leading-relaxed text-sm mb-5">{description}</p>
                            <div className="flex flex-wrap gap-3">
                              {(() => {
                                const { url, label } = getLearnUrl(step);
                                return (
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.learnBtn} text-white text-sm font-semibold rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    {label}
                                  </a>
                                );
                              })()}
                              <a
                                href={googleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Search on Google
                              </a>
                            </div>
                          </div>
                        )}

                        {/* ── Task Completed checkbox ── */}
                        <div className={`px-6 py-3 border-t flex items-center gap-3 rounded-b-xl ${
                          isCompleted
                            ? 'border-green-200 bg-green-100/60'
                            : 'border-gray-100 bg-gray-50'
                        }`}>
                          <input
                            type="checkbox"
                            id={`task-done-${index}`}
                            checked={isCompleted}
                            onChange={() => toggleStep(index)}
                            className={`w-5 h-5 rounded cursor-pointer ${colors.checkbox}`}
                          />
                          <label
                            htmlFor={`task-done-${index}`}
                            className={`text-sm font-semibold cursor-pointer select-none ${
                              isCompleted ? 'text-green-700' : 'text-gray-500'
                            }`}
                          >
                            {isCompleted ? '✅ Task Completed' : 'Mark as Task Completed'}
                          </label>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Ready to Start?</h3>
              <p className="text-gray-700 mb-4">
                Follow these steps sequentially to build a strong foundation and achieve your career goals.
                Remember, consistency and dedication are key to success!
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Stay Consistent</span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Build Projects</span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Network</span>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Never Stop Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
