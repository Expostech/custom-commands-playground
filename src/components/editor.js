//import './editor.css';
import React, { Fragment } from 'react'
import { store, view } from '@risingstack/react-easy-state';
import parseTemplate from '../customCommands/parseTemplate'
import playerData from '../customCommands/dataPresets/player'
import cronData from '../customCommands/dataPresets/cron'
import hookData from "../customCommands/dataPresets/hook"
import ReactJson from 'react-json-view'
import H1 from './H1'

export const Store = store({
  input: `
  pm {{player.steamId}} "Hey {{player.name}} hows it going?";
  pm {{player.steamId}} "These high-level players are also online:
    {{#each server.onlinePlayers}}
      {{#if (gt this.level 100)}}
        {{this.name}}
      {{/if}}
    {{/each}}"
    `,
  dataTemplates: [playerData, cronData, hookData],
  data: null
});

export default function Editor() {
  return (
    <div className="container">
      <div className="container flex flex-row">
        <div className="p-5 w-full"><Input /></div>
        <div className="py-1"><Data /></div>
      </div>
      <div className="container">
        <div className="p-3"><Output /></div>
      </div>
    </div>
  );
}

const Output = view(() => {
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
      .map(_ => (<Fragment>{_}<br /></Fragment>))
  } catch (error) {
    result = "Invalid template, " + error
  }

  return (
    <div className="bg-green-600 h-96 rounded-lg p-3">
      <H1 text="Output" />
      <p>
        {result}

      </p>
    </div>
  );
})

const Data = view(() => {
  return (
    <div className="text-sm rounded-lg py-5">
      <div className="py-1"><Presets /></div>
      <div className="overflow-auto h-96 w-96">
        <ReactJson
          enableClipboard={false}
          displayDataTypes={false}
          quotesOnKeys={false}
          theme="monokai" src={Store.data}
        />

      </div>
    </div>
  );
})

const Presets = view(() => {
  const options = Store.dataTemplates.map((data, i) => (
    <option value={i}>{data().name}</option>
  ))

  const select = (e) => (Store.data = Store.dataTemplates[e.target.value]().data)

  if (!Store.data) {
    Store.data = playerData().data
  }

  return (
    <div className="flex flex-row">
      <H1 text="Data presets" />

      <select className="text-black bg-white rounded-lg p-1" onChange={select}>
        {options}
      </select>

    </div>
  );
})

const Input = view(() => {
  return (
    <div className="w-full h-full">
      <H1 text="Input" />
      <textarea
        className="bg-green-600 h-96 w-full rounded-lg p-5"
        value={Store.input}
        onChange={e => (Store.input = e.target.value)}
      />
    </div>
  )
})

