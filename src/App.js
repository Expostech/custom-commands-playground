import Editor from './components/editor/editor'
import Sidenav from './components/sidenav';
function App() {
  return (
    <div className="flex flex-row overflow-hidden h-screen">
      <Sidenav></Sidenav>
      <Editor></Editor>
    </div>
  );
}

export default App;
