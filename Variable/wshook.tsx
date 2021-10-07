import React, { createContext, useState, useContext, useLayoutEffect, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import gettoken from '../data/FILE/gettoken';
import { getserverURL } from '../data/Getmeta';
import useOldNote from '../data/useOldNote';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

export const useWS = () => {
  const [ws, Setws] = useStateWithCallbackLazy(undefined);
  const [token, Settoken] = useStateWithCallbackLazy("");
/*
  useEffect(() => {
    return () => {socket.close(1000, "Work complete");
  },[]);
*/
  const changetimeline = (val: any,timelinestatewrite: any,notelist,notelistwrite,localws,localtoken:string) => {
    let mws;
    let mtoken;    
    if(localws && localtoken){
      mws = localws;
      mtoken = localtoken;
    } else {
      mws = ws;
      mtoken = token;
    }
    if(mws && mtoken){
    const convertedval = convert(val);
    useOldNote(mtoken,convertedval,notelist,notelistwrite);
   // timelinestatewrite(convertedval);
     mws.send(JSON.stringify({
            "type": "disconnect",
            "body": {
              "id": "timeline",
            }
          }));
    mws.send(JSON.stringify({
        "type": "connect",
        "body": {
            "channel": convertedval,
            "id": "timeline",
            "params": {}
           }
     }));
   } else {
      console.log("ws and Mtoken not ready");
   }
};

const Getws = () => {
  return ws;
}
  return {changetimeline,Getws,Setws,Settoken};
  };