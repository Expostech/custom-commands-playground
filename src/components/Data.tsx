import * as monaco from 'monaco-editor';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getData } from '../services/data';
import { editorOptions } from './Editor/settings';

const EditorContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

interface IProps {
  data: any;
  setData: any;
}

export const Data: FC<IProps> = ({ data, setData }) => {
  const [editor,setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const ref = useRef<HTMLDivElement>(null);

  function saveEditor(editor: monaco.editor.IStandaloneCodeEditor) {
    setEditor(editor);
  }

  useEffect(() => {
    setData(getData());
  }, []);

  useEffect(() => {
    if (ref.current) {
      saveEditor(monaco.editor.create(ref.current, editorOptions('', { readOnly: true, language: 'json' })));
    }

    return () => {
      editor?.dispose();
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.getModel()?.setValue(JSON.stringify(data, null, 4));
    }
  }, [data]);

  return <EditorContainer ref={ref} />
  ;
};
