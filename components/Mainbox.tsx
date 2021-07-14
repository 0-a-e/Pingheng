import React, { useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import Settingsbox from "./Settingsbox";
import TabbarStateContext from "../Variable/TabbarState";
import emoji from "../data/Emojis/emoji";
import { useEffect } from "react";
import NoteList from '../Variable/NoteList';

// <Notifybox />
const Mainbox = () => {
    //後で記憶するように？いやいらんかも
useEffect(() => {
    emoji();
});

const [notelist, notelistwrite] = useState([]);
const [TabbarState,TabbarStatewrite] = useState("home");
if(TabbarState == "notify"){
}
return(

    <NoteList.Provider value={{ notelist, notelistwrite }}>
        <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
            {TabbarState == "home" && <Homebox />}
            {TabbarState == "notify" &&<Notifybox />}
            {TabbarState == "settings" &&<Settingsbox />}
            <Mainbottomsheet />
        </TabbarStateContext.Provider>
    </NoteList.Provider>
    )
}
export default Mainbox;
