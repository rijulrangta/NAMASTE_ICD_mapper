export interface User {
  abhaToken: string;
  isAuthenticated: boolean;
}

export interface DiagnosisResult {
  diagnosisName: string;
  namasteCode: string;
  icd11TM2Code: string;
  icd11BiomedCode: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (abhaToken: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}