import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../src/components/theme/theme-provider';
import { Toaster } from '../src/components/ui/toaster';
import '../src/index.css';
import { darkUIStorybook, lightUIStorybook } from './themes-storybook-ui';

const preview: Preview = {
  parameters: {
    // https://storybook.js.org/addons/storybook-dark-mode
    darkMode: {
      classTarget: 'main',
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      // Override the default dark theme
      dark: { ...themes.dark, ...darkUIStorybook },
      // Override the default light theme
      light: { ...themes.normal, ...lightUIStorybook },
      // Set the initial theme
      current: 'dark',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <Router>
      <ThemeProvider>
        <Story />
        <Toaster />
      </ThemeProvider>
    </Router>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];
