import axios from 'axios';
import * as monaco from 'monaco-editor';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ExecuteButton, Header, NavBar, Output } from '../components';
import { Data } from '../components/Data';
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

const RightContainer = styled.div`
  position: relative;
  width: 100%;
  padding-right: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const formatOutput = (output: string[], errors: string[]) => {
  const joinedOutput = output.join('\n');

  if (errors.length) {
    return `${joinedOutput}\n\n\n------------------\n\n\nERRORS\n\n\n${errors.join('\n')}`;
  }

  return joinedOutput;
};

export const Playground: FC = () => {
  const [editor,setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [output,setOutput] = useState('');
  const [data, setData] = useState({ data: {} });

  const url = process.env.REACT_APP_CSMM_URL ? `${process.env.REACT_APP_CSMM_URL}/api/playground/execute` : '/api/playground/execute';

  const ref = useRef<HTMLDivElement>(null);

  async function executeCommand() {
    try {
      const r = await axios.post(url, { template: editor?.getModel()?.getValue(), data: data.data });
      const formatted = formatOutput(r.data.output, r.data.errors);
      setOutput(formatted);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
        <RightContainer>
          <Output output={output}/>
          <Data data={data} setData={setData} />
        </RightContainer>
      </PlaygroundContainer>
    </Wrapper>
  );
};
