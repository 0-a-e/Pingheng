import React, { useContext, useEffect, useRef, useState,useMemo, createRef } from 'react';
import {RefreshControlBase, StyleSheet, View} from 'react-native';
import { Button} from 'react-native-elements';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Feather';
import Textarea from './Postbox/Textarea';
import Mtokenvar from '../../Variable/Mtoken';
import { sendAPI } from '../../data/useAPI';

const box = () => {
  const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
  const textref = createRef();
  console.log("----" + Mtoken);

  const sendpost = () => {
    console.log("sendpost");
    const text = textref.current.returntext();
    console.log(text);
    if(text){
    //  progresswrite(0.2);
    //ws.send自体が無効？
      sendAPI([Mtoken,"notes/create",
      {
          "text": text
      }
      ]);
    //progresswrite(1);
    } else {
      console.log("notext");
    }
  }

const Postcreatebox = () => {
  return(
  <GestureRecognizer
  onSwipeLeft={sendpost}
  onSwipeRight={sendpost}
  config={{
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  }}
  style={{
    flex: 1,
  }}>
      <Textarea ref={textref}/>
</GestureRecognizer>
)
}

  return(
    <View>
    <Postcreatebox />
    </View>
  )
}

export default box;

/*
<Button
        title="ノート"
        //buttonStyle={styles.btmbutton}
        onPress={() => null}
        icon ={
        <Icon size={35} name="send" />
         }
         type="solid"
         />
<Button
        title=""
        //buttonStyle={styles.btmbutton}
        onPress={() => null}
        icon ={
        <Icon size={35} name="image" />
         }
         type="solid"
  />
 */
