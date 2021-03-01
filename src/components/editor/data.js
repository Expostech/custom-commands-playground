import { view } from '@risingstack/react-easy-state';
import ReactJson from 'react-json-view';
import { Presets } from './presets';
import { Store } from './store';

export const Data = view(() => {
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

