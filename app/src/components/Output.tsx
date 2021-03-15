import { FC, useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 800vh;
  background-color: orange;
`;

export const Output: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: ['val here'].join('\n'),
    language: 'typescript',
    readOnly: true
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
