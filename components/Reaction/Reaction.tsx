import ActionSheet from "react-native-actions-sheet";
import React, { useContext } from "react";
import { View,Text } from "react-native";
const Reaction = (props: {reactionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
    const closesheet = () => {
        props.reactionSheetRef.current?.setModalVisible(false);
    }
        return(
            <ActionSheet ref={props.reactionSheetRef}>
                <View style={{backgroundColor:"rgb(19,20,26)"}}>
                  <Text style={{color:"#fff"}}>ooo</Text>
                </View>
            </ActionSheet>
    );
}
export default Reaction;