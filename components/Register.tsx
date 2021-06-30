import React, { Component, useContext, useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import url from 'url';
import axios from 'axios';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const Register = ({navigation}) => {
  
const [ktokenurl, ktokenwrite] = useState();

useEffect(() => {
  Linking.addEventListener('url', event => {
    ktokenwrite(event.url);
    getAuth();
  });
});

const storage: Storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

/* 重複防止処理　でも再ログインしたいときのためいらないかも　いや　先に再ログイン前にトークン消すかも*/
storage.load({key: 'user'}).then(res => {
    if (res["token"] && res){
    navigation.navigate("Main");
    }
    }).catch(err => {

    });


const parseurl = (url) => {
var regex = /[?&]([^=#]+)=([^&#]*)/g,
  params = {},
  match;
while (match = regex.exec(url)) {
  params[match[1]] = match[2];
}
return params;
}


const getAuth = () => {
    if(ktokenurl){
      try{
        const sessionid = parseurl(ktokenurl)["session"];
        if(!sessionid){
          alert("パースに失敗しました");
        } else {
          const checkurl = "https://msk.seppuku.club/api/miauth/" + sessionid + "/check";
          axios.post(checkurl).then(function (response) {
          //あとでユーザー情報取り出してこんにちは！xxさんをやる
            if(response.data["ok"]){
              const token = response.data["token"];
              storage.save({
                key: 'user',
                data: {
                  token: token
                },
              });
              navigation.navigate("Main");
            } else {
                alert("認証エラー");
            }
          });
        }
      }catch{
        alert("パースに失敗しました");
      }
    } else {
        alert("入力されていません");
    }
}

const getAuthURL = async () => {
    const uuid = uuidv4();
    let redirectUrl = Linking.createURL('auth/', {});
    const url = 'https://msk.seppuku.club/miauth/' + uuid + '?name=PingHeng&callback=' + redirectUrl + '&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messageing,write:messageing,read:mutes,write:mutes,write:notes,read:notifications,write:notificaions,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes';
    WebBrowser.openBrowserAsync(url);
  }

  return(
    <View>
      <Input
        disabled
        placeholder='http://msk.seppuku.club(現在変更不可) 2回ログイン必要'
      />
      <Button
        title="ログインする"
        onPress={getAuthURL}
      />
    </View>
  );
}
export default Register;