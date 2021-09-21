import React from 'react';
import { StyleSheet,View,StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Mainbox from './components/Mainbox';
import { initializeParse } from  '@parse/react-native';
import { Host } from 'react-native-portalize';

export default function App() {
  initializeParse(
    'https://parseapi.back4app.com/',
    'RrU04nqwR3tjFyW6y00WfjP1hUmZmDj9xyZmtbyt',
    'f4t9GuIa6FU0YAlKN6MfXJMJ4dFtnvCBTUlUw6dW'
  );

  const Stack = createStackNavigator();
  return (

    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="rgb(19,20,26)"
        />
                <NavigationContainer>
                  <Host>
                  <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen
                      name="Main"
                      component={Mainbox}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Welcome"
                      component={Register}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                  </Host>
                </NavigationContainer>
    </View>
  
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //alignitemあるとなんか動作しない
   // alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    flex: 1,
  },
  btmbox: {
  //  flex: 1,
  flexWrap: "wrap",
  width: "100%",
  alignSelf: "flex-start",
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent:'space-between'
  },
  btmbutton:{
    position: "relative",
    width: 150,
    height:70,
    borderRadius:20,
    backgroundColor: "red"
    },
    textareaContainer: {
      height: 180,
      padding: 4,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },
});
