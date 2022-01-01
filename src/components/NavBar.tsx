import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { OptionsContext } from '../services/optionsContext';

const { SubMenu } = Menu;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const NavBar: FC = () => {
  const options = useContext(OptionsContext);

  return (
    <Container>
      <Menu
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <SubMenu icon={<MailOutlined />} key="sub1" title="Navigation One">
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
          <Menu.Item key="settings">
            <Link to={`/${options.serverId}/playground/settings`}>
              <span>Settings</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu icon={<AppstoreOutlined />} key="sub2" title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu icon={<SettingOutlined />} key="sub4" title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </Container>
  );
};
