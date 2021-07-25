import React,{useEffect,useCallback, useContext} from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const gettoken = async () => {
  const storage: Storage = new Storage({
     storageBackend: AsyncStorage,
     defaultExpires: null,
     enableCache: true,
   });

  const res = await storage.load({key: 'user'});
    if (res["token"] && res){
        console.log("Mtoken loaded:" + res["token"]);
        return res["token"].toString();
    }
}

export default gettoken;