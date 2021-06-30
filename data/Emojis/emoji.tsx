import axios from "axios";
import React from "react";
import { View,Text } from "react-native";
import { Input } from "react-native-elements";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const Emoji = () => {
    console.log("emoji");
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    })

    
    //あとでurlに
    axios.get('http://192.168.3.16:3000').then((resp) => {
         
        if(resp.status == 200){
         
            storage.remove({
            key: 'emoji'
            });
/*
        storage.save({
            key: 'emoji',
            data: {
              data:resp.data
            },
        });*/
        console.log("emoji update OK");
         } else {
            console.log('emojiget status err:', resp.status);
        }
        
    }).catch(err => {
        if(err = "[Error:Network Error]"){
            console.log("ネットワークエラー");
        } else {
        console.log('emojiget err:', err);
        console.log("行:", err.linenumber);
        }
        });
}
export default Emoji;