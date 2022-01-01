import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageNotFound, Playground } from './pages';

export const Router: FC = () => (
  <BrowserRouter basename="/sdtdserver">
    <Routes>
      <Route element={<Playground />} path=":id/playground" />
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
