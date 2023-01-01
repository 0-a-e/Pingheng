import React, {useEffect, useState} from 'react';
import {Alert, Text, FlatList, ScrollView, View} from 'react-native';
import {datetimeToJa, dateToJa, roundedDiffDate} from '../../../api/dateCalc';
import {sendAPI} from '../../../api/useApi';
import NoteView from './noteView/NoteView';
import NoteViewForTree from './noteView/NoteViewForTree';

const ExpandableNoteTree = ({noteId}: {noteId: string}) => {
  const [noteData, setNoteData] = useState();
  const [replyData, setreplyData] = useState();
  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    sendAPI([true, 'notes/show', {noteId: noteId}]).then(data => {
      if (data) {
        console.log('fdsg', data);
        setNoteData(data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
    sendAPI([true, 'notes/replies', {noteId: noteId, limit: 30}]).then(data => {
      if (data) {
        //   console.log('udfs', data);
        setreplyData(data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
  };

  return (
    <ScrollView>
      {noteData && (
        <ScrollView
          style={{
            backgroundColor: 'rgb(31, 34, 42)',
            borderRadius: 10,
            //    minHeight: 100,
            overflow: 'hidden',
          }}>
          <NoteView data={noteData} />
          <View style={{backgroundColor: 'rgb(31, 34, 42)'}}>
            <Text style={{color: '#FFF'}}>
              {datetimeToJa(noteData.createdAt)}(
              {roundedDiffDate(noteData.createdAt)})
            </Text>
          </View>
          <Text style={{bottom: 0, position: 'absolute'}}>ツリーを展開</Text>
          <FlatList
            data={replyData}
            renderItem={({item}) => {
              const ifHideTopBar = noteData.userId === item.userId;
              return (
                <View style={{overflow: 'hidden', flexDirection: 'row'}}>
                  {ifHideTopBar ? (
                    <View>
                      <View
                        style={{
                          backgroundColor: 'red',
                          width: 3,
                          height: 10,
                        }}
                      />
                      <View
                        style={{
                          width: '95%',
                          marginLeft: '2.5%',
                          borderRadius: 10,
                        }}>
                        <NoteViewForTree
                          data={item}
                          hideTopBar={ifHideTopBar}
                        />
                      </View>
                    </View>
                  ) : (
                    <NoteViewForTree data={item} hideTopBar={ifHideTopBar} />
                  )}
                </View>
              );
            }}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};
export default ExpandableNoteTree;
