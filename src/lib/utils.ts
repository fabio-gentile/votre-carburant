import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function millisecondsToHoursAndMinutes(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  let result = '';
  if (hours > 0) {
    result += hours + ' heure';
    if (hours > 1) {
      result += 's';
    }
    result += ' et ';
  }
  result += minutes + ' minute';
  if (minutes > 1) {
    result += 's';
  }

  return result;
}
