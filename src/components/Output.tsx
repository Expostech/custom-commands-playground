import * as monaco from 'monaco-editor';
import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { editorOptions, setup } from './Editor/settings';

const EditorContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

interface IProps {
  output: string;
}

export const Output: FC<IProps> = ({ output = '' }) => {
  const [editor,setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const ref = useRef<HTMLDivElement>(null);

  function saveEditor(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  useEffect(() => {
    if (ref.current) {
      saveEditor(monaco.editor.create(ref.current, editorOptions('')));
      setup(); // setup editor default settings (language)
    }

    return () => {
      editor?.dispose();
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.getModel()?.setValue(output);
    }
  }, [output]);

  return <EditorContainer ref={ref} />
  ;
};
