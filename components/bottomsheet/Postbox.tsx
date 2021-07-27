import React, {createRef, useState } from 'react';
import {View,Text} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Textarea from './Postbox/Textarea';
import { sendAPI } from '../../data/useAPI';
import Icon from 'react-native-vector-icons/Feather';

const box = (Props:{Mtoken:string}) => {
  const textref = createRef();
  const [showsuccess,showsuccesswrite] = useState(false);

  const sleep = (ms: number) =>{
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const sendpost = async () => {    
    const text = textref.current.returntext();
    if(text){
    //  progresswrite(0.2);
    //ws.send自体が無効？
      sendAPI([Props["Mtoken"],"notes/create",
      {
          "text": text
      }
      ]);
    //progresswrite(1);
      showsuccesswrite(true);
      console.log("e");
      await sleep(400);
     console.log("d");
      showsuccesswrite(false);
    } else {
      console.log("notext");
    }
  }

const Postcreatebox = () => {
  return(
  <>
{showsuccess &&
   <View style={{position:"relative",zIndex:4,backgroundColor:"#52a352",width:"90%",height:180,borderRadius:20,marginLeft:"5%",marginRight:"5%"}}>
   <Icon size={45} 
     //style={{backgroundColor:"red"}}
     name="check-circle" color="rgb(255,255,255)"
     />
  </View>
}
  <GestureRecognizer
  onSwipeLeft={sendpost}
  onSwipeRight={sendpost}
  config={{
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  }}
  style={{
    flex: 1,
    position: "absolute",
    width:"100%"
  }}>
      <Textarea ref={textref}/>
</GestureRecognizer>
</>
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
