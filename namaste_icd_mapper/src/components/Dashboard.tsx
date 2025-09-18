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
    <div className={`min-h-screen transition-all duration-500 ${isDark
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Card */}
        <div className={`rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-500 ${isDark
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white/70 border-white/50'}`}>
          
          <div className="p-8">
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ICD-11 Diagnosis Code Lookup
            </h2>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="diagnosis"
                    className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Diagnosis Name
                  </label>
                  <SmartSearchInput
                    value={diagnosisName}
                    onChange={setDiagnosisName}
                    onSelect={val => setDiagnosisName(val)}
                    isDark={isDark}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSearching || !diagnosisName.trim()}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${isSearching || !diagnosisName.trim()
                      ? isDark
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'}`}
                  >
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    <span>{isSearching ? 'Searching...' : 'Search for ICD-11 Codes'}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Diagnosis Result Card */}
            {diagnosisResult && (
              <div className={`rounded-xl border p-6 transition-all duration-500 glass-card ${isDark
                ? 'bg-gray-700/50 border-gray-600'
                : 'bg-blue-50/50 border-blue-200'}`}>
                
                <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Database className="w-5 h-5 text-blue-500" />
                  <span>Diagnosis Codes for "{diagnosisResult.diagnosisName}"</span>
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { code: diagnosisResult.namasteCode, label: 'NAMASTE Code', color: 'green' },
                    { code: diagnosisResult.icd11TM2Code, label: 'ICD-11 TM2 Code', color: 'blue' },
                    { code: diagnosisResult.icd11BiomedCode, label: 'ICD-11 Biomed Code', color: 'purple' },
                  ].map(({ code, label, color }, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}
                    >
                      <div className={`flex items-center space-x-2 mb-2`}>
                        <Code className={`w-4 h-4 text-${color}-500`} />
                        <h4 className={`font-medium ${isDark ? `text-${color}-400` : `text-${color}-600`}`}>{label}</h4>
                      </div>
                      <p className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{code}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${isConfirming
                      ? isDark
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'}`}
                  >
                    {isConfirming ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                    <span>{isConfirming ? 'Confirming...' : 'Confirm'}</span>
                  </button>

                  <button
                    onClick={handleEdit}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${isDark
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'}`}
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Diagnoses */}
        <div className={`mt-8 p-6 rounded-xl border transition-all duration-500 glass-card  ${isDark
          ? 'bg-gray-800/30 border-gray-700'
          : 'bg-white/40 border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sample Diagnoses to Try:</h3>
          <div className="flex flex-wrap gap-2">
            {['Jwara', 'Fever', 'Diabetes', 'Hypertension'].map(sample => (
              <button
                key={sample}
                onClick={() => setDiagnosisName(sample)}
                className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${isDark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'}`}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;