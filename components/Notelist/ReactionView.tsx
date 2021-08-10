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
    //console.log(actionlist.length);
    if(actionlist.length>3){
        actionlist = actionlist.slice(0,3);
        num = num - 3;
    //    console.log(actionlist);
       return(
            <View style={{flexDirection:"row",borderRadius:50,backgroundColor:"red",alignItems:"center",justifyContent: 'center',height:25,width:75}}>
                <View style={{backgroundColor:"pink",alignItems:"center",justifyContent: 'center',height:25,width:50}}>
                {actionlist.map((action,index) => {
                    const zindexv = 10 + index;
                    const Left = index*10;
                    const marginleft = index*2;
                    return(
                        <View style={{position:"absolute",alignItems:"center",justifyContent: 'center',zIndex:zindexv,elevation:zindexv,width:20,height:20,left:Left,top:0,backgroundColor:"grey",marginLeft:marginleft,borderLeftColor:"green",borderLeftWidth:2}}>
                            <Text style={{width:20,height:25,alignItems:"center",justifyContent: 'center',top:0}}>
                                <ParseEmoji text={action} emojis={props.data["emojis"]} />
                            </Text>
                        </View>
                    )
                })}
                </View>
                <Text style={{color:"#fff",alignItems:"center",justifyContent: 'center',}}> +{num}</Text>
            </View>
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