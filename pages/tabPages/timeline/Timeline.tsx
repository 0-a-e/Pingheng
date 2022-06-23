import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function TimelineScreen({navigation}) {
  useEffect(() => {
    console.log('TimelineUseEffect');
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TL!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notify');
        }}>
        <Text>go to Notify</Text>
      </TouchableOpacity>
    </View>
  );
}
export default TimelineScreen;
