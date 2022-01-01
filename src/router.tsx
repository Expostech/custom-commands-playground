import { Layout } from 'antd';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from './components';
import { ContentContainer } from './components/ContentContainer';
import { PageNotFound, Playground } from './pages';
import { Settings } from './pages/Settings';
import { Variables } from './pages/Variables';

const { Sider, Content } = Layout;
export const Router: FC = () => (
  <BrowserRouter basename="/sdtdserver">
    <Layout>
      <Sider>
        <NavBar />
      </Sider>
      <Content>
        <Routes>
          <Route element={<Playground />} path="/:id/playground/editor" />
          <Route element={<ContentContainer><Settings /></ContentContainer>} path="/:id/playground/settings" />
          <Route element={<ContentContainer><Variables /></ContentContainer>} path="/:id/playground/variables" />
          <Route element={<PageNotFound />} path="*" />

        </Routes>
      </Content>
    </Layout>
  </BrowserRouter>
);
