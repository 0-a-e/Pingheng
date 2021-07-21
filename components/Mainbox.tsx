import React, { useContext, useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import Settingsbox from "./Settingsbox";
import TabbarStateContext from "../Variable/TabbarState";
import emoji from "../data/Emojis/emoji";
import { useEffect } from "react";
import NoteList from '../Variable/NoteList';
import TimelineStateContext from '../Variable/TimelineState';
import useSwitchTL from './bottomsheet/useSwitchTL';
import Mtokenvar from '../Variable/Mtoken';
import useOldNote from '../data/useOldNote';

// <Notifybox />
const Mainbox = () => {
    //後で記憶するように？いやいらんかも
useEffect(() => {
    emoji();
});
const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any) => {
    //TL切り替え完成　2021/5/2/22:50
    const convertedval = convert(val);
    useOldNote(Mtoken,convertedval,notelist,notelistwrite);
    timelinestatewrite(convertedval);
  /*   ws.send(JSON.stringify({
        "type": "disconnect",
        "body": {
        "id": "timeline",
           }
         }));
  
    ws.send(JSON.stringify({
        "type": "connect",
        "body": {
        "channel": convertedval,
        "id": "timeline",
        "params": {}
           }
         }));*/
  };

const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
const {convert,reconvert} = useSwitchTL();
const [timelinestate, timelinestatewrite] = useState(undefined);
const [notelist, notelistwrite] = useState([]);
const [TabbarState,TabbarStatewrite] = useState("home");

if(TabbarState == "home"){
    console.log("home");
    changetimeline(1,timelinestate,timelinestatewrite);
}

return(
    <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
        <NoteList.Provider value={{ notelist, notelistwrite }}>
            <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
                {TabbarState == "home" && <Homebox />}
                {TabbarState == "notify" &&<Notifybox />}
                {TabbarState == "settings" &&<Settingsbox />}
                <Mainbottomsheet />
            </TabbarStateContext.Provider>
        </NoteList.Provider>
    </TimelineStateContext.Provider>
    )
}
export default Mainbox;
