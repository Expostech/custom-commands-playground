import { Editor } from './components/editor/editor'
import { Sidenav } from './components/sidenav';

export const App = () => {
  return (
    <div className="flex flex-row overflow-hidden h-screen">
      <Sidenav />
      <Editor />
    </div>
  );
}

