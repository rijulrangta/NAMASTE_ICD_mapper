import type { DiagnosisResult } from "../types";
import toast from 'react-hot-toast';

// Mock data for demonstration
const mockDiagnosisData: Record<string, DiagnosisResult> = {
  'jwara': {
    diagnosisName: 'Jwara',
    namasteCode: 'NAM-JW-001',
    icd11TM2Code: '1A00.0Z',
    icd11BiomedCode: 'ICD-BIO-FVR-001'
  },
  'fever': {
    diagnosisName: 'Fever',
    namasteCode: 'NAM-FV-002',
    icd11TM2Code: '1A00.1Z',
    icd11BiomedCode: 'ICD-BIO-FVR-002'
  },
  'diabetes': {
    diagnosisName: 'Diabetes',
    namasteCode: 'NAM-DM-003',
    icd11TM2Code: '5A10.Z',
    icd11BiomedCode: 'ICD-BIO-DM-003'
  },
  'hypertension': {
    diagnosisName: 'Hypertension',
    namasteCode: 'NAM-HTN-004',
    icd11TM2Code: 'BA00.Z',
    icd11BiomedCode: 'ICD-BIO-HTN-004'
  }
};

export const searchDiagnosis = async (diagnosisName: string): Promise<DiagnosisResult | null> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const searchKey = diagnosisName.toLowerCase().trim();
    const result = mockDiagnosisData[searchKey];
    
    if (result) {
      toast.success(`Found ICD-11 codes for "${diagnosisName}"`);
      return result;
    } else {
      toast.error(`No ICD-11 codes found for "${diagnosisName}". Please try a different diagnosis.`);
      return null;
    }
  } catch (error) {
    toast.error('Failed to fetch diagnosis codes. Please try again.');
    return null;
  }
};

export const confirmDiagnosis = async (diagnosis: DiagnosisResult): Promise<boolean> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success(`Diagnosis "${diagnosis.diagnosisName}" confirmed and saved successfully!`);
    return true;
  } catch (error) {
    toast.error('Failed to confirm diagnosis. Please try again.');
    return false;
  }
};