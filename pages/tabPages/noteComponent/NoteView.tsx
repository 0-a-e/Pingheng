import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './noteStyles';
import allocation from './allocation';
import {useNavigation} from '@react-navigation/native';
import {roundedDiffDate} from '../../../api/dateCalc';
import Visibility from './Visibility';
import ReactionView from './reaction/ReactionView';
import EmojiText from '../../../component/EmojiText';
import MediaView from '@0-a-e/react-native-media-viewing';

const NoteView = props => {
  const [imgVisible, setimgVisible] = useState(false);
  const {name, avatarUrl, ifNoName} = allocation(props);
  const data = props.data;
  const navigation = useNavigation();
  let images;
  if (data.files.length) {
    images = getImgUrlList(data.files);
  }
  return (
    <TouchableOpacity
      onLongPress={() => {
        alert('long tap');
        console.log(data.files);
      }}>
      <View style={noteStyles.card}>
        <View style={noteStyles.incardcontainer}>
          <View style={noteStyles.topcontainer}>
            <View style={noteStyles.intopcontainer}>
              <TouchableOpacity
                style={noteStyles.leftbox}
                onPress={() => {
                  navigation.navigate('User', data.user.id);
                }}>
                <Image
                  source={{
                    uri: avatarUrl,
                  }}
                  accessible={true}
                  style={noteStyles.avatar}
                  accessibilityLabel={name}
                />
                <View style={noteStyles.namebox}>
                  {/*     <Text style={{color: '#fff'}} numberOfLines={1}>
                      {name}
                    </Text>*/}
                  <EmojiText
                    numberOfLines={1}
                    emojis={data.user.emojis}
                    style={{color: '#fff'}}>
                    {name}
                  </EmojiText>
                </View>
                {!ifNoName && (
                  <>
                    <View style={noteStyles.nameSeparator} />
                    <Text style={{color: '#fff'}} numberOfLines={1}>
                      {'@' + data.user.username}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <View style={noteStyles.middlebox} />
              <View style={noteStyles.rightbox}>
                <Text>{roundedDiffDate(data.createdAt)}</Text>
                <Visibility
                  visibility={data.visibility}
                  localOnly={data.localOnly}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={noteStyles.normalcontainer}>
          <Text style={noteStyles.notetext} ellipsizeMode="middle">
            {data.text}
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.files.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setimgVisible(true);
                }}
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  margin: 2,
                }}>
                <Image
                  source={{uri: item.thumbnailUrl}}
                  style={{width: 100, height: 100}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ReactionView
          emojis={data.emojis}
          reactions={data.reactions}
          noteId={data.id}
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
  );
};

const getImgUrlList = files => {
  let list = [];
  files.forEach(item => {
    list.push({uri: item.url});
  });
  return list;
};
export default NoteView;
