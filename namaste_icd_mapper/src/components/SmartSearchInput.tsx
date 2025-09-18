import React, { useState, useRef } from 'react';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { Search, Loader2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSelect: (val: string) => void;
  isDark: boolean;
}

const SmartSearchInput: React.FC<Props> = ({ value, onChange, onSelect, isDark }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { suggestions, isLoading } = useSearchSuggestions(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onSelect(suggestions[highlightedIndex]);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setShowSuggestions(true); setHighlightedIndex(-1); }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        className={`peer w-full px-6 pt-6 pb-3 pr-16 rounded-2xl border-2 transition-all duration-300
          focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
          ${isDark ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white/70 border-gray-300 text-gray-900'}`}
        placeholder=" "
      />

      <label className={`absolute left-6 top-2 text-xs transition-all duration-300 pointer-events-none
        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
        peer-focus:top-2 peer-focus:text-xs
        ${isDark ? 'text-gray-400 peer-focus:text-blue-400' : 'text-gray-600 peer-focus:text-blue-600'}`}>
        Search medical diagnosis
      </label>

      {isLoading && <Loader2 className="absolute right-4 top-5 w-5 h-5 animate-spin text-blue-500" />}

      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-2xl z-50 backdrop-blur-xl overflow-hidden
          ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { onSelect(s); setShowSuggestions(false); }}
              className={`w-full text-left px-6 py-3 transition-all duration-200
                ${idx === highlightedIndex
                  ? isDark ? 'bg-blue-600/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                  : isDark ? 'hover:bg-gray-700/50 text-white' : 'hover:bg-gray-50 text-gray-900'
                }
                ${idx === 0 ? 'rounded-t-2xl' : ''} 
                ${idx === suggestions.length - 1 ? 'rounded-b-2xl' : ''}`}
            >
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="ml-2">{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartSearchInput;