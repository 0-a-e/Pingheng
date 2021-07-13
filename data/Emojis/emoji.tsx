import axios from "axios";
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
    axios.get('http://192.168.3.16:3000').then(async (resp) => {
         
        if(resp.status == 200){
         
            await storage.remove({
                key: 'emoji'
            });
            await storage.save({
                key: 'emoji',
                data: {
                    data:resp.data
                },
            });
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