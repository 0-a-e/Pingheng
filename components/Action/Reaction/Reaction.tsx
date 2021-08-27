import React, { useContext } from "react";
import { ToastAndroid, View } from "react-native";
import Top from "./Top";
import { sendAPI } from '../../../data/useAPI';
import Mtokenvar from '../../../Variable/Mtoken';
import Picker from './Picker';
const Reaction = (props) => {
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
    const addreaction = async (reactionname) => {
        props.closesheet();
        const rtn = await sendAPI([Mtoken,"notes/reactions/create",{"noteId": props.noteid,"reaction": reactionname}]);
            if(!rtn === true){
                ToastAndroid.show("エラーが発生しました。もう一度お試しください。",200);
            }
    }
    return(
        <View>
            <Top addreaction={(i) => {addreaction(i);}}/>
            <Picker addreaction={(i) => {addreaction(i);}}/>
        </View>
    )
}
export default Reaction;