import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { JsxElement } from 'typescript';

const FieldContainer = styled.div`
  margin-bottom: 10px;

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number]{
    -moz-appearance: textfield;
  }
`;

const FieldName = styled.div`
  font-size: 16px;
  color: #DBD7D2;
`;

export interface IInputError {
  errorMessage: string;
}

const Field = styled.input<{type: string; inputError: IInputError | undefined }>`
  width: 100%;

  ::selection {
    color: #433F3B;
    background-color: #DBD7D2;
  }

  :hover { 
    box-shadow: ${({ inputError }) => inputError !== undefined ? '#3b3e40 inset 0px 0px 3px 3px, #09D0F6 0px 0px 0px 1.5px' : '#3b3e40 inset 0px 0px 3px 3px, #F62F09 0px 0px 0px 1.5px'};
  }

  :focus { 
    box-shadow: ${({ inputError }) => inputError !== undefined ? '#3b3e40 inset 0px 0px 3px 3px, #09D0F6 0px 0px 0px 1.5px' : '#3b3e40 inset 0px 0px 3px 3px, #F62F09 0px 0px 0px 1.5px'};
  }

  box-shadow: ${({ inputError }) => inputError !== undefined ? '#3b3e40 inset 0px 0px 3px 3px, #707070 0px 0px 0px 1.5px' : '#3b3e40 inset 0px 0px 3px 3px, #F62F09 0px 0px 0px 1.5px'};

  background-color: #433F3B;

  color: #DBD7D2;

  font-size: 16px;

  padding: 4px 8px;

  border-radius: 3px;

  border: none;

  box-sizing: border-box;

  margin-top: 6px;

  outline: none;
`;

const FieldLabel = styled.div`
    color: #DBD7D2;
    font-size: 12px;
    margin-top: 5px;

    b, i {
      color: #DBD7D2;
    }
`;

export interface IInputFieldProps {
    name: string;
    initialValue: string | undefined;
    placeholder: string | undefined;
    label: string | JSX.Element | undefined;
    type: string;
    validation: Function;
};

export const InputField: FC<IInputFieldProps> = (props) => {
  const [value, setValue] = useState<string | undefined>(props.initialValue);

  const onChange: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [inputError, setInputError] = useState<IInputError | undefined>({ errorMessage: 'none' });

  return (
    <FieldContainer>
      <FieldName>{props.name}</FieldName>
      <Field inputError={inputError} onChange={(e) => props.validation(e.target.value || undefined)} placeholder={props.placeholder || undefined} type={props.type} value={value || undefined} />
      <FieldLabel>{props.label}</FieldLabel>
    </FieldContainer>
  );
};
