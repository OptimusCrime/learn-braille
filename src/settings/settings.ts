const KEY = 'LEARN_BRAILLE_SETTINGS';

export const getSettings = (): string[] => {
  const item = localStorage.getItem(KEY);
  return item ? JSON.parse(item) : [];
}

export const saveSettings = (settings: string[]): void => {
  localStorage.setItem(KEY, JSON.stringify(settings));
}
