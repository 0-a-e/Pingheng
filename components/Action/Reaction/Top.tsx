import React from "react";
import { TouchableOpacity, View} from "react-native";
import Image from 'react-native-remote-svg';

const Top = (props) => {
    return(
        <View style={{
        flexDirection: 'row',
        width:"100%",
        height:130,
        alignItems:'center',
        justifyContent:'center'
          }}>
            <TouchableOpacity
            style={{width:'45%',borderBottomStartRadius:20,borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0,backgroundColor:"rgb(10,10,18)",height:120,
            borderRightWidth:0.5,borderColor:"#202020",alignItems: 'center',
            justifyContent: 'center',}}
            onPress={() => props.addreaction(":❤️:")}
            >
                <Image
                    key={"fav"}
                    style={{width:40,height:40}}
                    source={require("../../../public/svg/heart.svg")}
                />
            </TouchableOpacity>
            <TouchableOpacity
            style={{width:'45%', borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
            borderTopStartRadius:0,backgroundColor:"rgb(10,10,18)",height:120,borderLeftWidth:0.5,borderColor:"#202020",
            alignItems: 'center',
            justifyContent: 'center',}}
            onPress={() => props.addreaction(":👍:")}
            >
                <Image
                    key={"fav"}
                    style={{width:40,height:40}}
                    source={require("../../../public/svg/like.svg")}
                />
            </TouchableOpacity>

        </View>
    )
}
export default Top;