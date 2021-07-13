import React, { useState } from "react";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import Settingsbox from "./Settingsbox";
import TabbarStateContext from "../Variable/TabbarState";
import emoji from "../data/Emojis/emoji";
import { useEffect } from "react";

// <Notifybox />
const Mainbox = () => {
    //後で記憶するように？いやいらんかも
useEffect(() => {
    emoji();
});


const [TabbarState,TabbarStatewrite] = useState("home");
if(TabbarState == "notify"){
}
return(
   <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
    {TabbarState == "home" && <Homebox />}
    {TabbarState == "notify" &&<Notifybox />}
    {TabbarState == "settings" &&<Settingsbox />}
    <Mainbottomsheet />
    </TabbarStateContext.Provider>
    )
}
export default Mainbox;
