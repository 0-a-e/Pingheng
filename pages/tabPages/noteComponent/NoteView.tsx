import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './noteStyles';
import allocation from './allocation';
import {useNavigation} from '@react-navigation/native';
import {roundedDiffDate} from '../../../api/dateCalc';
import Visibility from './Visibility';
import ReactionView from './reaction/ReactionView';
import EmojiText from '../../../component/EmojiText';
const NoteView = props => {
  const {name, avatarUrl, ifNoName} = allocation(props);
  const data = props.data;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onLongPress={() => {
        alert('long tap');
        console.log(data.reactions);
        console.log(data.visibility);
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
        </View>
        <ReactionView
          emojis={data.emojis}
          reactions={data.reactions}
          noteId={data.id}
        />
      </View>
    </TouchableOpacity>
  );
};
export default NoteView;
