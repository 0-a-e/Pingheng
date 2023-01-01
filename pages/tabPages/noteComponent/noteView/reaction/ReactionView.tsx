import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';
import {sendAPI} from '../../../../../api/useApi';
import {getUser} from '../../../../../api/tokenManage';
import EmojiText from '../../../../../component/EmojiText';
import editReaction from '../../../../../api/editReaction';

const ReactionView = ({
  reactions,
  noteId,
  emojis,
}: {
  reactions: object;
  noteId: string;
  emojis: any;
}) => {
  const ReactionButton = ({item}) => {
    const [isPressed, setisPressed] = useState(false);
    const [reactionCount, setReactionCount] = useState(item.count);
    const [isLocalEmoji, setIsLocalEmoji] = useState(true);
    useEffect(() => {
      if (item.key.includes('@') && !item.key.includes('@.')) {
        setIsLocalEmoji(false);
      }
    }, []);
    return (
      <TouchableOpacity
        disabled={true}
        onPress={async () => {
          const r = await toggleReaction(item.key, noteId);
          if (r && r === 'create') {
            setisPressed(true);
            setReactionCount(reactionCount + 1);
          } else if (r && r === 'delete') {
            setisPressed(false);
            setReactionCount(reactionCount - 1);
          }
        }}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 50,
          marginRight: 3,
          marginLeft: 3,
          backgroundColor: `${
            isLocalEmoji ? 'green' : isLocalEmoji && isPressed ? 'blue' : 'red'
          }`,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <>
          <EmojiText emojis={emojis}>{item.key}</EmojiText>
          <Text>{reactionCount}</Text>
        </>
      </TouchableOpacity>
    );
  };

  const arr = Object.keys(reactions).map(key => {
    return {key: key, count: reactions[key]};
  });
  return (
    <View style={{width: '98%', height: 25}}>
      <FlatList
        horizontal
        data={arr}
        keyExtractor={item => item.key + uuidv4()}
        renderItem={({item}) => <ReactionButton item={item} />}
      />
    </View>
  );
};

const toggleReaction = async (reaction: string, noteId: string) => {
  const user = await getUser();
  const data = await sendAPI([true, 'notes/reactions', {noteId: noteId}]);
  if (data) {
    let already: boolean = false;
    data.forEach((item: any) => {
      if (item.user.id === user.username) {
        already = true;
      }
    });
    if (already) {
      editReaction(reaction, noteId, 'delete');
      return 'delete';
    } else {
      editReaction(reaction, noteId, 'create');
      return 'create';
    }
  } else {
    Alert.alert('取得エラー', 'n', [], {
      cancelable: true,
    });
    return false;
  }
};

export default ReactionView;
