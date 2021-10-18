import { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import useWebSocket from "react-native-use-websocket";
import { convert } from "../components/bottomsheet/useSwitchtltranslator";
import gettoken from "../data/FILE/gettoken";
import { getserverURL } from "../data/Getmeta";
import { usenotelist } from "./usenotelist";

 
export const useWS = () => {
  const [token, setToken] = useState("");
  const {returnnotelist,notelist,addoldnote,addnote} = usenotelist();

  const getSocketUrl = useCallback(() => {
    return new Promise (async resolve => {
            const localtoken = await gettoken();
            const serverURL = await getserverURL();
            if(token == "" && localtoken){
              setToken(localtoken);
            }
            const WebsocketURL = "wss://" + serverURL.replace('https://','').replace('http://','') + "/streaming?i=" + localtoken;
            console.log("WebsocketURL: " + WebsocketURL);
            resolve(WebsocketURL);
        });
}, []);

  const {getWebSocket} = useWebSocket(getSocketUrl, {
    shared: true,
    shouldReconnect: (closeEvent) => true
  });

useEffect(() => {
  console.log("==wshook useeffect==");
  const websocket = getWebSocket();
  if(websocket){
    console.log("useeffect getWebsocket found!");
   // console.log(websocket);
    websocket.onopen = () => console.log("opened");
    websocket.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if(data.body.type == "note"){
            addnote(data.body.body);
          }
      };
    websocket.onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log("Websocket Error: ",error);};
    websocket.onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log("Websocket Closed", closeEvent);};
  } else {
    console.log("useeffect getwebsocket not found");
  }
}, [getWebSocket()]);

const changetimeline = useCallback((val: any) => {
  //changetimelineがうまく実行されてない（リレンダリング時にもIFでだめ・そもそも利レンダリング時に実行されてない？）
    const websocket = getWebSocket();
    if(websocket && token && val){
      console.log("changetimeline: Websocket and token found!");
      console.log("val: " + val);
      websocket.send(JSON.stringify({
        "type": "disconnect",
        "body": {
          "id": "timeline",
        }
      }));
      websocket.send(JSON.stringify({
      "type": "connect",
      "body": {
        "channel": val,
        "id": "timeline",
        "params": {}
       }
      }));
      addoldnote(token,val);
    } else {
      console.log("changetimeline: websocket and token not found");
    }
  
},[]);

return { changetimeline };
};