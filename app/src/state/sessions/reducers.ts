import { handleActions } from 'redux-actions';
import { editVariables, openVariables, toggleVariables, closeVariables, editName } from './actions';

export interface Tab {
  name?: string;
  variables?: string;
}
