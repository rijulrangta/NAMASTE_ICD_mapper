import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Sun, Moon, Activity } from 'lucide-react';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              MediDiagnosis
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={logout}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isDark 
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;