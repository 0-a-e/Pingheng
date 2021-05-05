import NoteList from '../../Variable/NoteList';
import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import SwipeActionList from 'react-native-swipe-action-list';
import RenderLeft from './RenderLeft';
import RenderRight from './RenderRight';
import NoteView from './NoteView';

//(Noteview(仮))

const ListKey = (props) => {
   // console.log(props["body"]["body"]["id"]);
  //  const data = props["data"]["item"];
    return props["body"]["body"]["id"];

}


const NoteListBox = () => {
const {notelist, notelistwrite} = useContext(NoteList);
return(
<NoteList.Consumer>
{(value) => {
const nlist = value["notelist"];
//初回は唐リスト
console.log(nlist);
return (
    //FlatListだとこのままでok
    //SwipeAcrionListは更新に対応していない？
    <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
      <SwipeActionList
    style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
    keyExtractor={item => ListKey(item)}
    data={nlist} //be string 更新されるとだめらしい
    renderItem={item => <NoteView data={item} />} 
    renderLeftHiddenItem={RenderLeft}
    renderRightHiddenItem={RenderRight}
  />
  </View>
)
}}
</NoteList.Consumer>
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

export default NoteListBox;