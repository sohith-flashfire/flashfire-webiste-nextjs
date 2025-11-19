export interface FormData {
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  workAuthorization: string;
}

const STORAGE_KEY = 'flashfire_signup_form_data';

export const saveFormData = (formData: FormData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error);
  }
};

export const loadFormData = (): FormData => {
  if (typeof window === 'undefined') {
    return {
      fullName: '',
      phone: '',
      countryCode: '+1',
      email: '',
      workAuthorization: ''
    };
  }
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error);
  }
  return {
    fullName: '',
    phone: '',
    countryCode: '+1',
    email: '',
    workAuthorization: ''
  };
};

export const clearFormData = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error);
  }
};

export const hasFormData = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData !== null;
  } catch (error) {
    console.warn('Failed to check form data in localStorage:', error);
    return false;
  }
};

