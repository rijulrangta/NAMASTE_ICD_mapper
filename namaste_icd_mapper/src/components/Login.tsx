import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Loader2, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [abhaToken, setAbhaToken] = useState('test-token');
  const { login, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login('test-token');
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-20 animate-pulse ${
          isDark ? 'bg-blue-500' : 'bg-blue-200'
        }`}></div>
        <div className={`absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 rounded-full opacity-20 animate-pulse delay-2000 ${
          isDark ? 'bg-indigo-500' : 'bg-indigo-200'
        }`}></div>
      </div>

      {/* Theme Toggle Button - Fixed to top-right corner */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 p-2 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
          isDark 
            ? 'text-gray-400 hover:text-white hover:bg-gray-700/80 border-gray-600' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 border-gray-200'
        }`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className={`relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-lg border transition-all duration-500 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700 shadow-blue-500/20' 
          : 'bg-white/80 border-white/50 shadow-gray-500/20'
      }`}>
        <div className="text-center mb-6 sm:mb-8">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center ${
            isDark ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            MedLink
          </h1>
          <p className={`text-xs sm:text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Advanced Medical Diagnosis System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="abhaToken" 
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              ABHA Token
            </label>
            <input
              id="abhaToken"
              type="text"
              value={abhaToken}
              onChange={(e) => setAbhaToken(e.target.value)}
              placeholder="Enter your ABHA Token"
              required
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !abhaToken.trim()}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isLoading || !abhaToken.trim()
                ? isDark 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <div className={`mt-6 text-center text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          
        </div>
      </div>
    </div>
  );
};

export default Login;