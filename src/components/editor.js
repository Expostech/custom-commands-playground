//import './editor.css';
import React from 'react'
import { store, view } from '@risingstack/react-easy-state';
import parseTemplate from '../customCommands/parseTemplate'
import playerData from '../customCommands/dataPresets/player'
import cronData from '../customCommands/dataPresets/cron'
import hookData from "../customCommands/dataPresets/hook"
import ReactJson from 'react-json-view'

const Store = store({
  input: `
  pm {{player.steamId}} "Hey {{player.name}} hows it going?"; 
  pm {{player.steamId}} "These high-level players are also online:
    {{#each server.onlinePlayers}}
      {{#if (gt this.level 10000)}}
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
        <div className="p-5">
          <div className="py-1"><Presets /></div>
          <div className="py-1"><Data /></div>
        </div>
        <div className="p-5 w-full"><Input /></div>
      </div>
      <div className="container">
        <h1 className="font-extrabold text-xl">Output</h1>
        <div className="p-5"><Output /></div>
      </div>
    </div>
  );
}

const Output = view(() => {
  let data

  try {
    data = JSON.parse(Store.data)
  } catch (error) {
    data = null
  }

  let result
  try {
    result = parseTemplate(Store.input, data)
  } catch (error) {
    result = "Invalid template, " + error
  }

  return (
    <div className="bg-indigo-400 h-96 rounded-lg p-3">
      {result}
    </div>
  );
})

const Data = view(() => {
  return (
    <div className="text-sm overflow-auto h-96 w-full  bg-indigo-400 rounded-lg">
      <ReactJson theme="monokai" src={Store.data} />
    </div>
    /*     <div className="text-sm overflow-auto h-96 w-96  bg-indigo-400 rounded-lg">
          <pre>
            <code >
              {}
            </code>
          </pre>
        </div> */


  );
})

const Presets = view(() => {
  const temp = Store.dataTemplates.map((data, i) => (
    <option value={i}>{data().name}</option>
  ))

  const select = (e) => (Store.data = Store.dataTemplates[e.target.value]().data)

  if (!Store.data) {
    Store.data = playerData().data
  }

  return (
    <select className="text-black bg-indigo-400 rounded-lg p-1" onChange={select}>
      {temp}
    </select>
  );
})

const Input = view(() => {
  return (
    <div className="w-full h-full">
      <h1 className="font-extrabold text-xl">Input</h1>
      <textarea
        className="bg-indigo-400 h-full w-full rounded-lg p-5"
        value={Store.input}
        onChange={e => (Store.input = e.target.value)}
      />
    </div>
  )
})

