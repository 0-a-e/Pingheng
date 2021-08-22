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
    //リアクションが3個以上のときはactionlistを3個までにしてリアクション数から3引く
    //console.log(actionlist.length);
    if(actionlist.length>3){
        actionlist = actionlist.slice(0,3);
        num = num - 3;
    //    console.log(actionlist);
       return(
            <View style={{flexDirection:"row",borderRadius:50,backgroundColor:"#22ba75",alignItems:"center",justifyContent: 'center',height:25,width:70}}>
                <View style={{position:"relative",height:25,width:45,alignItems:"center",justifyContent: 'center'}}>
                {actionlist.map((action,index) => {
                    const zindexv = 10 + index;
                    const Left = index*10;
                    const marginleft = index*2;
                    return(
                        <View style={{position:"absolute",alignItems:"center",justifyContent: 'center',zIndex:zindexv,
                        marginTop:2.5,
                        //elevation:zindexv,
                        width:20,height:20,left:Left,top:0,
                     //   backgroundColor:"grey",
                        marginLeft:marginleft,borderLeftColor:"transparent",borderLeftWidth:2}}>
                                <ParseEmoji text={action} emojis={props.data["emojis"]} textStyle={{}}/>
                        </View>
                    )
                })}
                </View>
                <Text style={{color:"#fff",alignItems:"center",justifyContent: 'center',}}> +{num}</Text>
            </View>
            );
    } else if(actionlist.length < 4 && actionlist.length !== 0) {
        return(
            <View style={{
                flexDirection:"row",
            borderRadius:50,
            backgroundColor:"#22ba75",
            alignItems:"center",
            justifyContent: 'center',
            height:25,
         //   width:70
            }}>
                <View style={{position:"relative",height:25,width:5}} />
                {actionlist.map((action,index) => {
                    const Left = index*20;
                    return(
                        <View style={{
                        position:"relative",
                        alignItems:"center",
                        justifyContent: 'center',
                        height:20,
                        }}>
                                <ParseEmoji text={action} emojis={props.data["emojis"]} textStyle={{}}/>
                        </View>
                    )
                })}
                <View style={{position:"relative",height:25,width:5}} />
            </View>
        );
    } else if(actionlist.length == 0){
        //リアクションなし
        return(<></>);
    }
};
//<StreamWebSocket />
export default ReactionView;