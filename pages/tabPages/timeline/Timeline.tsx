import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSharedCounter} from '../../../api/testReduser';
import useGetNote from './useGetNote';
import NoteView from './NoteView';
import {v4 as uuidv4} from 'uuid';

function TimelineScreen({navigation}) {
  const {notelist, reset} = useSharedCounter();
  const {getNote} = useGetNote();
  useEffect(() => {
    console.log('TimelineUseEffect');
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
        <Text>reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          getNote('head');
        }}>
        <Text>getNote</Text>
      </TouchableOpacity>
      <FlatList
        style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}
        data={notelist}
        keyExtractor={item => item.id + '-' + uuidv4()}
        renderItem={({item}) => <NoteView data={item} />}
        onEndReached={() => {
          getNote('tail');
        }}
        ListFooterComponent={() => (
          <View style={{backgroundColor: 'red', height: 100, width: '100%'}}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </View>
  );
}
export default TimelineScreen;
