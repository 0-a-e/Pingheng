import React, { useCallback, useContext, useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import NoteListBox from "./Notelist/NoteListBox";
import Notifybox from './Notify/NotifyBox';
import Settingsbox from "./Settings";
import TabbarStateContext from "../Variable/TabbarState";
//import emoji from "../data/Emojis/emoji";
import { useEffect,useLayoutEffect } from "react";
import NoteList from '../Variable/NoteList';
import TimelineStateContext from '../Variable/TimelineState';
import { useWS } from "../Variable/wshook";
import { ToastAndroid } from "react-native";
import { getserverURL } from "../data/Getmeta";
import gettoken from "../data/FILE/gettoken";
import useWebSocket from 'react-native-use-websocket';

// <Notifybox />
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも
    const [timelinestate, timelinestatewrite] = useState(undefined);
    const [notelist, notelistwrite] = useState([]);
    const [TabbarState,TabbarStatewrite] = useState("home");
    const {changetimeline,Getws,Setws,Settoken} = useWS();
        /**/
    /*     (async()=> {
            if(!unmounted) {
                Settoken(token,()=>{});
                ws.onopen = () => {
                    console.log("wsopen");
                    ws.onmessage = (rawdata) => {
                        const data = JSON.parse(rawdata.data)
                        if(data.body.type == "note"){
                            console.log(data);
                        }
                    }

                      //  Setws(ws,()=>{
                         //   ws.close(1000, "Work complete");
                          //  ws = undefined;
                    //    });

                    if(TabbarState == "home"){
                        changetimeline(1,timelinestatewrite,notelist,notelistwrite,ws,token);
                    }
                }

*/
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
    onOpen: () => console.log('opened'),
    onMessage: (message) => {
        console.log("message");
        const data = JSON.parse(message.data);
        if(data.body.type == "note"){
            console.log(data.body.body);
        }
    },
    onError: (error) => {ToastAndroid.show("WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。", 6000);console.log(error);},
    onClose: (closeEvent) => {ToastAndroid.show("WebSocket接続が切断されました。", 6000);console.log(closeEvent);},
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
});

sendJsonMessage({
    "type": "disconnect",
    "body": {
      "id": "timeline",
    }
  });
sendJsonMessage({
"type": "connect",
"body": {
    "channel": "homeTimeline",
    "id": "timeline",
    "params": {}
   }
});

return(
    <>
                <NoteList.Provider value={{ notelist, notelistwrite }}>
                <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
                <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
                    {TabbarState == "home" && <NoteListBox />}
                    {TabbarState == "notify" && <Notifybox />}
                    {TabbarState == "settings" && <Settingsbox />}
                    <Mainbottomsheet />
                </TabbarStateContext.Provider>
                </TimelineStateContext.Provider>
                </NoteList.Provider>
    </>
    )
}

export default Mainbox;
