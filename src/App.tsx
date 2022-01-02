import 'antd/dist/antd.css';

import { FC, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';
import { getServerId, OptionsContext } from './services/optionsContext';
import { DEFAULT, GlobalStyle } from './styled';

export const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <GlobalStyle />
        <OptionsContext.Provider value={{ serverId: getServerId() }}>
          <Router />
        </OptionsContext.Provider>
      </ThemeProvider>
    </StrictMode>
  );
};
