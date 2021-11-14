import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import useWebSocket from "react-native-use-websocket";
import { convert } from "../components/bottomsheet/useSwitchtltranslator";
import gettoken from "../data/FILE/gettoken";
import { getserverURL } from "../data/Getmeta";
import { usenotelist } from "./usenotelist";

export const useWS = (setrefresh: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },refresh: boolean,notelist,setnotelist) => {
  let token = "";
  const {addoldnote,addnote} = usenotelist(notelist,setnotelist);

  const getSocketUrl = useCallback(() => {
    return new Promise (async resolve => {
            const localtoken = await gettoken();
            const serverURL = await getserverURL();
            if(token == "" && localtoken){
              token = localtoken;
            }
            const WebsocketURL = "wss://" + serverURL.replace('https://','').replace('http://','') + "/streaming?i=" + localtoken;
            resolve(WebsocketURL);
        });
}, []);

  const {getWebSocket} = useWebSocket(getSocketUrl, {
    shared: true,
    shouldReconnect: (closeEvent) => true
  });

useEffect(() => {
  const websocket = getWebSocket();
  if(websocket){
    websocket.onopen = () => console.log("opened");
    websocket.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if(data.body.type == "note"){
            addnote(data.body.body);
          }
      };
    websocket.onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log("Websocket Error: ",error);};
    websocket.onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log("Websocket Closed", closeEvent);};
    setrefresh(refresh?false:true);
  }
}, [getWebSocket()]);


const changetimeline = useCallback((val: any,setbeforeTimelineState) => {
    console.log("--;;",val); 
    const websocket = getWebSocket();
    if(websocket && token && val){
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
      setbeforeTimelineState(val);
    }
},[]);

return { changetimeline };
};