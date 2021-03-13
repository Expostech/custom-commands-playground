import { FC, StrictMode } from 'react';
import { Router } from './router';

export const App: FC = () => {
  return (
    <StrictMode>
      <Router />
    </StrictMode>
  );
};
