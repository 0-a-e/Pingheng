import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useGetNote from './useGetNote';
import {WSComponent} from './useWebsocket';
import {useSharedCounter} from '../../../api/testReduser';
import NoteBox from '../noteComponent/NoteBox';

function TimelineScreen({navigation}) {
  const {headUpdate, tailUpdate} = useGetNote();
  const {notelist, reset} = useSharedCounter();
  useEffect(() => {
    headUpdate();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 30,
        }}
        onPress={() => {
          reset();
        }}>
        <Text style={{color: 'red'}}>reset</Text>
      </TouchableOpacity>
      <NoteBox
        notelist={notelist}
        tailUpdate={() => {
          tailUpdate();
        }}
        headUpdate={() => {
          headUpdate();
        }}
      />
    </View>
  );
}
//  <WSComponent />
export default TimelineScreen;
