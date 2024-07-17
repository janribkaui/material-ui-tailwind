import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names together.
 *
 * @param {ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
const mergeStyles = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export default mergeStyles;
