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
            if(token == ""){
              setToken(localtoken);
            }
            const serverURL = await getserverURL();
            const WebsocketURL = "wss://" + serverURL.replace('https://','').replace('http://','') + "/streaming?i=" + localtoken;
            resolve(WebsocketURL);
        });
}, []);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(getSocketUrl, {
  shared: true,
    shouldReconnect: (closeEvent) => true
  });

useEffect(() => {
  if(getWebSocket()){
    getWebSocket().onopen = () => console.log("opened");
    getWebSocket().onmessage = (message) => {
          const data = JSON.parse(message.data);
          if(data.body.type == "note"){
            addnote(data.body.body);
          }
      };
    getWebSocket().onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log(error);};
    getWebSocket().onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log(closeEvent);};
  }
}, [getWebSocket()]);


const changetimeline = useCallback((val: any) => {
    if(getWebSocket()){
      getWebSocket().send(JSON.stringify({
        "type": "disconnect",
        "body": {
          "id": "timeline",
        }
      }));
      getWebSocket().send(JSON.stringify({
      "type": "connect",
      "body": {
        "channel": val,
        "id": "timeline",
        "params": {}
       }
      }));
    }

    if(token){
      console.log("token: ", token);
      //returnnotelist();
      addoldnote(token,val);
    }
},[]);

const changetimelinestate = useCallback((val: any,timelinestatewrite:any) => {
  timelinestatewrite(val);
},[]);

return { changetimeline,changetimelinestate };
};