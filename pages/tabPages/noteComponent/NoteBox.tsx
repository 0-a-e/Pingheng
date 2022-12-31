import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import NoteView from './noteView/NoteView';
import ReactionModal from './reactionModal/ReactionModal';

const NoteBox = ({
  tailUpdate,
  headUpdate,
  notelist,
}: {
  tailUpdate: any;
  headUpdate: any;
  notelist: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNoteId, setModalNoteId] = useState<string>('');

  const switchModalVisible = (noteId?: string) => {
    setModalVisible(!modalVisible);
    noteId && setModalNoteId(noteId);
  };

  const getNoteDataForModal = () => {
    return modalNoteId;
  };

  if (notelist.length !== 0) {
    return (
      <>
        <FlatList
          style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}
          data={notelist}
          keyExtractor={item => item.id + '-' + uuidv4()}
          renderItem={({item}) => (
            <NoteView data={item} switchModalVisible={switchModalVisible} />
          )}
          onEndReached={async () => {
            setIsLoading(true);
            await tailUpdate();
            setIsLoading(false);
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={async () => {
                setIsRefreshing(true);
                await headUpdate();
                setIsRefreshing(false);
              }}
            />
          }
          ListFooterComponent={Footer(isLoading)}
        />
        <ReactionModal
          modalVisible={modalVisible}
          getNoteDataForModal={getNoteDataForModal}
          switchModalVisible={switchModalVisible}
        />
      </>
    );
  } else if (notelist.length === 0 && !isLoading) {
    return <MessageBox text={'ノートはありません'} />;
  } else if (isLoading) {
    return <MessageBox text={'読み込み中...'} />;
  } else {
    return <MessageBox text={'不明なエラーが発生しました'} />;
  }
};

const Footer = (isLoading: boolean) => {
  if (isLoading) {
    return (
      <View style={{backgroundColor: 'red', height: 100, width: '100%'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return <></>;
  }
};

const MessageBox = ({text}: {text: string}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(19,20,26)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{text}</Text>
    </View>
  );
};
export default NoteBox;
