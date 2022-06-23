import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

let readyPeer = 0;
let currTrial = 0;
let rttArray = [];

const connectToRoom = (id, trialNumber, peerNumber) => {
  const doc = new Y.Doc();
  const statusMap = doc.getMap("status");
  const requestMap = doc.getMap("request");
  const responseMap = doc.getMap("response");

  const roomId = "tldraw-p2p-eval";
  const provider = new WebrtcProvider(roomId, doc);

  statusMap.observe((ymapEvent) => {
    ymapEvent.changes.keys.forEach((change, key) => {
      if (change.action === "add" && statusMap.get(key) === "READY") {
        readyPeer++;
        console.log(
          `Peer ${key} is READY for testing. Number of peers: ${readyPeer}`
        );

        if (readyPeer === peerNumber) {
          console.log("All peers are READY.");

          doc.transact(() => {
            requestMap.set(id, new Date().getTime());
          }, id);
        }
      }
    });
  });

  requestMap.observe((ymapEvent) => {
    ymapEvent.changes.keys.forEach((change, key) => {
      if (change.action === "add" || change.action === "update") {
        console.log(
          `Peer "${key}" request timestamp: "${requestMap.get(key)}".`
        );

        if (key !== id) {
          doc.transact(() => {
            responseMap.set(`${id}:${key}`, new Date().getTime());
          }, id);
        }
      }
    });
  });

  // responseMap.observe((ymapEvent) => {
  //   ymapEvent.changes.keys.forEach((change, key) => {

  //   });
  // });

  responseMap.observe((ymapEvent) => {
    ymapEvent.changes.keys.forEach((change, key) => {
      if (change.action === "add") {
        console.log(
          `Property "${key}" was added. Current time: "${new Date().getTime()}".`
        );
      } else if (change.action === "update") {
        console.log(
          `Property "${key}" was updated. New value: "${responseMap.get(
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
    statusMap.set(id, "READY");
  }, id);
};

window.connectToRoom = connectToRoom;
