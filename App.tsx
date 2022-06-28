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
import RegisterScreen from './pages/Register';
import SetupScreen from './pages/Setup';
import SettingsScreen from './pages/Settings';
import MainScreen from './pages/Main';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  /*const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/
  const config = {
    screens: {
      Setup: {
        path: 'auth/:session?',
        parse: {
          session: (session: String) => `${session}`,
        },
      },
    },
  };

  const linking = {
    prefixes: ['pingheng://'],
    config,
  };
  const Stack = createNativeStackNavigator();

  return (
    /* <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>*/
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="rgb(19,20,26)" />
        <NavigationContainer
          linking={linking}
          fallback={<Text>処理中...</Text>}>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Setup"
              component={SetupScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
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
