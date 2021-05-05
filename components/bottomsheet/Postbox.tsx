import React, { useContext, useEffect, useRef, useState,useMemo } from 'react';
import {StyleSheet, View} from 'react-native';
import { Button} from 'react-native-elements';
import GestureRecognizer from 'react-native-swipe-gestures';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import WSobj from '../../Variable/WSobj';
import { v4 as uuidv4 } from 'uuid';

const box = () => {

    const {ws,wswrite} = useContext(WSobj);
    const [text,textwrite] = useState("");
    const [progress,progresswrite] = useState(0);


const sendpost = () => {
    console.log("sendpost");
    console.log(text);
    progresswrite(0.2);
//ws.send自体が無効？
console.log(ws.send("dd"));
    progresswrite(1);

}

const loadingstyles = StyleSheet.create({

});

const styles = StyleSheet.create({
          textarea: {
            textAlignVertical: 'top',  // hack android
            height: 170,
            fontSize: 14,
            color: '#333',
          },
          textareaContainer: {
            height: 180,
            padding: 4,
            backgroundColor: '#F5FCFF',
          },
    });

const Textareabox = () => {
    return(
    <Textarea
containerStyle={styles.textareaContainer}
style={styles.textarea}
//defaultValue={this.state.text}
maxLength={3000}
placeholder={'ノートしたいことを入力...'}
placeholderTextColor={'#c7c7c7'}
underlineColorAndroid={'transparent'}
//text => textはないと再レンダリングで消える
onChangeText={(text: string) => {textwrite(text => text)}}
/>
)
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
        <Textareabox />
</GestureRecognizer>
)
}

const Loading = () => {
    return(
<Progress.Bar
progress={progress}
width={null}
useNativeDriver={true}
animationType={"decay"} 
/>
    )
}


return(
<View>
<Loading />
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