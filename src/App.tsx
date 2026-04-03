import { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import { Career, FormData, User, UserProgress } from './types';

type AppState = 'auth' | 'home' | 'results';

const PROGRESS_KEY = 'career_app_progress';

function loadProgress(email: string): UserProgress {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    return all[email] || {};
  } catch {
    return {};
  }
}

function saveProgress(email: string, progress: UserProgress) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    all[email] = progress;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}

function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>({});

  // When user logs in, load their saved progress
  const handleAuth = (loggedInUser: User) => {
    setUser(loggedInUser);
    setProgress(loadProgress(loggedInUser.email));
    setAppState('home');
  };

  const handleProgressChange = (careerId: string, completedSteps: number[]) => {
    if (!user) return;
    const updated = { ...progress, [careerId]: completedSteps };
    setProgress(updated);
    saveProgress(user.email, updated);
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-career-recommendations`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          interest: formData.interest,
          skills: formData.skills,
          educationLevel: formData.educationLevel,
        }),
      });

      if (!response.ok) throw new Error('Failed to get recommendations');

      const data = await response.json();

      if (data.success && data.careers) {
        setCareers(data.careers);
        setAppState('results');
      } else {
        throw new Error(data.error || 'Failed to get recommendations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setAppState('home');
    setCareers([]);
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('career_app_last_email');
    setUser(null);
    setProgress({});
    setCareers([]);
    setError(null);
    setAppState('auth');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleStartOver}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {appState === 'auth' && <AuthPage onAuth={handleAuth} />}
      {appState === 'home' && (
        <HomePage onSubmit={handleFormSubmit} isLoading={isLoading} />
      )}
      {appState === 'results' && user && (
        <ResultsPage
          careers={careers}
          onStartOver={handleStartOver}
          user={user}
          progress={progress}
          onProgressChange={handleProgressChange}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
