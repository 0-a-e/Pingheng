//import ActionSheet from "react-native-actions-sheet";
import BottomSheet from 'reanimated-bottom-sheet';
import React, { useEffect } from "react";
import { StyleSheet,View,Text, ToastAndroid,TouchableOpacity } from "react-native";
import Reply from "./Reply/Reply";
import Top from "./Reaction/Top";
import { sendAPI } from '../../data/useAPI';
import Picker from './Reaction/Picker';
import { Portal } from 'react-native-portalize';
import gettoken from '../../data/FILE/gettoken';

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
   // const [notedata, setNotedata] = useState([]);
   let notedata;
   let Mtoken:string;

   useEffect(() => {
    const f = async () => {
    Mtoken = await gettoken();
    };
    f();
  } ,[]);
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

    const Header = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      )

    const Content = () => {    
        const addreaction = async (reactionname) => {
            props.closeAction({"onlyclose":true});
            console.log(notedata.id);
            console.log(reactionname);
            const rtn = await sendAPI([Mtoken,"notes/reactions/create",{"noteId": notedata.id,"reaction": reactionname}]);
                if(!rtn === true){
                    ToastAndroid.show("エラーが発生しました。もう一度お試しください。",200);
                }
        }

        return(
            <View style={{height:"100%"}}>
                <TouchableOpacity onPress={() => {props.closeAction({"onlyclose":true})}} style={{height: '10%'}} />
                <View style={{backgroundColor:"rgb(19,20,26)",height:"90%"}}>
                    <Header />
                    <View>
                        <Top addreaction={(i:string) => {addreaction(i);}}/>
                        <Picker addreaction={(i:string) => {addreaction(i);}}/>
                    </View>
                    <Reply />
                </View>

            </View>
        )
    };

        return(
            <Portal>
                <View style={{position:"absolute",width:"100%",height:"100%",}}>
                <BottomSheet
                    ref={props.actionSheetRef}
                    initialSnap={1}
                    snapPoints={["100%",0]}
                    enabledContentTapInteraction={false}
                    renderContent={Content}
                    onCloseEnd={() => {props.closeAction({"onlyclose":false});notedata = null;}}
                    onOpenStart={() => {notedata = props.Egetactiondata();}}
                />
                </View>
             </Portal>
    )
}

export default Action;