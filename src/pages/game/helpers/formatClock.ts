const addLeadingZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const formatClock = (durationMS: number): string => {
  const hours = Math.floor((durationMS / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((durationMS / (1000 * 60)) % 60);
  const seconds = Math.floor((durationMS / 1000) % 60);

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
};
