import StreamWebSocket from '../data/StreamWebSocket';
import NoteListBox from './Notelist/NoteListBox';
import React, { useState } from 'react';
import { View,Text } from 'react-native';
import WSobj from '../Variable/WSobj';


const Homebox= () => {
  const [ws,wswrite] = useState("");
  return(
    <WSobj.Provider value ={{ ws,wswrite }}>
    <View style={{height: "100%"}}>
    <StreamWebSocket />
    <NoteListBox />
    </View>
    </WSobj.Provider>
    )
}
export default Homebox;