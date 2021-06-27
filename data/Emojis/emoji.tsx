import axios from "axios";
import React from "react";
import { View,Text } from "react-native";
import { Input } from "react-native-elements";

const Emoji = () => {
    //あとでurlに
    axios.get('http://192.168.3.5:3000').then((resp) => {
        console.log(resp);

    });
}
export default Emoji;