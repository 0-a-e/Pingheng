import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { sendAPI } from '../data/useAPI';
import Mtokenvar from '../Variable/Mtoken';
import NotifyListbox from './Notify/NotifyListBox';
import NotifyState from '../Variable/NotifyState';

const Notifybox= () => {
    const [notifylist,notifylistwrite] = useState([]);
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
 //   useEffect(() =>{getNotify();});
    return(
    <NotifyState.Provider value = {{notifylist,notifylistwrite}}>
        <NotifyListbox PgetNotify={() => getNotify()}/>
    </NotifyState.Provider>
    )
}
export default Notifybox;