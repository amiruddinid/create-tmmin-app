/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function log(type: keyof Console, ...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    switch (type) {
      case 'log':
        console.log(...args);
        break;
      case 'warn':
        console.warn(...args);
        break;
      case 'error':
        console.error(...args);
        break;
      default:
        throw new Error(`Unknown console method: ${type}`);
    }
  }
}
