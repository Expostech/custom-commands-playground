import { FC, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.p};
  z-index: 1;
`;

const Nav = styled.nav``;
const Content = styled.div``;

export const NavBar: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container open={open}>
      <Content>navbar</Content>
    </Container>
  );
};
