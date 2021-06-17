import NotifyState from '../../Variable/NotifyState';
import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import NotifyView from './NotifyView';

//(Noteview(仮))

const ListKey = (props) => {
   //console.log(props["id"]);
  //  const data = props["data"]["item"];
    return props["id"];


}


const NotifyListBox = () => {
const {notifylist, notifylistwrite} = useContext(NotifyState);
return(
<NotifyState.Consumer>
{(value) => {
const notifylist = value["notifylist"];
//初回は唐リスト
//console.log(nlist);
return (
    //FlatListだとこのままでok
     <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>

      <FlatList
        data = {notifylist}
        style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
        keyExtractor={item => ListKey(item)}
        renderItem={item => <NotifyView data={item} />} 
        //renderItem={item => <Text>{JSON.stringify(item)}</Text>}
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