import NotifyState from '../../Variable/NotifyState';
import React, { useContext } from 'react';
import { FlatList, Text, View,RefreshControl } from 'react-native';
import NotifyView from './NotifyView';
import { useState } from 'react';

//(Noteview(仮))

const ListKey = (props) => {
   //console.log(props["id"]);
  //  const data = props["data"]["item"];
    return props["id"];


}

const NotifyListBox = (props: any) => {
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const gn = () => {
        console.log("props");
        refreshwrite(true);
        props.PgetNotify();
        refreshwrite(false);
    }

const [refresh,refreshwrite] = useState(false);
const {notifylist, notifylistwrite} = useContext(NotifyState);
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

/* 
return(
<NoteList.Consumer>
{(value) => {
      }}
</NoteList.Consumer>
)
*/
}

export default NotifyListBox;