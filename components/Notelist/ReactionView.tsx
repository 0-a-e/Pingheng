import React from 'react';
import { View,Text } from 'react-native';
import ParseEmoji from '../../data/Emojis/ParseEmoji';


const ReactionView= (props) => {
    let num = 0;
    let actionlist = [];
    Object.keys(props.data["reactions"]).forEach(function (key) {
        num = num+parseInt(props.data["reactions"][key]);
        actionlist.push(key);
      });
    
    if(actionlist.length>0){
        //console.log(num);
        //console.log(actionlist);
        return(
            <></>
               // <ParseEmoji text={actionlist} emojis={props.data["emojis"]}/>
           )
    } else {
        return(<></>)
    }
}
//<StreamWebSocket />
export default ReactionView;