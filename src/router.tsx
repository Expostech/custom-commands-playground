import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageNotFound, Playground } from './pages';

export const Router: FC = () => (
  <BrowserRouter >
    <Routes>
      <Route element={<Playground />} path="/playground" />
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
