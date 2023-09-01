const KEY = 'LEARN_BRAILLE_SETTINGS';

export const getSettingsFromLocalStorage = (): string[] => {
  const item = localStorage.getItem(KEY);
  return item ? JSON.parse(item) : [];
};

export const saveSettingsInLocalStorage = (settings: string[]): void => {
  localStorage.setItem(KEY, JSON.stringify(settings));
};
