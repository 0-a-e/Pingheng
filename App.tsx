import React, {useEffect, useReducer, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './pages/register/Register';
import SetupScreen from './pages/setup/Setup';
import SettingsScreen from './pages/settings/Settings';
import MainScreen from './pages/Main';
import {ModalPortal} from 'react-native-modals';
import {checkUserexists} from './api/tokenManage';
import useRealmManage, {serverInfoManage} from './api/realm/useRealmManage';
const App = () => {
  const [ifloggedin, setifloggedin] = useState(false);
  const {getInfo} = serverInfoManage();
  console.log('--reload--\n', ifloggedin, '\n--');
  /*const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/
  useEffect(() => {
    (async () => {
      await checkIfloggedin();
    })();
  }, []);

  const checkIfloggedin = async () => {
    const a = await checkUserexists();
    const b = await getInfo();
    if (a && b) {
      setifloggedin(true);
    } else {
      setifloggedin(false);
    }
  };

  const config = {
    screens: {
      Setup: {
        path: 'auth/:session?',
        parse: {
          session: (session: String) => `${session}`,
          serverAddr: (serverAddr: String) => `${serverAddr}`,
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
          linking={!ifloggedin && linking}
          fallback={<Text>処理中...</Text>}>
          <Stack.Navigator initialRouteName="Register">
            {ifloggedin ? (
              <>
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
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Setup"
                  component={SetupScreen}
                  options={{headerShown: false}}
                  initialParams={{checkIfloggedin: checkIfloggedin}}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{headerShown: false}}
                />
              </>
            )}
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
