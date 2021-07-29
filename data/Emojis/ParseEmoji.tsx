import React from "react";
import { Image } from "react-native";
const reactStringReplace = require('react-string-replace');

const imageCom = (match) => {
  console.log("##");
  console.log(match);
  console.log("##");
  const id = Math.random().toString(32).substring(2);
  return(<Image key={match + id} style={{height:20,width:20}} source={{uri: 'https://img.utdstc.com/icon/01f/417/01f41779f41aa468bfa7d4a2d4f02e0f18ba6ff6a7ccf9ca1e8c1ac4e130a0a4:200'}} />);
 //return("ddUR");
};
const imageComemojis = (match,props) => {
  let url = "https://img.utdstc.com/icon/01f/417/01f41779f41aa468bfa7d4a2d4f02e0f18ba6ff6a7ccf9ca1e8c1ac4e130a0a4:200";
  props.emojis.forEach(element => {
    if(element["name"] == match){
        url = element["url"];
    }
    });
  const id = Math.random().toString(32).substring(2);
  return(<Image key={match + id} style={{height:20,width:20}} source={{uri: url}} />);
 //return("ddUR");
};


const ParseEmoji = (props) => {
  const str = props.text;
  if(props.emojis){
    const regexp = /:["']?([a-zA-Z0-9_\.\/\-@]+)["']?\:/g;
    let returntext;
    returntext = reactStringReplace(str, regexp, (match, i) => (imageComemojis(match,props)));
    return returntext;
  }
  const regexp = /:["']?([a-zA-Z0-9_\.\/\-@]+)["']?\:/g;
  let returntext;
  returntext = reactStringReplace(str, regexp, (match, i) => (imageCom(match)));
  return returntext;
}

export default ParseEmoji;