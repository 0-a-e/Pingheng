import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {roundedDiffDate} from '../../../../api/dateCalc';
import EmojiText from '../../../../component/EmojiText';
import allocation from './allocation';
import noteStyles from './noteStyles';
import Visibility from './Visibility';

const TopBar = ({data}) => {
  const {name, avatarUrl, ifNoName} = allocation(data);
  const navigation = useNavigation();

  return (
    <View style={noteStyles.topBar}>
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
        <Text style={{color: '#fff'}}>{roundedDiffDate(data.createdAt)}</Text>
        <Visibility visibility={data.visibility} localOnly={data.localOnly} />
      </View>
    </View>
  );
};

export default TopBar;
