import ActionSheet from "react-native-actions-sheet";
import React, { useContext } from "react";
import { View,Text } from "react-native";
import Reply from "./Reply/Reply";
import { useState } from "react";
import NotedataContext from "../../Variable/Notedata";


const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {

    const {notedata,notedatawrite} = useContext(NotedataContext);
    console.log("#--#");
    console.log(notedata);
    console.log("#--#");
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
    return(
        <ActionSheet ref={props.actionSheetRef}>
            <View style={{backgroundColor:"rgb(19,20,26)"}}>
                <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
                <Reply />
            </View>
        </ActionSheet>
    )
}
export default Action;