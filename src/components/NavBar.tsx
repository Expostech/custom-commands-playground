import { Menu, Typography } from 'antd';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { OptionsContext } from '../services/optionsContext';

const { Title } = Typography;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const TitleContainer = styled.div`
  background-color: ${({ theme }) => theme.p};
  color: ${({ theme }) => theme.c};
  height: 5%;
  width: 100%;
`;

export const NavBar: FC = () => {
  const options = useContext(OptionsContext);

  return (
    <Container>

      <TitleContainer>
        <Title level={2}>
          Playground
        </Title>
      </TitleContainer>

      <Menu
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item key="editor">
          <Link to={`/${options.serverId}/playground/editor`}>
            <span>Editor</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="variables">
          <Link to={`/${options.serverId}/playground/variables`}>
            <span>Variables</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="executions">
          <Link to={`/${options.serverId}/playground/executions`}>
            <span>Executions</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="settings">
          <Link to={`/${options.serverId}/playground/settings`}>
            <span>Settings</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};
