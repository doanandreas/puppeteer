import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { PEER_ID } from "../const";

const doc = new Y.Doc();
const map = doc.getMap();

const roomId = "tldraw-p2p-eval";
const provider = new WebrtcProvider(roomId, doc);

map.observe((ymapEvent) => {
  ymapEvent.target === map; // => true

  // Find out what changed:
  // Option 1: A set of keys that changed
  ymapEvent.keysChanged; // => Set<strings>
  // Option 2: Compute the differences
  ymapEvent.changes.keys; // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

  // sample code.
  ymapEvent.changes.keys.forEach((change, key) => {
    if (change.action === "add") {
      console.log(
        `Property "${key}" was added. Initial value: "${map.get(key)}".`
      );
    } else if (change.action === "update") {
      console.log(
        `Property "${key}" was updated. New value: "${map.get(
          key
        )}". Previous value: "${change.oldValue}".`
      );
    } else if (change.action === "delete") {
      console.log(
        `Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`
      );
    }
  });
});

doc.transact(() => {
  map.set(PEER_ID, new Date().getTime());
}, PEER_ID);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
