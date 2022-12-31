import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {sendAPI} from '../../../api/useApi';
import NoteView from './noteView/NoteView';
const ExpandableNoteTree = ({noteId}: {noteId: string}) => {
  const [noteData, setNoteData] = useState();
  useEffect(() => {
    console.log(noteId);
   // getNote(noteId);
  }, []);
  const getNote = (noteId: string) => {
    sendAPI([true, 'notes/show', {noteId: noteId}]).then(data => {
      if (data) {
        setNoteData(data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
  };
  return (
    <View
      style={{
        backgroundColor: 'red',
        borderRadius: 10,
        //    minHeight: 100,
        overflow: 'hidden',
      }}>
      {
        //noteData && <NoteView data={noteData} />
      }
      <Text style={{bottom: 0, position: 'absolute'}}>ツリーを展開</Text>
    </View>
  );
};
export default ExpandableNoteTree;
