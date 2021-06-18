import React from "react";
import { View,Text } from "react-native";
import { Input } from "react-native-elements";

const Reply = (props) => {
    return(
        <View>
            
            <Input
            inputContainerStyle={{borderBottomWidth: 0, borderRadius:50,padding:10,backgroundColor:"rgba(0,0,0,1)"}}
                placeholder='返信...'
            />
        </View>
    )
}
export default Reply;