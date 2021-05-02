import React from "react";
import { View } from "react-native";
import Mainbottomsheet from './bottomsheet/MainBottomsheet';
import Homebox from './Homebox';
import Notifybox from './Notifybox';
// <Notifybox />
const Mainbox = () => {
    return(
    <>
    <Homebox />
    <Mainbottomsheet />
    </>
    )
}
export default Mainbox;