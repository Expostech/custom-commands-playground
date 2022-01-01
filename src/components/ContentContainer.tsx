import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2.5%;
`;

export const ContentContainer: FC = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};
