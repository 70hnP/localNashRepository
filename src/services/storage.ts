import { seedData } from '../data/seed';
import { AppData } from '../types';

const STORAGE_KEY = 'ceo-master-growth-playbook-v1';

export const loadAppData = (): AppData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedData;
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.vision || !Array.isArray(parsed.competencies)) {
      throw new Error('Invalid storage payload');
    }
    return parsed;
  } catch {
    return seedData;
  }
};

export const saveAppData = (data: AppData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAppData = (): AppData => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return seedData;
};
