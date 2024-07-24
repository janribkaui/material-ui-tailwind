import { ClassValue } from 'clsx';
/**
 * Merges multiple class names together.
 *
 * @param {ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
declare const mergeStyles: (...inputs: ClassValue[]) => string;
export default mergeStyles;
