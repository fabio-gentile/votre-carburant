import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(milliseconds: number): string {
  const msPerSecond = 1000;
  const msPerMinute = 60 * msPerSecond;
  const msPerHour = 60 * msPerMinute;
  const msPerDay = 24 * msPerHour;
  const msPerWeek = 7 * msPerDay;
  const msPerMonth = 30 * msPerDay;

  if (milliseconds >= msPerMonth) {
    const months = Math.floor(milliseconds / msPerMonth);
    return `${months} mois`;
  } else if (milliseconds >= msPerWeek) {
    const weeks = Math.floor(milliseconds / msPerWeek);
    return `${weeks} jour${weeks > 1 ? 's' : ''}`;
  } else if (milliseconds >= msPerDay) {
    const days = Math.floor(milliseconds / msPerDay);
    const remainingHours = Math.floor((milliseconds % msPerDay) / msPerHour);
    return `${days} jour${days > 1 ? 's' : ''} ${remainingHours > 0 ? remainingHours + ' heure' + (remainingHours > 1 ? 's' : '') : ''}`;
  } else if (milliseconds >= msPerHour) {
    const hours = Math.floor(milliseconds / msPerHour);
    const minutes = Math.floor((milliseconds % msPerHour) / msPerMinute);
    return `${hours} heure${hours > 1 ? 's' : ''} ${minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') : ''}`;
  } else if (milliseconds >= msPerMinute) {
    const minutes = Math.floor(milliseconds / msPerMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    const seconds = Math.floor(milliseconds / msPerSecond);
    return `${seconds} seconde${seconds !== 1 ? 's' : ''}`;
  }
}
