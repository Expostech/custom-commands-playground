import { FC, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';
import { getServerId, OptionsContext } from './services/optionsContext';
import { DEFAULT, GlobalStyle } from './styled';

export const App: FC = () => {
  return (
    <StrictMode>
      <OptionsContext.Provider value={{ serverId: getServerId() }}>
        <ThemeProvider theme={DEFAULT}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </OptionsContext.Provider>
    </StrictMode>
  );
};
