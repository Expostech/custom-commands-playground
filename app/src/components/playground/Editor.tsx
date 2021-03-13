import { FC, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';

const Container = styled.div`
  height: 800vh;
`;

export const Editor: FC = () => {
  const div = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: [].join('\n'),
    language: 'typescript',
    theme: 'vs-dark'
  };

  useEffect(() => {
    if (div.current) {
      editor = monaco.editor.create(div.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
        theme: 'vs-dark'
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <Container ref={div} />
  );
};
