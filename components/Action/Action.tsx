import ActionSheet from "react-native-actions-sheet";
import React, { useContext } from "react";
import { View,Text } from "react-native";
import Reply from "./Reply/Reply";
import { useState } from "react";
import NotedataContext from "../../Variable/Notedata";
import Reaction from "./Rection/Reaction";

const Action = (props: {actionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {

    const {notedata,notedatawrite} = useContext(NotedataContext);
    console.log("#-Action.tsx-notedata-#");
    console.log(notedata);
    console.log("#-Action.tsx-notedata-end-#");
    //const [noteid,noteidwrite] = useState(props.data["item"]["text"]);
    return(
        <ActionSheet ref={props.actionSheetRef}>
            <View style={{backgroundColor:"rgb(19,20,26)"}}>
                <Reaction />
                <Reply />
            </View>
        </ActionSheet>
    )
}
export default Action;