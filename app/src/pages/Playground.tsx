import axios from 'axios';
import * as monaco from 'monaco-editor';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ExecuteButton, Header, NavBar, Output } from '../components';
import { editorOptions, setup } from '../components/Editor/settings';

const Wrapper = styled.div`
  max-height: 100vh;
  overflow-y: hidden;
`;

const PlaygroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const EditorContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export const Playground: FC = () => {
  const [editor,setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [output,setOutput] = useState('');
  const url = process.env.REACT_APP_CSMM_URL ? `${process.env.REACT_APP_CSMM_URL}/api/playground/execute` : '/api/playground/execute';

  const ref = useRef<HTMLDivElement>(null);

  async function executeCommand() {
    try {
      const r = await axios.post(url, { template: editor?.getModel()?.getValue() });
      setOutput(r.data.output);
    } catch (error) {
      console.log(error);
    }
  }

  function saveEditor(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  useEffect(() => {
    if (ref.current) {
      saveEditor(monaco.editor.create(ref.current, editorOptions()));
      setup(); // setup editor default settings (language)
    }
    return () => {
      editor?.dispose();
    };
  }, []);

  return (
    <Wrapper>
      <Header />
      <PlaygroundContainer>
        <NavBar />
        <ExecuteButton onClick={() => executeCommand()} />
        <EditorContainer ref={ref} />
        <Output output={output}/>
      </PlaygroundContainer>
    </Wrapper>
  );
};
