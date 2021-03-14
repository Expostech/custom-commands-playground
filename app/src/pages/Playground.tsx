import { FC } from 'react';
import styled from 'styled-components';
import { Editor, Output, ExecuteButton, NavBar, Header } from '../components';

const Wrapper = styled.div`
  max-height: 100vh;
  overflow-y: hidden;
`;

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Playground: FC = () => {
  return (
    <Wrapper>
      <Header />
      <EditorContainer>
        <NavBar />
        {/* EDITOR HERE*/}
        <ExecuteButton />
        <Editor />
        <Output />
      </EditorContainer>
    </Wrapper>
  );
};
