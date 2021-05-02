import StreamWebSocket from '../data/StreamWebSocket';
import NoteListBox from '../components/Notelist/NoteListBox';
import React from 'react';
import { View,Text } from 'react-native';
const Homebox= () => {
  return(
    <View style={{height: "100%",backgroundColor:"red"}}>
    <NoteListBox />
    <StreamWebSocket />
    </View>
    )
}
export default Homebox;