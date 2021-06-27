import axios from "axios";
import React from "react";
import { View,Text } from "react-native";
import { Input } from "react-native-elements";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const Emoji = () => {
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    })

    
    //あとでurlに
    axios.get('http://192.168.3.5:3000').then((resp) => {
        
        if(resp.status == 200){
        storage.save({
            key: 'emoji',
            data: {
              data:resp.data
            },
        });
        } else {
            console.log('emojiget status err:', resp.status);
        }
    }).catch(err => {
        console.log('emojiget err:', err);
    });
}
export default Emoji;