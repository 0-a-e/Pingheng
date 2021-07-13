import React, {createRef } from 'react';
import {View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Textarea from './Postbox/Textarea';
import { sendAPI } from '../../data/useAPI';

const box = (Props:{Mtoken:string}) => {
  const textref = createRef();

  const sendpost = () => {
    console.log("sendpost");
    const text = textref.current.returntext();
    console.log(text);
    if(text){
    //  progresswrite(0.2);
    //ws.send自体が無効？
      sendAPI([Props["Mtoken"],"notes/create",
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
