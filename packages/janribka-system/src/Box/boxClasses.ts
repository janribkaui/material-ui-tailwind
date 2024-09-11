import generateUtilityClasses from '@janribka/utils/generateUtilityClasses';

export interface BoxClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type BoxClassKey = keyof BoxClasses;

const boxClasses: BoxClasses = generateUtilityClasses('JRBox', ['root']);

export default boxClasses;
