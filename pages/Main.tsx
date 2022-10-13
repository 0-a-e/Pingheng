import React, {useEffect, useState} from 'react';
import {DarkTheme, NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from './tabPages/bottomSheet/BottomSheet';
import NotifyScreen from './tabPages/notify/Notify';
import TimelineScreen from './tabPages/timeline/Timeline';
import UserScreen from './tabPages/user/User';
const MainScreen = ({navigation}) => {
  const [beforetab, beforetabWrite] = useState('');
  const Stack = createNativeStackNavigator();

  function MyStack() {
    const stackNavigation = useNavigation();
    useEffect(() => {
      let navParams;
      try {
        navParams = navigation.getState().routes[0].params;
      } catch (e) {
        navParams = navigation.getState().routes[1].params;
      }
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
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme} independent={true}>
      <MyStack />
      <BottomSheet navigation={navigation} />
    </NavigationContainer>
  );
};

export default MainScreen;
