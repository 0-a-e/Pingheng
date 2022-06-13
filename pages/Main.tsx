import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomSheet from './tabPages/bottomSheet/bottomSheet';

const MainScreen = ({navigation}) => {
  function HomeScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer independent={true}>
  {/*    <MyTabs />*/}
      <Text>fs</Text>
      <BottomSheet Tabs={MyTabs} />
    </NavigationContainer>
  );
};
export default MainScreen;
