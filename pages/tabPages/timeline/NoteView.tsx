import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import noteStyles from './NoteStyles';
import allocation from './allocation';

const NoteView = props => {
  const {name, avatarUrl} = allocation(props);
  const data = props.data;
  return (
    <TouchableOpacity
      onLongPress={() => {
        alert('long tap');
        console.log(props.data.item);
      }}>
      <View style={noteStyles.card}>
        <View style={noteStyles.cardwrapper}>
          <Image
            source={{
              uri: avatarUrl,
            }}
            accessible={true}
            style={noteStyles.avatar}
            accessibilityLabel={name}
          />
          <View style={noteStyles.incardcontainer}>
            <View style={noteStyles.topcontainer}>
              <View style={{flexDirection: 'row'}}>
                <Text numberOfLines={1}>{name}</Text>
              </View>
            </View>
            <View style={noteStyles.normalcontainer}>
              <Text
                style={noteStyles.notetext}
                numberOfLines={2}
                ellipsizeMode="middle">
                    {data.id}
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
