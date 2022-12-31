import React, {useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import noteStyles from './noteStyles';
import allocation from './allocation';
import {useNavigation} from '@react-navigation/native';
import {roundedDiffDate} from '../../../../api/dateCalc';
import Visibility from './Visibility';
import ReactionView from './reaction/ReactionView';
import EmojiText from '../../../../component/EmojiText';
import MediaView from '@0-a-e/react-native-media-viewing';
import Icon from 'react-native-vector-icons/Feather';

const NoteView = ({
  data,
  switchModalVisible,
}: {
  data: any;
  switchModalVisible?: any;
}) => {
  const [imgVisible, setimgVisible] = useState(false);
  const {name, avatarUrl, ifNoName} = allocation(data);
  const navigation = useNavigation();
  let images;
  if (data.files.length) {
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
                  <Text style={{color: '#fff'}}>
                    {roundedDiffDate(data.createdAt)}
                  </Text>
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
              {data.files.map((item: fileTypes, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    console.log(item);
                    item.type.startsWith('image')
                      ? setimgVisible(true)
                      : Alert.alert(
                          'ファイルのダウンロードはまだ実装されていません',
                        );
                  }}
                  style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    margin: 2,
                    width: 100,
                    height: 100,
                  }}>
                  {item.type.startsWith('image') ? (
                    <Image
                      source={{uri: item.thumbnailUrl}}
                      style={{width: 100, height: 100}}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: 'rgb(19,20,26)',
                        width: 100,
                        height: 100,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name={'file'}
                        size={40}
                        color={'#FFF'}
                        style={{opacity: 0.7}}
                      />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'middle'}
                        style={{
                          color: '#FFF',
                          position: 'absolute',
                          bottom: 4,
                          opacity: 0.7,
                          marginLeft: '5%',
                          marginRight: '5%',
                          width: '90%',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  )}
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
