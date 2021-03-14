import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100;
  height: 50px;
  background-color: purple;
`;

export const Header: FC = () => {
  return (<Container>header</Container>);
};
