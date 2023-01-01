import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {emojisType} from '../../../../../types/EmojiTypes';
import EmojiView from './EmojiView';
import {emojisManage} from '../../../../../api/realm/realmManage';
import Icon from 'react-native-vector-icons/Feather';
import {useAddReaction} from './useAddReaction';

const FavAndHistoryEmojisPicker = ({noteId}: {noteId: string}) => {
  const [emojiList, setEmojiList] = useState([]);
  const {addReaction} = useAddReaction(noteId);

  const getFunc = async () => {
    const {getFavEmojis, getLatest50Emojis} = emojisManage();
    const latest50Emojis = await getLatest50Emojis();
    const favEmojis = await getFavEmojis();
    setEmojiList([...favEmojis, ...latest50Emojis]);
  };
  useEffect(() => {
    getFunc();
  }, []);
  const [waru60, setWaru60] = useState(0);

  const calcbox = () => {
    //メモ　消さない
    // widthはディスプレイ幅の90%(枠内)
    //waru60はwidthを60(55 + 両サイド2.5x2の5を足してる)pxで割っていくつ横に並べるか計算したやつを小数点切り捨て(四捨五入ではなく切り捨て）
    //sidepaddingwidthはwidthから絵文字の幅(waru60 * 60)を引いて割る2で両サイドのpadding
    const width = (Dimensions.get('window').width / 10) * 9;
    const _waru60 = Math.floor(width / 60);
    const sidepaddingwidth = (width - waru60 * 60) / 2;
    return {_waru60, sidepaddingwidth};
  };
  useEffect(() => {
    const {_waru60, sidepaddingwidth} = calcbox();
    setWaru60(_waru60);
  }, []);
  if (emojiList.length !== 0) {
    return (
      <FlatList
        style={{
          backgroundColor: '',
          // marginLeft: sidepaddingwidthuse,
          //     marginRight: sidepaddingwidthuse,
          height: 240,
        }}
        data={emojiList}
        numColumns={5}
        key={waru60}
        renderItem={({item}) => (
          <EmojiView item={item} addReaction={addReaction} />
        )}
        maxToRenderPerBatch={7}
        //    keyExtractor={keyExtractor}
        //    getItemLayout={getItemLayout}
      />
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.7,
        }}>
        <Icon name={'coffee'} size={90} color={'#FFF'} />

        <Text style={{color: '#fff', width: '80%', marginTop: 20}}>
          ここには最近使用した絵文字とお気に入りに追加した絵文字が表示されます。
          {'\n'}
          追加したい絵文字を長押しして追加してください。
        </Text>
      </View>
    );
  }
};

export default FavAndHistoryEmojisPicker;
