'use client';
import * as React from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { GlobalStyles as SystemGlobalStyles } from '@janribkaui/system';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';

function GlobalStyles(props) {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} themeId={THEME_ID} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.shape({
      __emotion_styles: PropTypes.any.isRequired,
    }),
    PropTypes.shape({
      map: PropTypes.string,
      name: PropTypes.string.isRequired,
      next: PropTypes.object,
      styles: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          props: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({
              components: PropTypes.object,
              cssVariables: PropTypes.oneOf([false]),
              direction: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
              mixins: PropTypes.any,
              palette: PropTypes.object.isRequired,
              shadows: PropTypes.any,
              transitions: PropTypes.object.isRequired,
              typography: PropTypes.object.isRequired,
              unstable_strictMode: PropTypes.bool,
            }),
          ]).isRequired,
          style: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
        }),
      ).isRequired,
    }),
    PropTypes.shape({
      '__@iterator@94': PropTypes.func.isRequired,
      '__@unscopables@2941': PropTypes.shape({
        '__@iterator@94': PropTypes.bool,
        '__@unscopables@2941': PropTypes.bool,
        at: PropTypes.bool,
        concat: PropTypes.bool,
        entries: PropTypes.bool,
        every: PropTypes.bool,
        filter: PropTypes.bool,
        find: PropTypes.bool,
        findIndex: PropTypes.bool,
        flat: PropTypes.bool,
        flatMap: PropTypes.bool,
        forEach: PropTypes.bool,
        includes: PropTypes.bool,
        indexOf: PropTypes.bool,
        join: PropTypes.bool,
        keys: PropTypes.bool,
        lastIndexOf: PropTypes.bool,
        length: PropTypes.bool,
        map: PropTypes.bool,
        reduce: PropTypes.bool,
        reduceRight: PropTypes.bool,
        slice: PropTypes.bool,
        some: PropTypes.bool,
        toLocaleString: PropTypes.bool,
        toString: PropTypes.bool,
        values: PropTypes.bool,
      }).isRequired,
      at: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      flat: PropTypes.func.isRequired,
      flatMap: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default GlobalStyles;
