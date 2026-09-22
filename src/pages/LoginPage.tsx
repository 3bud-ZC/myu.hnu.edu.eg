import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UnofficialDemoBadge } from '../components/Layout/UnofficialDemoBadge';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('942250190');
  const [password, setPassword] = useState('942250190');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password, rememberMe);
      if (result.success) {
        navigate('/transcript');
      } else {
        setError(result.error || 'Login failed');
        setIsLoading(false);
      }
    }, 300);
  };

  const handleFillDemo = () => {
    setUsername('942250190');
    setPassword('942250190');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#14233c] to-[#0d1829] flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Top Demo Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <UnofficialDemoBadge variant="topbar" />
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-9 border border-slate-100 flex flex-col items-center">
        {/* HNU App Icon Logo */}
        <div className="w-16 h-16 rounded-2xl bg-[#1b3457] border border-[#2b4d7c] flex items-center justify-center font-extrabold text-white text-xl tracking-wider shadow-md">
          HNU
        </div>

        {/* Header Titles */}
        <h2 className="text-2xl font-bold text-gray-900 mt-5 tracking-tight">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to your student portal</p>

        {/* Demo Quick Notice */}
        <div className="mt-4 w-full bg-[#f0f6ff] border border-[#d2e3fc] rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
            <span>Demo: <strong>942250190</strong> / <strong>942250190</strong></span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline ml-2"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 w-full p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full mt-5 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="username">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Student ID / Username"
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#edf3f9] border border-[#cbd9e7] focus:border-[#204d80] focus:bg-white rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors outline-hidden focus:ring-2 focus:ring-[#204d80]/15"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-[#edf3f9] border border-[#cbd9e7] focus:border-[#204d80] focus:bg-white rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 transition-colors outline-hidden focus:ring-2 focus:ring-[#204d80]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-hidden"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#204d80] rounded border-gray-300 focus:ring-[#204d80]"
            />
            <label htmlFor="remember-me" className="text-xs text-gray-600 cursor-pointer select-none">
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#244f80] hover:bg-[#1b3d64] text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-150 transform active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer inside card */}
        <div className="w-full border-t border-gray-100 mt-7 pt-5 text-center">
          <p className="text-xs font-semibold text-gray-600">Helwan National University</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Student Information System</p>
        </div>
      </div>

      {/* Safety Notice Footer */}
      <p className="text-[11px] text-slate-400 mt-6 text-center max-w-sm">
        Unofficial UI Demo for demonstration & portfolio purposes. Not an official portal.
      </p>
    </div>
  );
};
