const KEY = 'LEARN_BRAILLE_SETTINGS';

export interface SettingData {
  character: string;
  mode: 'include' | 'require';
}

export const getSettingsFromLocalStorage = (): SettingData[] => {
  const item = localStorage.getItem(KEY);
  return item ? JSON.parse(item) : [];
};

export const saveSettingsInLocalStorage = (settings: SettingData[]): void => {
  localStorage.setItem(KEY, JSON.stringify(settings));
};
