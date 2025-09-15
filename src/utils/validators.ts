/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (10 digits)
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^\d{10}$/;
  return regex.test(phone);
}

/**
 * Validate non-empty string
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate if a string is a valid URL
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate if a number is positive
 */
export function isPositiveNumber(value: number): boolean {
  return value > 0;
}

import * as z from "zod"

export const jobSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().min(5, "Description is too short"),
})
