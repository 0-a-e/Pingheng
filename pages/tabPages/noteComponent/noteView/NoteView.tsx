import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './noteStyles';
import ReactionView from './reaction/ReactionView';
import FilesList from './FilesList';
import TopBar from './TopBar';

const NoteView = ({
  data,
  switchModalVisible,
}: {
  data: any;
  switchModalVisible?: any;
}) => {
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
          <TopBar data={data} />
          <View style={noteStyles.container}>
            <Text style={noteStyles.notetext} ellipsizeMode="middle">
              {data.text}
            </Text>
            {data.files !== undefined && (
              <FilesList files={data.files} setimgVisible={setimgVisible} />
            )}
            {data.reactions !== undefined && (
              <ReactionView
                emojis={data.emojis}
                reactions={data.reactions}
                noteId={data.id}
              />
            )}
          </View>
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

export default NoteView;
