import React from "react";
import { Text, View } from "react-native";
const reactStringReplace = require('react-string-replace');
import { parse } from 'twemoji-parser';
import Image from 'react-native-remote-svg';

const imageComemojis = (match,props,i:number) => {
  let url = "https://lh3.googleusercontent.com/proxy/Rue5cq69mZaE4jguWbI8kblrkI6IOEdy6gnx9adIOSrgQCdPlwEb07bn2tZG79yXd6RRy9Sx-H-y2NkPdyIKrshG_EJ_dFzkA61pWGnvmxFWRofSkjTAOaW8ZQQvc1uAyIN6jyOCNwXLKY4";
  
  //絵文字リストをループして一致したらurlを代入
  props.emojis.forEach(element => {
    if(element["name"] == match || element["name"].replace(/\@./g,"") == match){
        url = element["url"];
    }
    });
//url = "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG";
//url = "https://upload.wikimedia.org/wikipedia/commons/2/25/Red.svg";
  return(
  <Image
    key={match + i}
    style={{height:20,width:20,justifyContent:"center",alignItems: 'center',backgroundColor:"green"}}
    source={{uri: url}}
  />)
  ;
};

const twemojied = (text) => {
  const twemojientity = parse(text);
  let returntext;
  //Twemojiリストをループして置換済みのリストを返す
  twemojientity.forEach((emoji: { text: string | undefined; url: string | undefined; }) => {
    returntext = reactStringReplace(text, emoji.text, (match, i) => { 
      const url = "https://upload.wikimedia.org/wikipedia/commons/2/25/Red.svg";
      //emoji.url
      return (
        <View style={{width:20,height:20}}>
        <Image
            key={match + i}
            source={{uri:emoji.url}}
            style={{height:20,width:20,justifyContent:"center",alignItems: 'center',backgroundColor:'#fff'}}
          />
        </View>
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