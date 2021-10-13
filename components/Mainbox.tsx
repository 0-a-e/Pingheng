import React, { useCallback, useContext, useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import NoteListBox from "./Notelist/NoteListBox";
import Notifybox from './Notify/NotifyBox';
import Settingsbox from "./Settings";
import TabbarStateContext from "../Variable/TabbarState";
import { useEffect,useLayoutEffect } from "react";
import TimelineStateContext from '../Variable/TimelineState';
import { useWS } from "../Variable/wshook";

// <Notifybox />
const Mainbox = () => {
    //後でTL状態記憶するように？いやいらんかも
    const [timelinestate, timelinestatewrite] = useState(undefined);
    const [TabbarState,TabbarStatewrite] = useState("home");    
    const { changetimeline,changetimelinestate } = useWS();
    //以下で無限ループ
    useEffect(() => {
        //タブバーの変更
        console.log(timelinestate);
        if(TabbarState == "home"){
            changetimelinestate(timelinestate,timelinestatewrite);
            changetimeline(timelinestate);
        }
    }, [TabbarState,timelinestate]);

return(
                <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
                <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
                    {TabbarState == "home" && <NoteListBox />}
                    {TabbarState == "notify" && <Notifybox />}
                    {TabbarState == "settings" && <Settingsbox />}
                    <Mainbottomsheet />
                </TabbarStateContext.Provider>
                </TimelineStateContext.Provider>
    )
}

export default Mainbox;
