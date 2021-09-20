import StreamWebSocket from '../data/StreamWebSocket';
import NoteListBox from './Notelist/NoteListBox';
import React from 'react';
import { View,Text } from 'react-native';



const Homebox= () => {
  return(
    <View style={{height: "100%"}}>
    <StreamWebSocket />
    <NoteListBox />
    </View>
    )
}
export default Homebox;