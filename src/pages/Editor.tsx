import { FC } from 'react';
import { InputField, IInputFieldProps } from '../components/InputField';
import styled from 'styled-components';

export const Editor: FC = () => {
  const validation: Function = (value: string | undefined) => {
    console.log(value);
  };

  const textInput: IInputFieldProps = {
    name: 'Name',
    label: 'The name of the custom command.',
    placeholder: undefined,
    type: 'text',
    initialValue: undefined,
    validation: validation
  };

  const inputFields: IInputFieldProps[] =
  [
    {
      name: 'Name',
      label: (<b>The name of the custom command.</b>),
      placeholder: 'Command name',
      type: 'text',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Description',
      label: (<b>This description is shown to players when they use the help command.</b>),
      placeholder: 'No information given',
      type: 'text',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Cost',
      label: (<b>How much players have to pay to execute this command.</b>),
      placeholder: '0',
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Delay',
      label: (<b>Time in seconds players have to wait for this command to execute.</b>),
      placeholder: '0',
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Timeout',
      label: (<b>Time in seconds players have to wait before executing this command again.</b>),
      placeholder: '0',
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Role Level Required',
      label: (<><b>Minimum permision level to execute this command.</b><br/><b>Note:</b> This refers to CSMM roles. Not 7dtd admin permissions.</>),
      placeholder: '9999',
      type: 'number',
      initialValue: undefined,
      validation: validation
    }
  ];

  const CustomCommandFormContainer = styled.div`
    width:  470px;
    height: 100vw;
    background-color: #292C2F;
    padding: 12px 12px;
  `;

  const TempHeader = styled.div`
    display: flex;
    width: 100vw;
    height: 40px;
    padding: 8px 16px;
    background-color: #343A40;
  `;

  const TempNav = styled.div`
    width: 55px;
    height: 100vh;
    background-color: #343A40;
  `;

  const TempContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #1E1E1E;
  `;

  return (
    <>
      <TempHeader>
      </TempHeader>
      <TempContainer>
        <TempNav/>
        <CustomCommandFormContainer>
          {inputFields.map((inputField) => (
            <InputField initialValue={inputField.initialValue} label={inputField.label} name={inputField.name} placeholder={inputField.placeholder} type={inputField.type} validation={textInput.validation}/>
          ))}
        </CustomCommandFormContainer>
      </TempContainer>
    </>
  );
};
