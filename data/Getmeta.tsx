import axios from "axios";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage: Storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

const getMeta = async () => {
    const useOldMeta = async() => {
        const res = await storage.load({key: 'meta'});
        if (res) {
            return res["data"];
        } else {
            return false;
        }
    }
        const d = await useOldMeta();
        return d;
}

export const setnewMeta = async (svurl:string) => {
    axios.post(svurl + '/api/meta').then(async (resp) => {
        if(resp.status == 200){
            await storage.remove({
                key: 'meta'
            });
            await storage.save({
                key: 'meta',
                data: {
                    data:resp.data
                },
            });
        console.log("meta update OK");
        return true;
         } else {
            console.log('meta status err:', resp.status);
            return false;
        }    
    }).catch(err => {
        if(err = "[Error:Network Error]"){
            console.log("ネットワークエラー");
            return false;
        } else {
            console.log('metaget err:', err);
            console.log("行:", err.linenumber);
            return false;
        }
    });
}


export const getserverURL = async () => {
    const res = await getMeta();
    if (res) {
        console.log(res.uri);
        return res.uri;
    } else {
        return false;
    }
}

export default getMeta;
