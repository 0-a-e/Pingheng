import React from 'react';
import { View,Text } from 'react-native';
import ParseEmoji from '../../data/Emojis/ParseEmoji';


const ReactionView= (props) => {
    let num = 0;
    let actionlist = [];
    Object.keys(props.data["reactions"]).forEach(function (key) {
        num = num+parseInt(props.data["reactions"][key]);
        if(!actionlist.includes(key)){
        actionlist.push(key);
        } else {
            console.log("already added");
        }
    });
    
    // numはリアクション数,actionlistは重複するのは消したやつ　eは重複で消えたやつの数 いやこれ使わなくない？
    //const e = num - actionlist.length;

    //リアクションが3個以上のときはactionlistを3個までにしてリアクション数から3引く
    console.log(actionlist.length);
    if(actionlist.length>3){
        actionlist = actionlist.slice(0,3);
        num = num - 3;
        console.log(actionlist);
       return(
            <Text numberOfLines={1} style={{borderRadius:50,backgroundColor:"red",alignItems:"center",height:30,width:50}}>
                {actionlist.map((action,index) => {
                    const zindex = 10 + index;
                    console.log(zindex);
                    return(
                        <View style={{backgroundColor:"rgba(255,255,255,0.5)",position:"absolute",zIndex:zindex,width:20,height:20}}>
                            <Text>
                                <ParseEmoji text={action} emojis={props.data["emojis"]} />
                            </Text>
                        </View>
                    )
                })}
                +{num}
            </Text>
            );
    } else if(actionlist.length > 0){
        //リアクションなし
        return(<></>);
      } else {
        return(<ParseEmoji text={actionlist} emojis={props.data["emojis"]}/>);
      }
      
    }
//<StreamWebSocket />
export default ReactionView;