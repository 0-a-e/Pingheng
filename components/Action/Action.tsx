import ActionSheet from "react-native-actions-sheet";
import React, { useContext } from "react";
import { View,Text } from "react-native";
import Reply from "./Reply/Reply";
import Reaction from "./Reaction/Reaction";

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
    let notedata;
    const closesheet = () => {
        props.actionSheetRef.current?.setModalVisible(false);
    }

    if(notedata != undefined){
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
        return(
            <ActionSheet ref={props.actionSheetRef} onOpen={notedata = props.Egetactiondata()}>
                <View style={{backgroundColor:"rgb(19,20,26)"}}>
                    <Reaction closesheet={() =>{closesheet();}} noteid={notedata.item.id}/>
                    <Reply />
                </View>
            </ActionSheet>
    )
    } else {
        return (<></>);
    }
}
export default Action;