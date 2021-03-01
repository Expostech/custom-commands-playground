import { view } from '@risingstack/react-easy-state';
import { H1 } from '../h1';
import { Store } from './store';

export const Input = view(() => {
  return (
    <div className="w-full h-full bg-background p-4">
      <H1 text="Input" />
      <textarea
        className="bg-background h-96 w-full rounded-lg"
        value={Store.input}
        onChange={e => (Store.input = e.target.value)}
      />
    </div>
  )
})