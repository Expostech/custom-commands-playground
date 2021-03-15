import { FC, StrictMode } from 'react';
import { Router } from './router';
import { Provider } from 'react-redux'; // TODO:
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, DEFAULT } from './styled';

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
