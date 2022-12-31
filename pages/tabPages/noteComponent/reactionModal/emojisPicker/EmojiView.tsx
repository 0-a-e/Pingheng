import React from 'react';
import {Alert, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {emojisManage} from '../../../../../api/realm/realmManage';
import {emojiType} from '../../../../../types/EmojiTypes';

const manageFavEmoji = async (item: emojiType) => {
  const {addAttribute, removeAttribute, checkIsEmojiFavorited} =
    emojisManage();
  const emojiStatus = await checkIsEmojiFavorited(item);
  console.log(item);
  Alert.alert(
    emojiStatus ? 'お気に入りに追加しますか？' : 'お気に入りから削除しますか？',
    emojiStatus
      ? '[お気に入りと最近]タブにこの絵文字が登録されます。'
      : '[お気に入りと最近]タブからこの絵文字が削除されます。',
    [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      emojiStatus
        ? {text: '追加する', onPress: () => addAttribute(item, 'favorite')}
        : {text: '削除する', onPress: () => removeAttribute(item, 'favorite')},
    ],
  );
};

const addReaction = (item: emojiType) => {
  const {addAttribute} = emojisManage();
  addAttribute(item, 'history');
};

const EmojiView = ({item}: {item: emojiType}) => {
  return (
    <TouchableOpacity
      style={{
        width: 55,
        height: 55,
        borderRadius: 15,
        marginLeft: 2.5,
        marginBottom: 2.5,
        marginTop: 2.5,
        marginRight: 2.5,
        backgroundColor: 'red',
        overflow: 'hidden',
      }}
      onLongPress={() => {
        manageFavEmoji(item);
      }}
      onPress={() => {
        //    props.addreaction(':' + item.name + ':');
        addReaction(item);
      }}>
      {item.isFavorited && (
        <Icon
          name={'heart'}
          size={13}
          color={'#fff'}
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
            marginTop: 3,
            marginRight: 3,
          }}
        />
      )}
      <Image
        key={item.name}
        source={{uri: item.url}}
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </TouchableOpacity>
  );
};

export default EmojiView;
