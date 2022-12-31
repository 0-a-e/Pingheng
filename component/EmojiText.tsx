import React from 'react';
import {Text, View} from 'react-native';
import Image from 'react-native-remote-svg';
const reactStringReplace = require('react-string-replace');
import {parse} from 'twemoji-parser';
//import Image from 'react-native-remote-svg';
import {v4 as uuidv4} from 'uuid';
//import FastImage from 'react-native-fast-image';
//import SvgUri from 'react-native-fast-svg';

//絵文字の時もnumberOfLinesが効くようにする
const imageComemojis = (
  match: number,
  props: {children: string; emojis: any; style?: any; number?: number},
  i: number,
) => {
  let fontSize: number =
    props.style && props.style.fontSize ? props.style.fontSize : 20;
  let url =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Question_mark_alternate.png/640px-Question_mark_alternate.png';
  //絵文字リストをループして一致したらurlを代入
  props.emojis.forEach(element => {
    if (element.name === match || element.name.replace(/@./g, '') === match) {
      url = element.url;
    }
  });
  return (
    <Image
      key={match + i + uuidv4()}
      style={{
        width: fontSize,
        height: fontSize,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={{uri: url}}
    />
  );
};

const wraptext = (rtextraw: any[], style: any) => {
  let rtext = rtextraw;
  rtextraw.forEach((elem, index) => {
    if (typeof elem === 'string') {
      rtext[index] = (
        <Text key={elem + index + uuidv4()} style={style}>
          {elem}
        </Text>
      );
    }
  });
  return <View style={{flexDirection: 'row'}}>{rtext}</View>;
};

const twemojied = (text: string, style: any) => {
  const twemojientity = parse(text);
  let returntext;
  let fontSize: number = style && style.fontSize ? style.fontSize : 20;
  //Twemojiリストをループして置換済みのリストを返す
  twemojientity.forEach(
    (emoji: {text: string | undefined; url: string | undefined}) => {
      returntext = reactStringReplace(
        text,
        emoji.text,
        (match: any, i: number) => {
          return (
            <Image
              key={match + i + uuidv4()}
              source={{uri: emoji.url}}
              style={{
                width: fontSize,
                height: fontSize,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          );
        },
      );
    },
  );
  return returntext;
};

const EmojiText = (props: {
  children: string;
  emojis: string;
  style?: any | any[];
  numberOfLines?: number;
}) => {
  const text = props.children;
  //絵文字ある時
  if (props.emojis && props.emojis.length > 0) {
    const regexp = /:["']?([a-zA-Z0-9_./\-@<>]+)["']?:/g;
    let returntext;
    /*  const twemojieding = twemojied(text, props.style);
        if (twemojieding !== undefined) {
    returntext = reactStringReplace(twemojieding, regexp, (match, i) =>
      imageComemojis(match, props, i),
    );
    return wraptext(returntext, props.style);
     } else {*/
    returntext = reactStringReplace(text, regexp, (match, i) =>
      imageComemojis(match, props, i),
    );
    return wraptext(returntext, props.style);
    //}
  } else {
    /* let twemojieding = twemojied(text, props.style);
    if (twemojieding !== undefined) {
      return wraptext(twemojieding, props.style);
    } else {*/
    return (
      <Text
        style={props.style}
        {...(props.numberOfLines && {numberOfLines: props.numberOfLines})}>
        {text}
      </Text>
    );
    //}
  }
};

export default EmojiText;
export {twemojied};
