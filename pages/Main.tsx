import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from './tabPages/bottomSheet/bottomSheet';
import NotifyScreen from './tabPages/notify/Notify';
import TimelineScreen from './tabPages/timeline/Timeline';

const MainScreen = ({navigation}) => {
  const [beforetab, beforetabWrite] = useState('');
  const Stack = createNativeStackNavigator();

  function MyStack() {
    const stackNavigation = useNavigation();
    useEffect(() => {
      const navParams = navigation.getState().routes[1].params;
      if (navParams) {
        if (navParams.screen && navParams.screen !== beforetab) {
          beforetabWrite(navParams.screen);
          stackNavigation.navigate(navParams.screen);
        }
      }
    }, [stackNavigation]);
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
    <NavigationContainer independent={true}>
      <MyStack />
      <BottomSheet navigation={navigation} />
    </NavigationContainer>
  );
};

export default MainScreen;
