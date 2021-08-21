import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Image from 'react-native-remote-svg';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{backgroundColor:"green",lineHeight:20
      ,paddingBottom:3}}>
        お <Image key="ddj" style={{width:20,height:20}} source={{uri: "https://www.kawaiifabric.com/images/product_images/large_img/solid-red-fabric-Robert-Kaufman-USA-Red-179485-1.JPG"}} />
        ae <Image key="ddj" style={{width:20,height:20}} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Solid_blue.svg"}} />
        </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
