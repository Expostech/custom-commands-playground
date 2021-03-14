import { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';

const Container = styled.div`
  height: 80vh;
  width: 100%;
`;

export const Editor: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: ['val here'].join('\n'),
    language: 'typescript',
    theme: 'vs-dark'
  };

  useEffect(() => {
    if (ref.current) {
      editor = monaco.editor.create(ref.current, options);
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <Container ref={ref} />
  );
};
