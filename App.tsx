import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NoteList from './Variable/NoteList';
import NotifyList from './Variable/NotifyState';
import TimelineStateContext from './Variable/TimelineState';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/Register';
import Mainbox from './components/Mainbox';
import WSobj from './Variable/WSobj';
import Mtokenvar from './Variable/Mtoken';
import { initializeParse } from  '@parse/react-native';


export default function App() {

  initializeParse(
    'https://parseapi.back4app.com/',
    'RrU04nqwR3tjFyW6y00WfjP1hUmZmDj9xyZmtbyt',
    'f4t9GuIa6FU0YAlKN6MfXJMJ4dFtnvCBTUlUw6dW'
  );


  const [notelist, notelistwrite] = useState([]);
  const [notifylist,notifylistwrite] = useState([]);
  const [timelinestate, timelinestatewrite] = useState(undefined);
  const [ws,wswrite] = useState("");
  const [Mtoken,Mtokenwrite] = useState("");
  const Stack = createStackNavigator();


  return (
    <View style={styles.container}>
      <Mtokenvar.Provider value = {{Mtoken,Mtokenwrite}}>
        <WSobj.Provider value ={{ ws,wswrite }}>
          <NotifyList.Provider value = {{notifylist,notifylistwrite}}>
            <NoteList.Provider value={{ notelist, notelistwrite }}>
              <TimelineStateContext.Provider value={{timelinestate,timelinestatewrite}}>
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen
                      name="Main"
                      component={Mainbox}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Welcome"
                      component={Register}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </TimelineStateContext.Provider>
            </NoteList.Provider>
          </NotifyList.Provider>
        </WSobj.Provider>
      </Mtokenvar.Provider>
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
