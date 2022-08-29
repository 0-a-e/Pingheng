import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './noteStyles';
import allocation from './allocation';
import { useNavigation } from '@react-navigation/native';

const NoteView = props => {
  const {name, avatarUrl} = allocation(props);
  const data = props.data;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onLongPress={() => {
        alert('long tap');
        console.log(data.item);
      }}>
      <View style={noteStyles.card}>
        <View style={noteStyles.cardwrapper}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <View style={noteStyles.incardcontainer}>
            <View style={noteStyles.topcontainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#fff'}} numberOfLines={1}>
                  {name}
                </Text>
              </View>
            </View>
            <View style={noteStyles.normalcontainer}>
              <Text
                style={noteStyles.notetext}
                numberOfLines={2}
                ellipsizeMode="middle">
                {data.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default NoteView;
