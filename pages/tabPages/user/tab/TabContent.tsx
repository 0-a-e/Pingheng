import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import useGetUserNote from '../useGetUserNote';
import NoteView from '../../timeline/NoteView';
import {v4 as uuidv4} from 'uuid';
import useListEditFunc from '../../../../api/useListEditFunc';

const TabContent = ({userId, mode}: {userId: string; mode: string}) => {
  const [notelist, setNotelist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    firstUpdate();
  }, []);
  let config = {
    ifWithFiles: false,
    ifAllNote: false,
    userId: userId,
    point: 'notes',
  };
  if (mode === 'note') {
    config.ifWithFiles = false;
    config.ifAllNote = false;
  } else if (mode === 'allnote') {
    config.ifWithFiles = false;
    config.ifAllNote = true;
  } else if (mode === 'media') {
    config.ifWithFiles = true;
    config.ifAllNote = false;
  } else if (mode === 'reaction') {
    config.point = 'reactions';
    config.ifAllNote = true;
  }

  const {getUserNote} = useGetUserNote(config);
  const {getHeadTailId, getNewlist} = useListEditFunc();
  const firstUpdate = async () => {
    setIsLoading(true);
    const r = await getUserNote('', '');
    setNotelist(r);
    setIsLoading(false);
  };

  const tailUpdate = async () => {
    const placeId = getHeadTailId(notelist, 'tail');
    const addlist = await getUserNote('', placeId);
    const newlist = getNewlist(notelist, addlist, 'tail');
    setNotelist(newlist);
  };

  const headUpdate = async () => {
    setIsLoading(true);
    const newPlaceId = getHeadTailId(notelist, 'head');
    console.log('placeid: ' + newPlaceId);
    const addlist = await getUserNote(newPlaceId, '');
    const oldPlaceId = getHeadTailId(addlist, 'head');
    if (oldPlaceId !== newPlaceId) {
      const newlist = getNewlist(notelist, addlist, 'head');
      setNotelist(newlist);
    }
    setIsLoading(false);
  };

  if (notelist.length !== 0 && !isLoading) {
    return (
      <View style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}>
        <FlatList
          data={notelist}
          keyExtractor={item => item.id + '-' + uuidv4()}
          renderItem={({item}) => <NoteView data={item} />}
          onEndReached={() => {
            tailUpdate();
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                headUpdate();
              }}
            />
          }
          ListFooterComponent={() => (
            <View style={{backgroundColor: 'red', height: 100, width: '100%'}}>
              <ActivityIndicator size="large" />
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(19,20,26)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>ノートはありません</Text>
      </View>
    );
  }
};

export default TabContent;
