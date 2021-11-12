import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import useWebSocket from "react-native-use-websocket";
import { convert } from "../components/bottomsheet/useSwitchtltranslator";
import gettoken from "../data/FILE/gettoken";
import { getserverURL } from "../data/Getmeta";
import { usenotelist } from "./usenotelist";

export const useWS = (setrefresh: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },refresh: boolean,notelist,setnotelist) => {
  let token = "";
  console.log("wshook reload");
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

//3回のリレンダリングの原因はこれっぽい
  const {getWebSocket} = useWebSocket(getSocketUrl, {
    shared: true,
    shouldReconnect: (closeEvent) => true
  });

useEffect(() => {
  console.log("==wshook useeffect==");
  const websocket = getWebSocket();
  if(websocket){
    console.log("useeffect getWebsocket found!");
    websocket.onopen = () => console.log("opened");
    websocket.onmessage = (message) => {
          const data = JSON.parse(message.data);
          if(data.body.type == "note"){
            console.log("note");
            addnote(data.body.body);
            console.log("afternote");
          }
      };
    websocket.onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log("Websocket Error: ",error);};
    websocket.onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log("Websocket Closed", closeEvent);};
    setrefresh(refresh?false:true);
  } else {
    console.log("useeffect getwebsocket not found");
  }
}, [getWebSocket()]);


const changetimeline = useCallback((val: any) => {
    const websocket = getWebSocket();
    if(websocket && token && val){
      console.log("changetimeline: Websocket and token found!");
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