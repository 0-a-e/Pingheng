import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  /*const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };*/

  return (
   /* <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>*/
    <View style={styles.container}>
    <StatusBar
      animated={true}
      backgroundColor="rgb(19,20,26)"
      />
              <NavigationContainer>
              </NavigationContainer>
    </View>
  );
};

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

export default App;
