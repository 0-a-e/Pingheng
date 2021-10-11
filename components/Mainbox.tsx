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
    const { changetimeline } = useWS();

    //以下で無限ループ
    if(TabbarState == "home"){
        changetimeline(1,timelinestatewrite,notelist,notelistwrite);
    }


return(
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
    )
}

export default Mainbox;
