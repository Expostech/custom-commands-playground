import { createActions } from 'redux-actions';

export const {
  editVariables, editName,
  closeVariables, openVariables, toggleVariables
}
  =
  createActions({
    EDIT_VARIABLES: action('variables'),
    EDIT_NAME: action('name'),

    CLOSE_VARIABLES: action('variableEditorHeight'),
    OPEN_VARIABLES: action('variableEditorHeight'),
    TOGGLE_VARIABLES: action()
  });

function action(key?: any, defaultValue?: any) {
  return (value: any) => ({ [key]: value || defaultValue });
}
