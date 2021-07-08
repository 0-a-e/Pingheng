import NotifyState from '../../Variable/NotifyState';
import React, { useContext, useEffect } from 'react';
import { FlatList, Text, View,RefreshControl } from 'react-native';
import NotifyView from './NotifyView';
import { useState } from 'react';

//(Noteview(仮))

const ListKey = (props) => {
    return props["id"];
}

const NotifyListBox = (props: any) => {
    
    const gn = () => {
        refreshwrite(true);
        props.PgetNotify();
        refreshwrite(false);
    }

const [refresh,refreshwrite] = useState(false);
return(
<NotifyState.Consumer>
{(value) => {
const notifylist = value["notifylist"];
//初回は唐リスト

return (
     <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
      <FlatList
        data = {notifylist}
        style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
        keyExtractor={item => ListKey(item)}
        renderItem={item => <NotifyView data={item} />} 
        refreshControl={<RefreshControl
            colors={["rgb(19,20,26)", "#000"]}
            refreshing={refresh}
            onRefresh={gn}
            />}
       //renderItem={item => <Text style={{color:"#fff"}}>{JSON.stringify(item)}</Text>}
      /> 
  </View>
)
}}
</NotifyState.Consumer>
)
}

export default NotifyListBox;