import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100;
  height: 50px;
  background-color: ${({ theme }) => theme.p};
  // align vertically
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
`;

export const Header: FC = () => {
  return <Container>CSMM Playground</Container>;
};
