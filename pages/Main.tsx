import React, {useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from './tabPages/bottomSheet/bottomSheet';
import NotifyScreen from './tabPages/notify/Notify';
import TimelineScreen from './tabPages/timeline/Timeline';
const MainScreen = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  function MyStack() {
    useEffect(() => {
      console.log('MyStackUseEffect');
    }, []);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notify"
          component={NotifyScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <View style={{position: 'absolute', width: 400, height: 300}}>
      <NavigationContainer independent={true}>
        <MyStack />
      </NavigationContainer>
      <BottomSheet navigation={navigation} />
    </View>
  );
};

export default MainScreen;
