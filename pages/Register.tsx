import React, {createRef, useEffect, useState} from 'react';
import {
  Dimensions,
  ToastAndroid,
  View,
  useWindowDimensions,
  Linking,
  Platform,
} from 'react-native';
import {Button, Input} from '@rneui/base';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
//import * as WebBrowser from 'expo-web-browser';
//import * as Linking from 'expo-linking';
//import getMeta, {setnewMeta} from '../data/Getmeta';
//import HMSAvailability, {ErrorCode} from "@hmscore/react-native-hms-availability";
//import * as SecureStore from 'expo-secure-store';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Video from 'react-native-video';
import {getMeta} from '../api/useApi';
import { addInfo, deleteInfo } from '../api/serverInfo';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';

const Register = ({navigation}) => {
  const [manualloginvisible, setmanualloginvisible] = useState();
  const [inputURL, setinputURL] = useState('');
  console.log('Register open');
  /*  const [svurl, setSvurl] = useState('');

  useEffect(() => {
    Linking.addEventListener('url', async event => {
      await getAuth(event.url);
    });
  });

  SecureStore.getItemAsync('user1').then(
    res => {
      if (res) {
        navigation.navigate('Main');
      }
    },
    err => {
      console.log(err);
    },
  );
*/
  const ModalView = () => {
    return (
      <Modal
        visible={manualloginvisible}
        onTouchOutside={() => {
          setmanualloginvisible(false);
        }}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        width={1}
        height={1}
        modalStyle={{
          borderRadius: 20,
          marginBottom: 20,
          backgroundColor: 'transparent',
          padding: 0,
          margin: 0,
        }}>
        <ModalContent>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              height: useWindowDimensions().height - 380,
            }}
            onTouchStart={() => setmanualloginvisible(false)}
          />
          <View
            style={{
              backgroundColor: 'rgb(255,255,255)',
              width: '100%',
              borderRadius: 20,
              height: 345,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Input
              //style={{color:"white"}}
              onChangeText={(text: string) => {
                setinputURL(text);
              }}
              value={inputURL}
              placeholder="サーバーのURLを入力...(例:misskey.io)"
            />
            <Button
              style={{borderRadius: 50}}
              containerStyle={{borderRadius: 50, width: 150, marginBottom: 10}}
              title="ログインする"
              type="clear"
              onPress={() => {
                loginProcess(inputURL);
              }}
            />
          </View>
        </ModalContent>
      </Modal>
    );
  };

  const openbrowser = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.openAuth(url, 'pingheng://auth/', {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Linking.openURL(url);
    }
  };
  function isValidUrl(string: string): boolean {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return !!pattern.test(string);
  }

  const generateServerURL = (url: string) => {
    if (isValidUrl(url)) {
      if (url.match(/https:\/\//) || url.match(/http:\/\//)) {
        return url;
      } else {
        return 'https://' + url;
      }
    } else {
      return false;
    }
  };

  const checkServerExists = async (url: string) => {
    const res = await getMeta(url);
    if (res) {
      return res;
    } else {
      return false;
    }
  };

  const openAuth = async (url: string) => {
    const uuid = uuidv4();
    let redirectUrl = 'pingheng://auth?serverAddr=' + url;
    const authUrl =
      url +
      '/miauth/' +
      uuid +
      '?name=PingHeng&callback=' +
      redirectUrl +
      '&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messageing,write:messageing,read:mutes,write:mutes,write:notes,read:notifications,write:notificaions,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes';
    openbrowser(authUrl);
  };

  const loginProcess = async (inputUrl: string) => {
    //あとで処理中表示
    const serverUrl = generateServerURL(inputUrl);
    if (serverUrl) {
      const res = await checkServerExists(serverUrl);
      if (res) {
        try {
          await deleteInfo();
        } catch {
          console.log('failed deleteInfo');
        }
        if (await addInfo(res)) {
          openAuth(serverUrl);
        } else {
          ToastAndroid.show(
            'サーバー情報の登録に失敗しました。アプリを再起動し、再度お試しください。',
            2000,
          );
        }
      } else {
        ToastAndroid.show(
          'サーバーにアクセスできません。正しいURLを入力し、ネットワーク接続を確認してください。',
          2000,
        );
      }
    } else {
      ToastAndroid.show('URLが入力されていないか、無効なURLです。', 2000);
    }
  };

  return (
    <View style={{backgroundColor: 'rgb(19,20,26)', height: '100%'}}>
      <Video
        source={{
          uri: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_1MB_MP4.mp4',
        }}
        style={{
          height: Dimensions.get('window').height,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          alignItems: 'stretch',
          bottom: 0,
          right: 0,
        }}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        //   rate={1.0}
        //  ignoreSilentSwitch={"obey"}
      />

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: 30,
        }}>
        <Button
          style={{borderRadius: 50}}
          buttonStyle={{padding: 15, backgroundColor: 'rgb(240,240,240)'}}
          titleStyle={{fontSize: 25, color: 'rgb(19,20,26)'}}
          containerStyle={{borderRadius: 50, width: '80%', marginBottom: 10}}
          title="はじめる"
          onPress={() => {
            loginProcess('https://msk.seppuku.club');
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={{borderRadius: 50, width: 250}}
          title="別のインスタンスで使用する"
          type="clear"
          onPress={() => {
            setmanualloginvisible(true);
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={{borderRadius: 50, width: 250}}
          title="MainScreenに移動"
          type="clear"
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={{borderRadius: 50, width: 250}}
          title="SettingsScreenに移動"
          type="clear"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={{borderRadius: 50, width: 250}}
          title="deleteInfo"
          type="clear"
          onPress={() => {
            deleteInfo();
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={{borderRadius: 50, width: 250}}
          title="addInfo"
          type="clear"
          onPress={() => {
           addInfo({name: "DE"});
          }}
        />
      </View>
      <ModalView />
    </View>
  );
};
export default Register;
