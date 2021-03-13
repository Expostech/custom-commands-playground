import { FC } from 'react';
import styled from 'styled-components';
import { Editor, Output, ExecuteButton } from '../components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Playground: FC = () => {
  return (
    <Container>
      <ExecuteButton />
      <Editor />
      <Output />
    </Container>
  );
};
