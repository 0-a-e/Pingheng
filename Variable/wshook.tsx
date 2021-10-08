/*import React, { createContext, useState, useContext, useLayoutEffect, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import gettoken from '../data/FILE/gettoken';
import { getserverURL } from '../data/Getmeta';
import useOldNote from '../data/useOldNote';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export const useWS = () => {
  const [ws, Setws] = useStateWithCallbackLazy(undefined);
  const [token, Settoken] = useStateWithCallbackLazy("");

  useEffect(() => {
    return () => {socket.close(1000, "Work complete");
  },[]);
*/
/* 
 
const Getws = () => {
  return ws;
}
  return {changetimeline,Getws,Setws,Settoken};
  };
  */

import { useCallback, useEffect } from "react";
import { ToastAndroid } from "react-native";
import useWebSocket from "react-native-use-websocket";
import { convert } from "../components/bottomsheet/useSwitchtltranslator";
import gettoken from "../data/FILE/gettoken";
import { getserverURL } from "../data/Getmeta";

 
export const useWS = () => {
  const getSocketUrl = useCallback(() => {
    return new Promise (async resolve => {
            const token = await gettoken();
            const serverURL = await getserverURL();
            const WebsocketURL = "wss://" + serverURL.replace('https://','').replace('http://','') + "/streaming?i=" + token;
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
  /* *  onOpen: () => console.log('opened'),
  nMessage: (message) => {
        console.log("message");
        const data = JSON.parse(message.data);
        if(data.body.type == "note"){
            console.log(data.body.body);
        }
    },
    onError: (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log(error);},
    onClose: (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log(closeEvent);},
    //Will attempt to reconnect on all close events, such as server shutting down*/
    shouldReconnect: (closeEvent) => true
});
useEffect(() => {
  if(getWebSocket()){
    getWebSocket().onopen = () => console.log("opened");
    getWebSocket().onmessage = (message) => {
          console.log("message");
          const data = JSON.parse(message.data);
          if(data.body.type == "note"){
              console.log(data.body.body);
          }
      };
    getWebSocket().onerror = (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log(error);};
    getWebSocket().onclose = (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log(closeEvent);};
  }
}, [getWebSocket()]);

const changetimeline = (
  //val: any,timelinestatewrite: any,notelist,notelistwrite,localws,localtoken:string
  ) => {
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
        "channel": "homeTimeline",
        "id": "timeline",
        "params": {}
       }
      }));
    }
 // const convertedval = convert(val);
  //useOldNote(mtoken,convertedval,notelist,notelistwrite);
 // timelinestatewrite(convertedval);
};
return { changetimeline };
};