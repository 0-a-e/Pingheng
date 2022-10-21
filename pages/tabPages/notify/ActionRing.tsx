import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import EmojiText from '../../../component/EmojiText';
//import ParseEmoji from '../../data/Emojis/ParseEmoji';
import notifyStyles from './notifyStyles';

const ActionRing = (actionRingProps: any) => {
  //パフォーマンスに問題でそう usecallback使えばいいの?
  const navigation = useNavigation();
  const data = actionRingProps.data;
  return (
    <View>
      <TouchableOpacity
        style={notifyStyles.avatarContainer}
        onPress={() => {
          navigation.navigate('User', data.userId);
        }}>
        <Image
          source={{
            uri: data.avatar,
          }}
          accessible={true}
          style={notifyStyles.avatar}
          accessibilityLabel={data.name}
        />
      </TouchableOpacity>
      <View
        style={[
          {backgroundColor: data.actionring.background},
          notifyStyles.actionring,
        ]}>
        {
          //data.actionring.reaction ? (... 内
          /* <ParseEmoji
            text={data.actionring.reaction}
            emojis={data.actionring.emoji}
            textStyle={{}}
            ifoneline={true}
          />*/
        }

        {data.actionring.reaction ? (
          <EmojiText emojis={data.actionring.emojis} numberOfLines={1}>
            {data.actionring.reaction}
          </EmojiText>
        ) : (
          <Icon
            style={notifyStyles.actionringicon}
            size={20}
            name={data.actionring.icon}
            color="#fff"
          />
        )}
      </View>
    </View>
  );
};
export default ActionRing;
