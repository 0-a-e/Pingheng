import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function NotifyScreen({navigation}) {
  useEffect(() => {
    console.log('NotifyUseEffect');
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notify!</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Timeline');
        }}>
        <Text>go to Timeline</Text>
      </TouchableOpacity>
    </View>
  );
}
export default NotifyScreen;
