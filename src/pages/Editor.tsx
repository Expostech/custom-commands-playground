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
      label: 'The name of the custom command.',
      placeholder: undefined,
      type: 'text',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Description',
      label: 'This description is shown to players when they use the help command.',
      placeholder: undefined,
      type: 'text',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Cost',
      label: 'How much players have to pay to execute this command.',
      placeholder: undefined,
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Delay',
      label: 'Time in seconds players have to wait for this command to execute.',
      placeholder: undefined,
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Timeout',
      label: ('Time in seconds players have to wait before executing this command again.'),
      placeholder: undefined,
      type: 'number',
      initialValue: undefined,
      validation: validation
    },
    {
      name: 'Role Level Required',
      label: (<>Minimum permision level to execute this command.<br/><b>Note:</b> <i>this refers to CSMM roles. Not 7dtd admin permissions.</i></>),
      placeholder: undefined,
      type: 'number',
      initialValue: undefined,
      validation: validation
    }
  ];

  const CustomCommandFormContainer = styled.div`
    width:  428px;
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
