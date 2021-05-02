import React, { Component, useContext, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Linking,
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

const Register = ({navigation}) => {

const [ktokenurl, ktokenwrite] = useState();

const storage: Storage = new Storage({
    // バックエンドにAsyncStorageを使う
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})


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
    console.log(sessionid);
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
            console.log(token);
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

const getAuthURL = () => {
    const uuid = uuidv4();
    const url = 'https://msk.seppuku.club/miauth/' + uuid + '?name=PingHeng&callback=https://example.com&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messageing,write:messageing,read:mutes,write:mutes,write:notes,read:notifications,write:notificaions,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes';
    Linking.openURL(url);
}

return(
<View>
<Input
disabled
  placeholder='http://msk.seppuku.club(現在変更不可)'
/>
<Button
  title="認証URLを発行する"
  onPress={getAuthURL}
/>
<Text>認証後のURLをコピーし、表示された入力欄に貼り付けてください。</Text>

<Input
  onChangeText={(val)=>{ktokenwrite(val)} }
  placeholder='http://example.com&session...'
/>
<Button
  title="認証する"
  onPress={getAuth}
/>
</View>
    );
}
export default Register;