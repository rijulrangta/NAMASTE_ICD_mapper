import SmartSearchInput from './SmartSearchInput';
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { DiagnosisResult } from '../types';
import { searchDiagnosis, confirmDiagnosis } from '../services/api';
import { Search, Loader2, CheckCircle, Edit3, Code, Database } from 'lucide-react';
import Header from './Header';

const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const [diagnosisName, setDiagnosisName] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosisName.trim()) return;

    setIsSearching(true);
    const result = await searchDiagnosis(diagnosisName);
    setDiagnosisResult(result);
    setIsSearching(false);
  };

  const handleConfirm = async () => {
    if (!diagnosisResult) return;

    setIsConfirming(true);
    await confirmDiagnosis(diagnosisResult);
    setIsConfirming(false);

    setDiagnosisName('');
    setDiagnosisResult(null);
  };

  const handleEdit = () => setDiagnosisResult(null);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      }`}
    >
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Card */}
        <div
          className={`rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-500 ${
            isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-white/50'
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <h2
              className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Diagnosis Code Lookup
            </h2>

            <form onSubmit={handleSearch} className="mb-6 sm:mb-8">
              <label
                htmlFor="diagnosis"
                className={`block text-base font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Diagnosis Name
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1">
                  <SmartSearchInput
                    value={diagnosisName}
                    onChange={setDiagnosisName}
                    onSelect={(val) => setDiagnosisName(val)}
                    isDark={isDark}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching || !diagnosisName.trim()}
                  className={`h-12 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSearching || !diagnosisName.trim()
                      ? isDark
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">{isSearching ? 'Searching...' : 'Search for ICD-11 Codes'}</span>
                  <span className="sm:hidden">{isSearching ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
            </form>

            {/* Diagnosis Result Card */}
            {diagnosisResult && (
              <div
                className={`rounded-xl border p-4 sm:p-6 transition-all duration-500 glass-card ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600'
                    : 'bg-blue-50/50 border-blue-200'
                }`}
              >
                <h3
                  className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center space-x-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span className="break-words">Diagnosis Codes for "{diagnosisResult.diagnosisName}"</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {[
                    { 
                      code: diagnosisResult.namasteCode, 
                      label: 'NAMASTE Code', 
                      iconColor: 'text-emerald-500',
                      labelColor: isDark ? 'text-emerald-100 font-bold' : 'text-emerald-800 font-bold',
                      bgColor: isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                    },
                    { 
                      code: diagnosisResult.icd11TM2Code, 
                      label: 'ICD-11 TM2 Code', 
                      iconColor: 'text-blue-500',
                      labelColor: isDark ? 'text-blue-100 font-bold' : 'text-blue-800 font-bold',
                      bgColor: isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
                    },
                    { 
                      code: diagnosisResult.icd11BiomedCode, 
                      label: 'ICD-11 Biomed Code', 
                      iconColor: 'text-purple-500',
                      labelColor: isDark ? 'text-purple-100 font-bold' : 'text-purple-800 font-bold',
                      bgColor: isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'
                    },
                  ].map(({ code, label, iconColor, labelColor, bgColor }, idx) => (
                    <div
                      key={idx}
                      className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${bgColor}`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Code className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor} flex-shrink-0`} />
                        <h4 className={`font-medium text-xs sm:text-sm ${labelColor}`}>
                          {label}
                        </h4>
                      </div>
                      <p
                        className={`font-mono text-xs sm:text-sm break-all ${
                          isDark ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {code}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isConfirming
                        ? isDark
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isDark
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                          : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isConfirming ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="text-sm sm:text-base">{isConfirming ? 'Confirming...' : 'Confirm'}</span>
                  </button>

                  <button
                    onClick={handleEdit}
                    className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isDark
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                  >
                    <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Edit</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Diagnoses */}
        <div
          className={`mt-6 sm:mt-8 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-500 ${
            isDark
              ? 'bg-gray-800/30 border-gray-700'
              : 'bg-white/70 border-white/50'
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <h3
              className={`text-base sm:text-lg font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Sample Diagnoses to Try:
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Jwara', 'Fever', 'Diabetes', 'Hypertension'].map((sample) => (
                <button
                  key={sample}
                  onClick={() => setDiagnosisName(sample)}
                  className={`px-3 py-1 text-xs sm:text-sm rounded-full border transition-all duration-300 ${
                    isDark
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;