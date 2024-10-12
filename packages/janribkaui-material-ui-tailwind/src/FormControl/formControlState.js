export default function formControlState({ props, states, jrFormControl }) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];

    if (jrFormControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = jrFormControl[state];
      }
    }

    return acc;
  }, {});
}
