import { FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';
import { DEFAULT, GlobalStyle } from './styled';

export const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </StrictMode>
  );
};
