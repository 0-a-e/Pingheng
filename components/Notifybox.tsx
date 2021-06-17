import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';

import { sendAPI } from '../data/useAPI';
import Mtokenvar from '../Variable/Mtoken';
import NotifyState from '../Variable/NotifyState';
import NotifyListbox from './Notify/NotifyListBox';

const Notifybox= () => {
    const {notifylist, notifylistwrite} = useContext(NotifyState);
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);

    function getNotify(){
        sendAPI([Mtoken,"i/notifications",{"limit":50}]).then(data => {
            if(data){
                console.log("GETDATAOK");
                notifylistwrite(data); 
            }else{
                alert("通知取得エラー");
            }
        });
    }

    return(
    <View>
        <Text>ddd</Text>
        <Button
          onPress={getNotify}
          title="取得"
          />
        <NotifyListbox />
    </View>
    )
}
export default Notifybox;