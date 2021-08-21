import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Image from 'react-native-remote-svg';
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",backgroundColor:"green"}}>
       <Text>お</Text>
        <Image key="ddj2" style={{width:20,height:20}} source={{uri: "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG"}} />
        <Text>ae</Text>
        <Image key="ddjr2" style={{width:20,height:20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Solid_blue.svg"}} />
      </View>

      <Text style={{backgroundColor:"green",lineHeight:20
      ,paddingBottom:3,marginTop:30}}>
        お <Image key="ddj" style={{width:20,height:20}} source={{uri: "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG"}} />
        ae <Image key="ddjr" style={{width:20,height:20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Solid_blue.svg"}} />
        </Text>

        <View style = {{backgroundColor:"black",width:"100%",height:100,padding:30,flexDirection:"row"}} >
          <Text style={{backgroundColor:"green",
          lineHeight:20,
          //height:20,
          paddingBottom:3,
          width:"45%"
          }}>
            お <Image key="ddj2" style={{width:20,height:20}} source={{uri: "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG"}} />
            ae <Text style={{height:20}}><Image key="ddjr2" style={{width:20,height:20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Solid_blue.svg"}} /></Text>
          </Text>

          <Text style={{backgroundColor:"green",height:20,width:"45%",marginLeft:3}}>
            お <Image key="ddj2" style={{width:20,height:20}} source={{uri: "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG"}} />
            ae <Image key="ddjr2" style={{width:20,height:20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Solid_blue.svg"}} />
          </Text>
        </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#fff',
    alignItems: 'center',
    height:500,
    backgroundColor:"#f0f0f0",
    justifyContent: 'center',
  },
});
