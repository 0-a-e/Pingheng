import React from "react";
import { TouchableOpacity, View,Text } from "react-native";
import { Button} from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import ParseEmoji, { twemojied } from "../../../data/Emojis/ParseEmoji";
const Top = (props) => {
    return(
        <View style={{
     //   flex:1,
        flexDirection: 'row',
        width:"100%",
        height:130,
        alignItems:'center',
        justifyContent:'center',
     //   flexWrap: "nowrap",
          }}>
            <TouchableOpacity
            style={{width:'45%',borderBottomStartRadius:20,borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0,backgroundColor:"rgb(10,10,18)",height:120,
            borderRightWidth:0.5,borderColor:"#202020",alignItems: 'center',
            justifyContent: 'center',}}
            onPress={() => props.addreaction(":❤️:")}
            >
                <SvgUri
                    key={"fav"}
                    height={40}
                    width={40}
                    source={{uri: "https://twemoji.maxcdn.com/v/latest/svg/2764.svg"}}
                />
            </TouchableOpacity>
            <TouchableOpacity
            style={{width:'45%', borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
            borderTopStartRadius:0,backgroundColor:"rgb(10,10,18)",height:120,borderLeftWidth:0.5,borderColor:"#202020",
            alignItems: 'center',
            justifyContent: 'center',}}
            onPress={() => props.addreaction(":👍:")}
            >
                <SvgUri
                    key={"fav"}
                    height={40}
                    width={40}
                    source={{uri: "https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg"}}
                />
            </TouchableOpacity>

        </View>
    )
}
export default Top;