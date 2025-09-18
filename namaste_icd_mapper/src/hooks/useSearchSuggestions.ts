import { useState, useEffect, useCallback } from 'react';

const DIAGNOSIS_DATABASE = [
  'Jwara', 'Fever', 'Diabetes Type 1', 'Diabetes Type 2', 'Hypertension',
  'Asthma', 'Migraine', 'Pneumonia', 'Bronchitis', 'Gastritis', 'Arthritis', 'COVID-19'
];

export const useSearchSuggestions = (query: string, maxSuggestions = 8) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSuggestions = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    const filtered = DIAGNOSIS_DATABASE
      .filter(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(searchTerm.toLowerCase());
        const bStarts = b.toLowerCase().startsWith(searchTerm.toLowerCase());
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.length - b.length;
      })
      .slice(0, maxSuggestions);

    setSuggestions(filtered);
    setIsLoading(false);
  }, [maxSuggestions]);

  useEffect(() => {
    getSuggestions(query);
  }, [query, getSuggestions]);

  return { suggestions, isLoading };
};