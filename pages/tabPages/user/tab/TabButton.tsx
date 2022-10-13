import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, Animated} from 'react-native';
import ReAnimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {NavigationState, Route} from 'react-native-tab-view';
import {Measure} from './types';

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
    <ReAnimated.View style={[{backgroundColor: 'red', height: '100%'}]}>
      <TouchableOpacity
        onPress={() => {
          jumpTo(route);
        }}
        style={{width: '100%', height: '100%', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginLeft: 10}}>{title}</Text>
        </View>
      </TouchableOpacity>
    </ReAnimated.View>
  );
};

export default TabButton;
