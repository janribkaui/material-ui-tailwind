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

export default GlobalStyles;
