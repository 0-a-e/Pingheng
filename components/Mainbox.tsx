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
import Mtokenvar from '../Variable/Mtoken';
import gettoken from '../data/FILE/gettoken';
import WSobj from "../Variable/WSobj";
import ReturnWS from '../data/FILE/ReturnWS';
import changetimeline from "../data/changetimeline";

// <Notifybox />
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも
    const [Mtoken,Mtokenwrite] = useState();
    const [timelinestate, timelinestatewrite] = useState(undefined);
    const [notelist, notelistwrite] = useState([]);
    const [TabbarState,TabbarStatewrite] = useState("home");
    const [ws,wswrite] = useState("");

    useLayoutEffect(() => {
        const f = async () => {
            const token = await gettoken();
            Mtokenwrite(token);
            if(TabbarState == "home" && token){
                changetimeline(1,timelinestatewrite,token,notelist,notelistwrite);
                ws.send(JSON.stringify({
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
                     }));
                }
        };
        f();
    },[]);

return(
    <>
    <Mtokenvar.Provider value = {{Mtoken,Mtokenwrite}}>
        <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
            <NoteList.Provider value={{ notelist, notelistwrite }}>
                <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
                <WSobj.Provider value ={{ ws,wswrite }}>
                    <ReturnWS />
                    {TabbarState == "home" && <NoteListBox />}
                    {TabbarState == "notify" && <Notifybox />}
                    {TabbarState == "settings" && <Settingsbox />}
                    <Mainbottomsheet />
                </WSobj.Provider>
                </TabbarStateContext.Provider>
            </NoteList.Provider>
        </TimelineStateContext.Provider>
    </Mtokenvar.Provider>
    </>
    )
}
export default Mainbox;
