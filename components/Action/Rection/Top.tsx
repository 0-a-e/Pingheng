import React from "react";
import { View,Text, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";

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
            <Button title="❤"
            buttonStyle={{backgroundColor:"rgb(10,10,18)",height:120,borderBottomStartRadius:20,borderColor:"#202020",borderRightWidth:0.5,borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0}}
            style={{ borderBottomStartRadius:20,borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0}}
            titleStyle={{fontSize:35}}
            containerStyle={[{ width: '45%',height:120,borderBottomStartRadius:20,
        borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0 }]}
        />
            <Button title="👍"
            buttonStyle={{backgroundColor:"rgb(10,10,18)",height:120,borderLeftWidth:0.5,borderColor:"#202020",borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
            borderTopStartRadius:0}}
            style={{ borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
                borderTopStartRadius:0 }}
            titleStyle={{fontSize:35}}
            containerStyle={[{ borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
                borderTopStartRadius:0,width:"45%",height:120 }]}
            />
        </View>
    )
}
export default Top;