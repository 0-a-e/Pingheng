//import ActionSheet from "react-native-actions-sheet";
import BottomSheet from 'reanimated-bottom-sheet'
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet,View,Text, ToastAndroid, Dimensions,BackHandler } from "react-native";
import Reply from "./Reply/Reply";
import Top from "./Reaction/Top";
import { sendAPI } from '../../data/useAPI';
import Mtokenvar from '../../Variable/Mtoken';
import Picker from './Reaction/Picker';
import { Portal } from 'react-native-portalize';

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
    const [notedata, setNotedata] = useState([]);
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
    let ifopensheet = false;

    const styles = StyleSheet.create({
        header: {
            backgroundColor:"rgb(19,20,26)",
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
    });

    const closesheet = () => {
        props.actionSheetRef.current?.snapTo(1);
    } 

    const backAction = () => {
         if(ifopensheet){
            closesheet();
            return true;
         } else {
            console.log("eee");
            return false;
        }
    };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    const Header = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      )

    const Content = () => {    
        const addreaction = async (reactionname) => {
            closesheet();
            const rtn = await sendAPI([Mtoken,"notes/reactions/create",{"noteId": notedata.id,"reaction": reactionname}]);
                if(!rtn === true){
                    ToastAndroid.show("エラーが発生しました。もう一度お試しください。",200);
                }
        }

        return(
            <View style={{backgroundColor:"rgb(19,20,26)"}}>
                {notedata ?
                <>
                    <View>
                        <Top addreaction={(i:string) => {addreaction(i);}}/>
                        <Picker addreaction={(i:string) => {addreaction(i);}}/>
                    </View>
                    <Reply />
                </>
                :
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",marginTop:10,marginBottom:10}}>読み込み中..</Text>
                </View>
                }
            </View>
        )
    };

    //console.log(props);
    //if(notedata != undefined){
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
        return(
            <Portal>
                <BottomSheet
                    //backDropColor="red"
                    ref={props.actionSheetRef}
                    initialSnap={1}
                    snapPoints={["90%",0]}
                    enabledContentTapInteraction={false}
                    renderHeader={Header}
                    renderContent={Content}
                    onCloseEnd={() => {ifopensheet = false;}}
                    onOpenEnd={() => {ifopensheet = true;}}
                />
             </Portal>
         
/* 
            <ActionSheet ref={props.actionSheetRef} onClose={() => {setNotedata(null);}} onOpen={() => {const n = props.Egetactiondata(); setNotedata(n);}} 
            containerStyle={{backgroundColor:"rgb(19,20,26)",borderRadius:20,height:(Dimensions.get("window").height /10) * 9}} drawUnderStatusBar={false} indicatorColor={"white"} headerAlwaysVisible={true}>

            </ActionSheet>*/
    )



  //  } else {
 //       return (<></>);
 //   }
}
/*
*/
export default Action;