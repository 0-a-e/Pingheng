import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const TabButton = ({
  icon,
  title,
  jumpTo,
  route,
}: {
  icon: string;
  title: string;
  jumpTo: any;
  route: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        jumpTo(route);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 10}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;
