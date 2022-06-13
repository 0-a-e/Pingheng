import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from './pages/Settings';
import RegisterScreen from './pages/Register';
import MainScreen from './pages/Main';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  /*const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/
  const AppStackNavigator = createNativeStackNavigator();

  return (
    /* <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>*/
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="rgb(19,20,26)" />
        <NavigationContainer>
          <AppStackNavigator.Navigator initialRouteName="Register">
            <AppStackNavigator.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <AppStackNavigator.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <AppStackNavigator.Screen
              name="Settings"
              component={SettingsScreen}
              options={{headerShown: false}}
            />
          </AppStackNavigator.Navigator>
          <ModalPortal />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //alignitemあるとなんか動作しない
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  btmbox: {
    //  flex: 1,
    flexWrap: 'wrap',
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  btmbutton: {
    position: 'relative',
    width: 150,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  textareaContainer: {
    height: 180,
    padding: 4,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
});

export default App;

const lcRegisterScreen = ({navigation}) => {
  return (
    <View>
      <Text> Register </Text>
      <TouchableOpacity
        style={{top: 100}}
        onPress={() => navigation.navigate('Main')}>
        <Text> Go to Main </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{top: 100}}
        onPress={() => navigation.navigate('Settings')}>
        <Text> Go to Settings </Text>
      </TouchableOpacity>
    </View>
  );
};
