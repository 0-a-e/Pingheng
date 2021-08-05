import React from "react";
import { Image,Text } from "react-native";
const reactStringReplace = require('react-string-replace');
import { parse } from 'twemoji-parser';
import SvgUri from 'react-native-svg-uri';

const imageComemojis = (match,props,i:number) => {
  let url = "https://lh3.googleusercontent.com/proxy/Rue5cq69mZaE4jguWbI8kblrkI6IOEdy6gnx9adIOSrgQCdPlwEb07bn2tZG79yXd6RRy9Sx-H-y2NkPdyIKrshG_EJ_dFzkA61pWGnvmxFWRofSkjTAOaW8ZQQvc1uAyIN6jyOCNwXLKY4";
  
  //絵文字リストをループして一致したらurlを代入
  props.emojis.forEach(element => {
    if(element["name"] == match || element["name"].replace(/\@./g,"") == match){
        url = element["url"];
    }
    });
  return(<Image key={match + i} style={{height:20,width:20}} source={{uri: url}} />);
};

const twemojied = (text) => {
  const twemojientity = parse(text);
  let returntext;
  //Twemojiリストをループして置換済みのリストを返す
  twemojientity.forEach((emoji: { text: string | undefined; url: string | undefined; }) => {
    returntext = reactStringReplace(text, emoji.text, (match, i) => { 
      return (
        <SvgUri
          key={match + i}
          height={20}
          width={20}
          source={{uri: emoji.url}}
        />
      )
    });
  });
  return returntext;
}

const ParseEmoji = (props: { text: any; emojis: string | any[]; }) => {
  const str = props.text;
  if(props.emojis && props.emojis.length > 0){
    const regexp = /:["']?([a-zA-Z0-9_\.\/\-@<>]+)["']?\:/g;
    let returntext;
    const twemojieding = twemojied(str);
   
    if(twemojieding != undefined){
      //returntext = twemojieding;
      returntext = reactStringReplace(twemojieding, regexp, (match, i) => (imageComemojis(match,props,i)));
    } else {
      returntext = reactStringReplace(str, regexp, (match, i) => (imageComemojis(match,props,i)));
    }
    return returntext;
  } else {
    const twemojieding = twemojied(str);
    if(twemojieding != undefined){
    return twemojieding;
    } else  {
      return str;
    }
  }

}


export default ParseEmoji;
export {twemojied};