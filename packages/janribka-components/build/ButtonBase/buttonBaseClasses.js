import generateUtilityClass from "@janribka/utils/generateUtilityClass";
import generateUtilityClasses from "@janribka/utils/generateUtilityClasses";
export function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("JrButtonBase", slot);
}
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
export default buttonBaseClasses;