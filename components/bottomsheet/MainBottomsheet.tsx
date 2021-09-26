import React, { useContext,useEffect,useState } from 'react';
import { StyleSheet, Text, View,Keyboard,Dimensions, TouchableNativeFeedback } from 'react-native';
import { Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import SwitchTimeline from './TimelineSwitchButton';
import Box from './Postbox';
import TabbarStateContext from '../../Variable/TabbarState';
import BottomSheet from 'reanimated-bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler';
import gettoken from '../../data/FILE/gettoken';

const MainBottomsheet = () => {

  const [Mtoken,Mtokenwrite] = useState();
  const {TabbarState,TabbarStatewrite} = useContext(TabbarStateContext);

  const [bartoggle,bartoggleWrite] = useState(true);
  const bottomsheetref = React.useRef();

  useEffect(() => {
    const f = async () => {
    const token = await gettoken();
    Mtokenwrite(token);
    };
    f();
  } ,[]);
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
        header: {
          backgroundColor:"rgba(5,5,20,0.95)",
          shadowColor: '#000000',
          paddingTop: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        panelHeader: {
          alignItems: 'center',
        },
        panelHandle: {
          width: 40,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#fff',
          marginBottom: 5,
        },

    }
  );
    
  //homeは外部含めたフォロー中
  //globalは外内全部
  //localは内全部
  //hybrid ?
  
  const Navbtn = (props: { indexname: string; icon: string; }) => {
    return(
      <TouchableOpacity  style={{width:150,borderRadius:20,height:70,alignItems: 'center',justifyContent: 'center'}}
      onPress={() => {TabbarStatewrite(props.indexname);bottomsheetref.current.snapTo(1);}}
      >
           <Icon size={55} name={props.icon} color="rgb(180,180,230)"/>
      </TouchableOpacity>
    )
  }

  const Insheet = () => {
    return(
    <View style={{height:"100%",backgroundColor:"rgba(5,5,20,0.95)"}}>
      {bartoggle &&
   <View style={styles.btmbox} >
   <Navbtn icon="hexagon" indexname="home" />
   <Navbtn icon="bell" indexname="notify" />
 </View>
    }
      <View>
        <Box Mtoken={Mtoken}/>
      </View>

      <View style={{position:'absolute',bottom: 0,backgroundColor: "transparent",width:"100%",height:190,}}>
      <Button 
      containerStyle={{position:"absolute",top:0,right:20,width:60,height:60,borderRadius:50}}
      buttonStyle={{width:60,height:60,borderRadius:50,backgroundColor:"rgb(30,30,46)"}}
      icon={<Icon size={30} name={"settings"} color="rgb(180,180,230)"/>}
      onPress={() => {TabbarStatewrite("settings");
      bottomsheetref.current.snapTo(1);
          }
        }
      />
        <SwitchTimeline Mtoken={Mtoken} bottomsheetref={bottomsheetref}/>
      </View>  

    </View>
    )
}


 const Header = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
)

    return (
    <BottomSheet
    //backDropColor="red"
    ref={bottomsheetref}
    initialSnap={1}
    snapPoints={["95%",70 + 5 + 5 + 8]}
    enabledContentTapInteraction={false}
    renderHeader={Header}
    renderContent={Insheet}
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