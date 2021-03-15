import { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { editorOptions, setup } from './settings';

const Container = styled.div`
  height: 80vh;
  width: 100%;
`;

export const Editor: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  useEffect(() => {
    if (ref.current) {
      editor = monaco.editor.create(ref.current, editorOptions);
      setup(); // setup editor default settings (language)
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <Container ref={ref} />
  );
};
