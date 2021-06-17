import React, { useState,sets } from "react";
import { View } from "react-native";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
import TabbarStateContext from "../Variable/TabbarState";

// <Notifybox />
const Mainbox = () => {
//後で記憶するように？いやいらんかも

const [TabbarState,TabbarStatewrite] = useState("home");
return(
   <TabbarStateContext.Provider value={{ TabbarState,TabbarStatewrite }}>
    {TabbarState == "home" && <Homebox />}
    {TabbarState == "notify" &&<Notifybox />}
    <Mainbottomsheet />
    </TabbarStateContext.Provider>
    )
}
export default Mainbox;
