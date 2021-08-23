import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Text, View,ScrollView, Dimensions, TouchableOpacity,FlatList } from 'react-native';

import {
  ScrollIntoView, // enhanced View container
  wrapScrollView, // simple wrapper, no config
 // wrapScrollViewConfigured, // complex wrapper, takes a config
  useScrollIntoView, // access hook for imperative usage
} from 'react-native-scroll-into-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { wrapScrollViewConfigured } from '../../src';
import { wrapScrollViewConfigured } from 'react-native-scroll-into-view';


export default function App() {
  //const Sections = [...new Array(300).keys()];
  const Sections = [{name:"a"},{name:"b"},{name:"c"},{name:"d"},{name:"e"},
{name:"f"},{name:"g"},{name:"h"},{name:"i"},{name:"j"},{name:"k"},{name:"l"},{name:"m"},{name:"n"},{name:"o"},{name:"p"},{name:"q"},{name:"r"},
  {name:"s"},{name:"t"},{name:"u"},{name:"v"},{name:"w"},{name:"z"}];

  //const CustomScrollView = wrapScrollView(ScrollView);
  /*
  const ScrollIntoViewScrollView = wrapScrollViewConfigured({
    refPropName: 'innerRef',
  })(KeyboardAwareScrollView);
  */

const SectionsScreen = () => {
  let myRef = useRef();

  const renderSectionButton = (d: any,index: number) => {
    const scrollSectionIntoView = (index: number) => {
      // console.log(myRef.current);
       //console.log(index);
       //sectionsRefs[section].current!.scrollIntoView({ align: 'top' });
       
     };
     return (
      <TouchableOpacity
        key={index}
        onPress={() => myRef.current.scrollToIndex({animated:true,index:index})}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'darkgrey',
            borderRadius: 20,
          }}
        >
          <Text>{index}</Text>
        </View>
      </TouchableOpacity>
  )};


  const renderSection = (d) => {
  //  console.log(d.index);
  //  console.log(d.item.name);
    return (
    <View
      style={{
        width: '100%',
        padding: 10,
        borderWidth: 0,
        height:Dimensions.get('window').height,
        borderColor: 'black',
        backgroundColor: '#dddddd',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderBottomWidth: 2,
          borderColor: 'black',
        }}
      >
        dddpwjmep {d.index}
      </Text>
      <Text style={{ fontSize: 14, marginTop: 20 }}>
        {(d.index + 1) * 100000000000000000000}
      </Text>
    </View>
  )};

  const Btnlist = () => (
    <View  style={{width:55,height: '100%'}}>
    <ScrollView style={{paddingTop:15}}>
          {Sections.map(renderSectionButton)}
    </ScrollView>
    </View>
  );

    return (
      <View style={{flex: 1, width: '100%', flexDirection: 'row'}}>
        <Btnlist />
        <FlatList
          data={Sections}
          renderItem={renderSection}
          ref={myRef}
          initialScrollIndex={0}
          keyExtractor={item => item.name}
        />
      </View>
    );
}
  
  
  return (
    <>
    <StatusBar style="auto"/>
    <SectionsScreen />
    </>
  );
}