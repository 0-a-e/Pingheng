import axios from "axios";
import React from "react";
import { View,Text,Image } from "react-native";
import { Input } from "react-native-elements";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
const reactStringReplace = require('react-string-replace');

const imageCom = (match) => {
  const id = Math.random().toString(32).substring(2);
  return(<Image key={match + id} style={{height:20,width:20}} source={{uri: 'http://s3.hilariousgifs.com/displeased-cat.jpg'}} />);
 //return("ddUR");
};

const ParseEmoji = (props) => {
  const str = props.text;
  const regexp = /:["']?([a-zA-Z0-9_\.\/\-]+)["']?\:/g;
  let returntext;
  returntext = reactStringReplace(str, regexp, (match, i) => (imageCom(match)));
  return returntext;
}

export default ParseEmoji;