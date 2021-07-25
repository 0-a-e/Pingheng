import React, { useContext, useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import Settingsbox from "./Settingsbox";
import TabbarStateContext from "../Variable/TabbarState";
import emoji from "../data/Emojis/emoji";
import { useEffect,useLayoutEffect } from "react";
import NoteList from '../Variable/NoteList';
import TimelineStateContext from '../Variable/TimelineState';
import useSwitchTL from './bottomsheet/useSwitchTL';
import useOldNote from '../data/useOldNote';
import Mtokenvar from '../Variable/Mtoken';
import gettoken from '../data/FILE/gettoken';

// <Notifybox />
//2021/7/22 Mtokenが来てない
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも

/*useEffect(() => {
    emoji();
});
*/
const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any,Mtokenlocal:string) => {
    //TL切り替え完成　2021/5/2/22:50
    console.log("--ud>" + Mtokenlocal + "<ud--");
    const convertedval = convert(val);
    console.log(convertedval);
    timelinestatewrite(convertedval);
    useOldNote(Mtokenlocal,convertedval,notelist,notelistwrite);
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

  const firstloadTL = (Mtokenlocal) => {
    if(TabbarState == "home" && Mtokenlocal){
        changetimeline(1,timelinestate,timelinestatewrite,Mtokenlocal);
    }
};

const [Mtoken,Mtokenwrite] = useState();
const {convert,reconvert} = useSwitchTL();
const [timelinestate, timelinestatewrite] = useState(undefined);
const [notelist, notelistwrite] = useState([]);
const [TabbarState,TabbarStatewrite] = useState("home");

useLayoutEffect(() => {
    const f = async () => {
        const token = await gettoken();
        Mtokenwrite(token);
        firstloadTL(token);
  };
    f();
},[]);

return(
    <Mtokenvar.Provider value = {{Mtoken,Mtokenwrite}}>
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
    </Mtokenvar.Provider>
    )
}
export default Mainbox;
