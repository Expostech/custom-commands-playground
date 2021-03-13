import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Playground, PageNotFound } from './pages';

export const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Playground />} path="/" />
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);
