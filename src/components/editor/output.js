import React from 'react';
import { view } from '@risingstack/react-easy-state';
import parseTemplate from '../../customCommands/parseTemplate'
import { Store } from './store';
import { H1 } from '../text'

export const Output = view(() => {
  let data

  try {
    data = Store.data
  } catch (error) {
    data = null
  }

  let result
  try {
    result = parseTemplate(Store.input, data)
      .split(';')
      .map(_ => (<React.Fragment>{_}<br /></React.Fragment>))
  } catch (error) {
    result = "Invalid template, " + error
  }

  return (
    <div className="bg-background h-96 rounded-lg p-3">
      <H1>output</H1>
      <p>
        {result}

      </p>
    </div>
  );
})