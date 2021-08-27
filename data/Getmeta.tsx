import axios from "axios";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const getMeta = async (ifnew) => {
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });
    const setnewMeta = async () => {
        const serverURL = await getserverURL();
        axios.post(serverURL + '/api/meta').then(async (resp) => {
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
             } else {
                console.log('meta status err:', resp.status);
            }    
        }).catch(err => {
            if(err = "[Error:Network Error]"){
                console.log("ネットワークエラー");
            } else {
                console.log('metaget err:', err);
                console.log("行:", err.linenumber);
            }
        });
    }

    const useOldMeta = async() => {
        const res = await storage.load({key: 'meta'});
        if (res) {
            return res["data"];
        } else {
            return false;
        }
    }
    
    if(ifnew){
        setnewMeta();
    } else {
        const d = await useOldMeta();
        return d;
    };
}

export const getserverURL = async () => {
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });
    const res = await storage.load({key: 'meta'});
    if (res) {
        return res["data"].uri;
    } else {
        return false;
    }
}
export default getMeta;
