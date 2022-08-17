import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function TimelineScreen({navigation}) {
  useEffect(() => {
    console.log('TimelineUseEffect');
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 100}}>TL</Text>
    </View>
  );
}
export default TimelineScreen;
