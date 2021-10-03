import React, { createContext, useState, useContext, useLayoutEffect, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import gettoken from '../data/FILE/gettoken';
import { getserverURL } from '../data/Getmeta';
import useOldNote from '../data/useOldNote';

export const useWS = () => {
 // const [ws, Setws] = useState();
 // const [token, settoken] = useState();
  useEffect(() => {
    /*    gettoken().then(ltoken => {
          console.log("gettokenthentoken: " + ltoken);
        //  settoken(ltoken);
        getserverURL().then(res => {
          const wsurl = "wss://" + res.replace('https://','').replace('http://','') + "/streaming?i=" + ltoken;
          console.log(wsurl);
          const sddf = new WebSocket(wsurl);
        //    Setws(sddf);
          sddf.onopen = () => {
              console.log("wsopen");
              sddf.onmessage = ({data}) => console.log(data);
          };
        });
      });*/
      (async()=> {
        const token = await gettoken();
        const serverURL = await getserverURL();
        const WebsocketURL = "wss://" + serverURL.replace('https://','').replace('http://','') + "/streaming?i=" + token;
        const ws = new WebSocket(WebsocketURL);
        ws.onerror = () => ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続や、サーバーの状態を確認してください。", 6000);
        ws.onclose = () => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log("disconnected");};
        ws.onopen = () => {
          console.log("wsopen");
          ws.onmessage = ({data}) => console.log(data);
        };
      })();
      return () => { console.log("クリーンアップ関数"); }
}, []);


  const changetimeline = (val: any,timelinestatewrite: any,notelist,notelistwrite) => {
  //  if(ws && token){
    const convertedval = convert(val);
    timelinestatewrite(convertedval);
   /*  changestatus({
            "type": "disconnect",
            "body": {
              "id": "timeline",
            }
          });
    changestatus({
        "type": "connect",
        "body": {
            "channel": convertedval,
            "id": "timeline",
            "params": {}
           }
     }); */
  //  useOldNote(Mtoken,convertedval,notelist,notelistwrite);
   // } else {
  //    console.log("ws and Mtoken not ready");
  //  }

};

  const changestatus = (tlstatus) => {
      if(ws){
           ws.send(JSON.stringify({tlstatus}));
      } else {
          console.log('ws is not ready');
      }
    };

  const CWS = () => (<></>);
  return {changetimeline,CWS};
  };