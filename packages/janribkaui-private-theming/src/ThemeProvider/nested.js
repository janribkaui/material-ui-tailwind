const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export default hasSymbol ? Symbol.for('jr.nested') : '__THEME_NESTED__';
