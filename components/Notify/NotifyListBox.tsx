import NotifyState from '../../Variable/NotifyState';
import React, { useContext, useEffect } from 'react';
import { FlatList, View,RefreshControl } from 'react-native';
import NotifyView from './NotifyView';
import { useState } from 'react';
import { sendAPI } from '../../data/useAPI';
import Mtokenvar from '../../Variable/Mtoken';
//(Noteview(仮))

const ListKey = (props) => {
    return props["id"];
}

const NotifyListBox = (props: any) => {
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);

    const getNotify = () => {
        sendAPI([Mtoken,"i/notifications",{"limit":50}]).then(data => {
            if(data){
                notifylistwrite(data); 
            }else{
                alert("通知取得エラー");
            }
            });
    }
    
    const [notifylist,notifylistwrite] = useState([]);
    const [refresh,refreshwrite] = useState(false);

    const gn = () => {
        refreshwrite(true);
        getNotify();
        refreshwrite(false);
    }
    useEffect(() => {gn();},[]);

    
    return(
        <NotifyState.Provider value = {{notifylist,notifylistwrite}}>
            <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
            <FlatList
                data = {notifylist}
                style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
                keyExtractor={item => ListKey(item)}
                renderItem={item => <NotifyView data={item} />} 
                //renderItem={item => <Text style={{color:"#fff"}}>{JSON.stringify(item)}</Text>}
                refreshControl={<RefreshControl
                    colors={["rgb(19,20,26)", "#000"]}
                    refreshing={refresh}
                    onRefresh={gn}
                    />
                }
            /> 
            </View>
        </NotifyState.Provider>
)
}

export default NotifyListBox;