import React, { ComponentState, useRef, useState } from 'react';
import { StyleSheet, Text, View,Keyboard,Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button} from 'react-native-elements';
import  BottomSheet from "react-native-bottomsheet-reanimated";
import Icon from 'react-native-vector-icons/Feather';
import SwitchTimeline from './SwitchTimeline';
import Box from './Postbox';

const MainBottomsheet = () => {

const postclose = () =>{
  bartoggleWrite(true);
  Keyboard.dismiss();
}

const postopen = () =>{
  bartoggleWrite(false);
  //textareaにフォーカス;
} 

    const styles = StyleSheet.create({
      container: {
     backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        flex: 1,
      },
      btmbox: {
      //  flex: 1,
      flexWrap: "wrap",
      width: "100%",
      alignSelf: "flex-start",
        flexDirection: 'row',
        alignItems:'stretch',
        justifyContent:'space-between'
      },

      btmbutton:{
        position: "relative",
        width: 150,
        height:70,
        borderRadius:20,
        backgroundColor: "transparent"
        },

    }
    );
    
  //homeは外部含めたフォロー中
  //globalは外内全部
  //localは内全部
  //hybrid ?
  
    
  const [bartoggle,bartoggleWrite] = useState(true);
  const bottomsheetref = React.useRef();
  
    
    
    return (
    <BottomSheet
    //backDropColor="red"
    ref={bottomsheetref}
    initialPosition={"50%"}  //200, 300
    snapPoints={["95%" ,100]}
    isBackDrop={false}
    isBackDropDismisByPress={true}
    //効かない？
    borderRadius={50}
    isRoundBorderWithTipHeader={true}
    enabledContentTapInteraction={false}
    onOpenStart={() => postopen()}
    onCloseend={() => postclose()}
    // isModal
    //containerStyle={{backgroundColor:"red"}}
     tipStyle={{backgroundColor:"#fff"}}
    headerStyle={{padding:10,backgroundColor:"rgba(5,5,20,0.7)",borderRadiusTop:50}}
     bodyStyle={{backgroundColor:"rgba(5,5,20,0.7)",flex:1}}
    body={
      <View style={{height:Dimensions.get('window').height - 63}}>
        {bartoggle &&
      <View style={styles.btmbox} >
        <Button
        title=""
        buttonStyle={styles.btmbutton} 
        onPress={() => console.log}
        icon ={
        <Icon size={55} name="hexagon" color="rgb(180,180,230)"/>
         }
         type="clear"
         />
  
        <Button
        title=""
        buttonStyle={styles.btmbutton}
        onPress={() => null}
        icon ={
        <Icon size={55} name="bell" color="rgb(180,180,230)"/>
         }
         type="clear"
         />
        </View>
        }

        <View>
        <Text>{bartoggle.toString()}</Text>

        <Box />  
</View>
<View style={{position:'absolute',bottom: 0,backgroundColor: "transparent",width:"100%"}}>
<SwitchTimeline/>
</View>  
      </View>
    }
  />
);
};
 export default MainBottomsheet; 
 
 /*        <Button
        title="test"
        //buttonStyle={styles.btmbutton}
        onPress={() => postclose()}
         type="solid"
/>
      <Button
        title="test2"
        //buttonStyle={styles.btmbutton}
        onPress={() => postopen()}
         type="solid"
/> */