import React, { useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import Settingsbox from "./Settingsbox";
import TabbarStateContext from "../Variable/TabbarState";
//import emoji from "../data/Emojis/emoji";
import { useEffect,useLayoutEffect } from "react";
import NoteList from '../Variable/NoteList';
import TimelineStateContext from '../Variable/TimelineState';
import Mtokenvar from '../Variable/Mtoken';
import gettoken from '../data/FILE/gettoken';
import changetimeline from '../data/changetimeline';

// <Notifybox />
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも

    /*useEffect(() => {
        emoji();
    });
    */

    const [Mtoken,Mtokenwrite] = useState();
    const [timelinestate, timelinestatewrite] = useState(undefined);
    const [notelist, notelistwrite] = useState([]);
    const [TabbarState,TabbarStatewrite] = useState("home");

    useLayoutEffect(() => {
        const f = async () => {
            const token = await gettoken();
            Mtokenwrite(token);
            if(TabbarState == "home" && token){
                changetimeline(1,timelinestate,timelinestatewrite,token,notelist,notelistwrite);
            }
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
