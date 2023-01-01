import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './noteStyles';
import ReactionView from './reaction/ReactionView';
import FilesList from './FilesList';
import TopBar from './TopBar';
import {sendAPI} from '../../../../api/useApi';

const NoteViewForTree = ({
  data,
  switchModalVisible,
  hideTopBar,
}: {
  data: any;
  switchModalVisible?: any;
}) => {
  const [replyData, setreplyData] = useState();
  useEffect(() => {
    if (data.repliesCount !== 0) {
      sendAPI([true, 'notes/replies', {noteId: data.id, limit: 30}]).then(
        data => {
          if (data) {
            //   console.log('udfs', data);
            setreplyData(data);
          } else {
            Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
              cancelable: true,
            });
          }
        },
      );
    }
  }, []);

  const [imgVisible, setimgVisible] = useState(false);
  let images;
  if (data.files !== undefined && data.files.length) {
    images = getImgUrlList(data.files);
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          switchModalVisible(data.id);
        }}
        onLongPress={() => {
          //自分のノートの場合削除できるようにする
          console.log(data.files);
        }}>
        <View style={noteStyles.card}>
          {!hideTopBar && <TopBar data={data} />}
          <View style={noteStyles.normalcontainer}>
            <Text style={noteStyles.notetext} ellipsizeMode="middle">
              {data.text}
            </Text>
            {data.files !== undefined && (
              <FilesList files={data.files} setimgVisible={setimgVisible} />
            )}
          </View>
          {data.reactions !== undefined && (
            <ReactionView
              emojis={data.emojis}
              reactions={data.reactions}
              noteId={data.id}
            />
          )}
          <FlatList
            data={replyData}
            renderItem={note => {
              return <NoteViewForTree data={note.item} />;
            }}
          />
        </View>
        {/*      <MediaView
        mediaSource={images}
        mediaIndex={0}
        visible={imgVisible}
        onRequestClose={() => setimgVisible(false)}
        errorMessage={'エラーが発生しました'}
        unknownErrorMessage={'不明なエラーが発生しました'}
        unsupportedFiletypeMessage={'不明なファイル形式です'}
        noFileMessage={'表示可能なメディアがありません。'}
      />*/}
      </TouchableOpacity>
    </>
  );
};

const getImgUrlList = (files: fileTypes[]) => {
  let list: {uri: string}[] = [];
  files.forEach((item: fileTypes) => {
    item.type.startsWith('image') && list.push({uri: item.url});
  });
  return list;
};

export default NoteViewForTree;
