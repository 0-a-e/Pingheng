import { useCallback, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import useWebSocket from "react-native-use-websocket";
import { convert } from "../components/bottomsheet/useSwitchtltranslator";
import gettoken from "../data/FILE/gettoken";
import { getserverURL } from "../data/Getmeta";
import useOldNote from "../data/useOldNote";

 
export const useWS = () => {
  const [token, setToken] = useState("");

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
              console.log(data.body.body);
          }
      };
    getWebSocket().onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log(error);};
    getWebSocket().onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log(closeEvent);};
  }
}, [getWebSocket()]);

const changetimeline = (val: any,timelinestatewrite: any,notelist,notelistwrite,) => {
    const convertedval = convert(val);
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
        "channel": convertedval,
        "id": "timeline",
        "params": {}
       }
      }));
    }
    if(token){
      console.log("token: ", token);
      useOldNote(token,convertedval,notelist,notelistwrite);
    }
 // timelinestatewrite(convertedval);
};

return { changetimeline };
};