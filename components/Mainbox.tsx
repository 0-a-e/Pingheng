import React, { useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import NoteListBox from "./Notelist/NoteListBox";
import Notifybox from './Notify/NotifyBox';
import Settingsbox from "./Settings";
import TabbarStateContext from "../Variable/TabbarState";
import { useEffect } from "react";
import TimelineStateContext from '../Variable/TimelineState';
import NotelistContext from "../Variable/NotelistContext";
import { useWS } from "../Variable/wshook";

const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも
    const [timelinestate, timelinestatewrite] = useState("homeTimeline");
    const [TabbarState,TabbarStatewrite] = useState("home");
    const [notelist, setnotelist] = useState([]);
    const [refresh,setrefresh] = useState<boolean>(false);
    const { changetimeline } = useWS(setrefresh, refresh, notelist, setnotelist);
    useEffect(() => {
        if(TabbarState == "home" && timelinestate){
                changetimeline(timelinestate);
        }
    }, [TabbarState,timelinestate,refresh]);

return(
                <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
                <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
                <NotelistContext.Provider value={{notelist,setnotelist}}>
                    {TabbarState == "home" && <NoteListBox />}
                </NotelistContext.Provider>
                    {TabbarState == "notify" && <Notifybox />}   
                    {TabbarState == "settings" && <Settingsbox />}
                    <Mainbottomsheet />
                </TabbarStateContext.Provider>
                </TimelineStateContext.Provider>
    )
}

export default Mainbox;
