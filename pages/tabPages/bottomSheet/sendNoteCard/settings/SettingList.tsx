import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {settingType} from './settingType';
const SettingList = ({
  item,
  visibility,
  changeVisibility,
}: {
  item: settingType;
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: -1,
      }}
      onPress={() => {
        changeVisibility(item.id);
      }}>
      <Icon
        name={item.icon}
        size={25}
        {...(visibility === item.id ? {color: '#2950ff'} : {color: '#FFF'})}
        style={{marginLeft: '5%'}}
      />
      <Text
        style={[
          {
            opacity: 0.8,
            marginLeft: '5%',
            width: '100%',
            fontWeight: 'bold',
          },
          visibility === item.id ? {color: '#2950ff'} : {color: '#FFF'},
        ]}
        numberOfLines={1}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingList;
