import ActionSheet from "react-native-actions-sheet";
import React, { useContext, useState } from "react";
import { View,Text } from "react-native";
import Reply from "./Reply/Reply";
import Reaction from "./Reaction/Reaction";

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
    const [notedata, setNotedata] = useState([]);
    const closesheet = () => {
        props.actionSheetRef.current?.setModalVisible(false);
    }
    //console.log(props);
    //if(notedata != undefined){
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
        return(
            <ActionSheet ref={props.actionSheetRef} onClose={() => {setNotedata(null);}} onOpen={() => {const n = props.Egetactiondata(); setNotedata(n);}}  containerStyle={{backgroundColor:"rgb(19,20,26)"}} drawUnderStatusBar={false} indicatorColor={"white"} headerAlwaysVisible={true}>
                <View style={{backgroundColor:"rgb(19,20,26)"}}>
                {notedata ?
                <>
                    <Reaction closesheet={() =>{closesheet();}} noteid={notedata.id}/>
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