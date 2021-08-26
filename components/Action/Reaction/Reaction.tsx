import React, { useContext } from "react";
import { View } from "react-native";
import Top from "./Top";
import { sendAPI } from '../../../data/useAPI';
import Mtokenvar from '../../../Variable/Mtoken';
import Picker from './Picker';
const Reaction = (props) => {
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
    const addreaction = (reactionname) => {
        props.closesheet();
        sendAPI([Mtoken,"notes/reactions/create",
        {
            "noteId": props.noteid,
            "reaction": reactionname
        }
        ]);
    }
    return(
        <View>
            <Top addreaction={(i) => {addreaction(i);}}/>
            <Picker addreaction={(i) => {addreaction(i);}}/>
        </View>
    )
}
export default Reaction;