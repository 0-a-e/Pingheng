import React, { Component, createRef, useContext, useEffect, useState } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import getMeta,{setnewMeta} from '../data/Getmeta';
import HMSAvailability, {ErrorCode} from "@hmscore/react-native-hms-availability";
import * as SecureStore from 'secure-store';
import Video from "react-native-video";
import ActionSheet from "react-native-actions-sheet";

const Register = ({navigation}) => {

const actionsheetRef = createRef();
console.log("Register open");
const [svurl, setSvurl] = useState("");

useEffect(() => {
  Linking.addEventListener('url', async event => {
    await getAuth(event.url);
  });
});

SecureStore.getItemAsync("user1")
.then((res) => {
  if(res){
    navigation.navigate("Main");
  }
}, (err) => {
console.log(err);
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

function isValidUrl(string) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(string);
}


const getAuth = (url:string) => {
    if(url){
      try{
        const sessionid = parseurl(url)["session"];
        if(!sessionid){
          alert("パースに失敗しました");
        } else {
          const checkurl = svurl + "/api/miauth/" + sessionid + "/check";
          axios.post(checkurl).then(function (response) {
          //あとでユーザー情報取り出してこんにちは！xxさんをやる
            if(response.data["ok"]){
              const token = response.data["token"];
              SecureStore.setItemAsync("user1", token).then(() => {
               /* HMSAvailability.isHuaweiMobileServicesAvailable()
                    .then((res) => { console.log(JSON.stringify(res)) })
                    .catch((err) => { console.log(JSON.stringify(err)) });*/
                setnewMeta(svurl).then(() => {
                  navigation.navigate("Main");
                });
              });
            } else {
                alert("認証エラー");
            }
          });
        }
      }catch(ee){
        console.log(ee);
        alert("パースに失敗しました");
      }
    } else {
        alert("入力されていません");
    }
}

const getAuthURL = async (serverurl:string) => {
    const uuid = uuidv4();
    let url;
    if(serverurl.match(/https:\/\//) || serverurl.match(/http:\/\//)){
      url = serverurl;
    } else {
      url = "https://" + serverurl;
    }
    if(isValidUrl(url)){
      let redirectUrl = Linking.createURL('auth/', {});
      const latesturl = url +'/miauth/' + uuid + '?name=PingHeng&callback=' + redirectUrl + '&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messageing,write:messageing,read:mutes,write:mutes,write:notes,read:notifications,write:notificaions,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes';
      setSvurl(url);
      WebBrowser.openBrowserAsync(latesturl);
    }else{
      ToastAndroid.show("URLが入力されていないか、無効なURLです。",2000);
    }
  }

  const Manualloginsheet = () => {
    const [serverURL, setserverURL] = useState('');
    return(
  <ActionSheet ref={actionsheetRef}>
    <View style={{justifyContent:"center",alignItems:"center"}}>
          <Input
        //style={{color:"white"}}
        onChangeText={(text) => {setserverURL(text);}}
        value={serverURL}
        placeholder='サーバーのURLを入力...(例:misskey.io)'
      />
      <Button
      style={{borderRadius:50}}
      containerStyle = {{borderRadius:50,width:150,marginBottom:10}}
        title="ログインする"
        type="clear"
        onPress={() => {getAuthURL(serverURL);}}
      />
      </View>
  </ActionSheet>
  );  
  }

  return(
    <View style={{backgroundColor: "rgb(19,20,26)",height:"100%"}}>
      <Manualloginsheet />
        <Video
          source={{uri:"https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4"}}
          style={{height: Dimensions.get('window').height,width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "stretch",
            bottom: 0,
            right: 0
          }}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
       //   rate={1.0}
        //  ignoreSilentSwitch={"obey"}
      />

      <View style={{width:"100%",alignItems:"center",justifyContent:"center",position:"absolute",bottom:0,marginBottom:30}}>
      <Button
            style={{borderRadius:50}}
            buttonStyle={{padding:15,backgroundColor:"rgb(240,240,240)"}}
            titleStyle={{fontSize:25,color:"rgb(19,20,26)"}}
            containerStyle = {{borderRadius:50,width:"80%",marginBottom:10}}
        title="はじめる"
        onPress={() => {getAuthURL('https://msk.seppuku.club');}}
      />
      <Button
      style={{borderRadius:50}}
      containerStyle = {{borderRadius:50,width:250}}
        title="別のインスタンスで使用する"
        type="clear"
        onPress={() => {actionsheetRef.current?.setModalVisible(true);}}
      />
      </View>
    </View>
  );
}
export default Register;