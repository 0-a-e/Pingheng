import ActionSheet from "react-native-actions-sheet";
import React, { useContext, useState } from "react";
import { View,Text, ToastAndroid } from "react-native";
import Reply from "./Reply/Reply";
import Reaction from "./Reaction/Reaction";
import Top from "./Reaction/Top";
import { sendAPI } from '../../data/useAPI';
import Mtokenvar from '../../Variable/Mtoken';
import Picker from './Reaction/Picker';

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
    const [notedata, setNotedata] = useState([]);
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);

    const closesheet = () => {
        props.actionSheetRef.current?.setModalVisible(false);
    }
    
    const addreaction = async (reactionname) => {
        closesheet();
        const rtn = await sendAPI([Mtoken,"notes/reactions/create",{"noteId": notedata.id,"reaction": reactionname}]);
            if(!rtn === true){
                ToastAndroid.show("エラーが発生しました。もう一度お試しください。",200);
            }
    }
    //console.log(props);
    //if(notedata != undefined){
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
        return(
            <ActionSheet ref={props.actionSheetRef} onClose={() => {setNotedata(null);}} onOpen={() => {const n = props.Egetactiondata(); setNotedata(n);}}  containerStyle={{backgroundColor:"rgb(19,20,26)"}} drawUnderStatusBar={false} indicatorColor={"white"} headerAlwaysVisible={true}>
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
            </ActionSheet>
    )



  //  } else {
 //       return (<></>);
 //   }
}
/*
*/
export default Action;