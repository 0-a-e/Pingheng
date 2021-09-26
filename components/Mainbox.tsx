import React, { useContext, useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import NoteListBox from "./Notelist/NoteListBox";
import Notifybox from './Notify/NotifyBox';
import Settingsbox from "./Settings";
import TabbarStateContext from "../Variable/TabbarState";
//import emoji from "../data/Emojis/emoji";
import { useEffect,useLayoutEffect } from "react";
import NoteList from '../Variable/NoteList';
import TimelineStateContext from '../Variable/TimelineState';
import gettoken from '../data/FILE/gettoken';
import WSobj from "../Variable/WSobj";
import ReturnWS from '../data/FILE/ReturnWS';
import changetimeline from "../data/changetimeline";
import { getserverURL } from "../data/Getmeta";

// <Notifybox />
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも
    const [timelinestate, timelinestatewrite] = useState(undefined);
    const [notelist, notelistwrite] = useState([]);
    const [TabbarState,TabbarStatewrite] = useState("home");
    const [ws,wswrite] = useState("");
    useLayoutEffect(() => {
        //メモ　絵文字追加時にemojiaddedってやつ来てるしノートのみ見るようにフィルター必要かも
        const f = async () => {
            const Mtoken = await gettoken();
            const wsurl = await getserverURL().then(res => {return "wss://" + res.replace('https://','').replace('http://','') + "/streaming?i=" + Mtoken;});
            console.log(wsurl);
            const sddf = new WebSocket(wsurl);
      //      wswrite(sddf);
            sddf.onopen = () => {
                console.log("wsopen");
                sddf.send(JSON.stringify({
                      "type": "connect",
                      "body": {
                          "channel": "homeTimeline",
                          "id": "timeline",
                          "params": {}
                         }
                   }));
            };
            sddf.onmessage = ({data}) => { console.log(data);}; 
            if(TabbarState == "home"){
                changetimeline(1,timelinestatewrite,Mtoken,notelist,notelistwrite);
                if(ws){
                    //wsがはいったときのりレンダリングでwsfoundが出るはずだが出ない
                    console.log("wsfound");
            /*    ws.send(JSON.stringify({
                    "type": "disconnect",
                    "body": {
                      "id": "timeline",
                    }
                  })); 
                  ws.send(JSON.stringify({
                    "type": "connect",
                    "body": {
                    "channel": timelinestate,
                    "id": "timeline",
                    "params": {}
                       }
                     }));*/
                } else {
                    console.log("wsnotfound");
                }
            }
        };
        f();
    },[]);

return(
    <>
                <WSobj.Provider value ={{ ws,wswrite }}>
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
                </WSobj.Provider>
    </>
    )
}
export default Mainbox;
