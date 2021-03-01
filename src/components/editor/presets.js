
import { view } from '@risingstack/react-easy-state';
import { Store } from './store';
import { H1 } from '../text';
import playerData from '../../customCommands/dataPresets/player';

export const Presets = view(() => {
  const options = Store.dataTemplates.map((data, i) => (
    <option value={i}>{data().name}</option>
  ))

  const select = (e) => (Store.data = Store.dataTemplates[e.target.value]().data)

  if (!Store.data) {
    Store.data = playerData().data
  }

  return (
    <div className="flex flex-row">
      <H1>Text presets</H1>
      <select className="text-black bg-white rounded-lg p-1" onChange={select}>{options}</select>
    </div>
  );
})