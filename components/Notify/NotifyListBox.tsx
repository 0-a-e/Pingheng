import NotifyState from '../../Variable/NotifyState';
import React, { useContext, useEffect } from 'react';
import { FlatList, View,RefreshControl,Text } from 'react-native';
import NotifyView from './NotifyView';
import { useState } from 'react';
import { sendAPI } from '../../data/useAPI';
import Mtokenvar from '../../Variable/Mtoken';
import * as Progress from 'react-native-progress';
//(Noteview(仮))

const ListKey = (props) => {
    return props["id"];
}
const NotifyListBox = (props: any) => {
    const [ifloading,Setifloading] = useState(false);
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);

    const getNotify = () => {
        sendAPI([Mtoken,"i/notifications",{"limit":50}]).then(data => {
            Setifloading(false);
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
        Setifloading(true);
        refreshwrite(true);
        getNotify();
        refreshwrite(false);
    }
    useEffect(() => {gn();},[]);

    
    return(
        <NotifyState.Provider value = {{notifylist,notifylistwrite}}>
            <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
                {notifylist.length > 0 ?
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
            :ifloading ?
            <View style={{width: "100%",height: "100%",alignItems:"center"}}>
                <Progress.Bar indeterminate={true} width={null} useNativeDriver={true} style={{width:"100%"}} borderRadius={0} borderWidth={0}/>
                    <Text style={{color:"rgb(240,240,240)",marginTop:10,fontSize:15}}>読み込み中...</Text>
            </View>
            :
            <View style={{width: "100%",height: "100%",justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:20}}>まだ通知がありません</Text>
            </View>
            }
            </View>
        </NotifyState.Provider>
)
}

export default NotifyListBox;