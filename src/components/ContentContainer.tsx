import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div<{scrollOverflow?: boolean;}>`
  width: 100%;
  height: 100vh;
  padding: 2.5%;
  overflow-y: ${(props) => props.scrollOverflow ? 'scroll' : 'unset' };
`;

interface ContainerProps {
  scrollOverflow?: boolean;
}

export const ContentContainer: FC<ContainerProps> = (props) => {
  return (
    <Container scrollOverflow={props.scrollOverflow}>
      {props.children}
    </Container>
  );
};
