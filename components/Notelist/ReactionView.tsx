import React from 'react';
import { View,Text } from 'react-native';
import ParseEmoji from '../../data/Emojis/ParseEmoji';
import { v4 as uuidv4 } from 'uuid';

const ReactionView= (props) => {
    let num = 0;
    let actionlist = [];
    Object.keys(props.data["reactions"]).forEach(function (key) {
        [...Array(props.data["reactions"][key])].map(() => actionlist.push(key))
    }); 
    //actionlistが全部のリアクション（重複含む）
    if(actionlist.length>3){
        let l3list = [];
        actionlist.forEach(function (key) {
            if(!l3list.includes(key)){
                l3list.push(key);
            }
        });
        if(l3list.length >= 3){
            l3list = l3list.slice(0,3);
        } else {
            l3list = actionlist.slice(0,3);
        }
        //l3listはそれぞれのリアクションが3つ以上あるなら重複除いたやつの先頭3つ　重複で消えて3以下ならactionlistの先頭3つ
        num = actionlist.length - 3;

       return(
            <View style={{flexDirection:"row",borderRadius:50,backgroundColor:"#22ba75",alignItems:"center",justifyContent: 'center',height:25,width:75}}>
                <View style={{position:"relative",height:25,width:45,alignItems:"center",justifyContent: 'center'}}>
                {l3list.map((action,index) => {
                    const zindexv = 10 + index;
                    const Left = index*10;
                    const marginleft = index*2;
                    return(
                        <View style={{position:"absolute",alignItems:"center",justifyContent: 'center',zIndex:zindexv,
                            marginTop:2.5,
                        //elevation:zindexv,
                            width:20,height:20,left:Left,top:0,
                        //   backgroundColor:"grey",
                            marginLeft:marginleft,borderLeftColor:"transparent",borderLeftWidth:2}}
                        key={action + index + uuidv4()}
                        >
                                <ParseEmoji text={action} emojis={props.data["emojis"]} textStyle={{}} ifoneline={true}/>
                        </View>
                    )
                })}
                </View>
                <Text style={{color:"#fff",alignItems:"center",justifyContent: 'center'}}> +{num}</Text>
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
            }}>
                <View style={{position:"relative",height:25,width:5}} />
                {actionlist.map((action,index) => {
                    return(
                        <View style={{
                            position:"relative",
                            alignItems:"center",
                            justifyContent: 'center',
                            height:20,
                        }}
                        key={action + index + uuidv4()}
                        >
                                <ParseEmoji text={action} emojis={props.data["emojis"]} textStyle={{}} ifoneline={true} />
                        </View>
                    )
                })}
                <View style={{position:"relative",height:25,width:5}} />
            </View>
        );
    } else if(actionlist.length == 0){
        //リアクションなし
        return(<></>);
    } else {
        return(<></>);
    }
};
export default ReactionView;