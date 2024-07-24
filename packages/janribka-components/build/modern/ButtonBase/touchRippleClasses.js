import generateUtilityClass from '@janribka/utils/generateUtilityClass';
import generateUtilityClasses from '@janribka/utils/generateUtilityClasses';
export function getTouchRippleUtilityClass(slot) {
  return generateUtilityClass('MuiTouchRipple', slot);
}
var touchRippleClasses = generateUtilityClasses('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
export default touchRippleClasses;