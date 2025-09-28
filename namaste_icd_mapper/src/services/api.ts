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
    icd11TM2Code: '5A11',
    icd11BiomedCode: 'ICD-BIO-DM-003'
  },
  'diabetes type 1': {
    diagnosisName: 'Diabetes Type 1',
    namasteCode: 'NAM-DM1-004',
    icd11TM2Code: '5A10.0',
    icd11BiomedCode: 'ICD-BIO-DM1-004'
  },
  'diabetes type 2': {
    diagnosisName: 'Diabetes Type 2',
    namasteCode: 'NAM-DM2-005',
    icd11TM2Code: '5A11.0',
    icd11BiomedCode: 'ICD-BIO-DM2-005'
  },
  'diabetes mellitus type 1': {
    diagnosisName: 'Diabetes Mellitus Type 1',
    namasteCode: 'NAM-DM1-006',
    icd11TM2Code: '5A10.0',
    icd11BiomedCode: 'ICD-BIO-DM1-006'
  },
  'diabetes mellitus type 2': {
    diagnosisName: 'Diabetes Mellitus Type 2',
    namasteCode: 'NAM-DM2-007',
    icd11TM2Code: '5A11.0',
    icd11BiomedCode: 'ICD-BIO-DM2-007'
  },
  'type 1 diabetes': {
    diagnosisName: 'Type 1 Diabetes',
    namasteCode: 'NAM-T1D-008',
    icd11TM2Code: '5A10.0',
    icd11BiomedCode: 'ICD-BIO-T1D-008'
  },
  'type 2 diabetes': {
    diagnosisName: 'Type 2 Diabetes',
    namasteCode: 'NAM-T2D-009',
    icd11TM2Code: '5A11.0',
    icd11BiomedCode: 'ICD-BIO-T2D-009'
  },
  'hypertension': {
    diagnosisName: 'Hypertension',
    namasteCode: 'NAM-HTN-010',
    icd11TM2Code: 'BA00.Z',
    icd11BiomedCode: 'ICD-BIO-HTN-010'
  },
  'asthma': {
    diagnosisName: 'Asthma',
    namasteCode: 'NAM-ASM-011',
    icd11TM2Code: 'CA23.0',
    icd11BiomedCode: 'ICD-BIO-ASM-011'
  },
  'migraine': {
    diagnosisName: 'Migraine',
    namasteCode: 'NAM-MIG-012',
    icd11TM2Code: '8D80.0',
    icd11BiomedCode: 'ICD-BIO-MIG-012'
  },
  'pneumonia': {
    diagnosisName: 'Pneumonia',
    namasteCode: 'NAM-PNE-013',
    icd11TM2Code: 'CA40.0',
    icd11BiomedCode: 'ICD-BIO-PNE-013'
  },
  'bronchitis': {
    diagnosisName: 'Bronchitis',
    namasteCode: 'NAM-BRO-014',
    icd11TM2Code: 'CA20.0',
    icd11BiomedCode: 'ICD-BIO-BRO-014'
  },
  'gastritis': {
    diagnosisName: 'Gastritis',
    namasteCode: 'NAM-GAS-015',
    icd11TM2Code: 'DD90.0',
    icd11BiomedCode: 'ICD-BIO-GAS-015'
  },
  'arthritis': {
    diagnosisName: 'Arthritis',
    namasteCode: 'NAM-ART-016',
    icd11TM2Code: 'FA20.0',
    icd11BiomedCode: 'ICD-BIO-ART-016'
  },
  'covid-19': {
    diagnosisName: 'COVID-19',
    namasteCode: 'NAM-COVID-017',
    icd11TM2Code: 'RA01.0',
    icd11BiomedCode: 'ICD-BIO-COVID-017'
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