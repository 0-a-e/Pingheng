import React,{useEffect,useCallback, useContext} from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const gettoken = async (Mtokenwrite: (arg0: string) => void,wsurlwrite: (arg0: string) => void) => {
  const storage: Storage = new Storage({
     storageBackend: AsyncStorage,
     defaultExpires: null,
     enableCache: true,
   });

    await storage.load({key: 'user'}).then(res => {
        if (res["token"] && res){
          Mtokenwrite(res["token"].toString());
          const url ="wss://msk.seppuku.club/streaming?i=" + res["token"].toString();
          console.log(url);
          wsurlwrite(url);
      }
});
}

export default gettoken;