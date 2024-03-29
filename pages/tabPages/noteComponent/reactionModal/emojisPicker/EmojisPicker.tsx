import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {emojisType} from '../../../../../types/EmojiTypes';
import EmojiView from './EmojiView';
import editReaction from '../../../../../api/editReaction';
import {v4 as uuidv4} from 'uuid';
import { useAddReaction } from './useAddReaction';

const EmojisPicker = ({
  emojis,
  routeKey,
  noteId,
}: {
  emojis: emojisType;
  routeKey: string;
  noteId: string;
}) => {
  const [waru60, setWaru60] = useState(0);
  const hitEmojis = emojis.get(routeKey);
  const {addReaction} = useAddReaction(noteId);
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


  return (
    <FlatList
      style={{
        backgroundColor: '',
        // marginLeft: sidepaddingwidthuse,
        //     marginRight: sidepaddingwidthuse,
        height: 240,
      }}
      data={hitEmojis}
      numColumns={5}
      renderItem={({item}) => (
        <EmojiView item={item} addReaction={addReaction} />
      )}
      maxToRenderPerBatch={7}
      keyExtractor={emoji => emoji.id + uuidv4()}
      //    getItemLayout={getItemLayout}
    />
  );
};

export default EmojisPicker;
