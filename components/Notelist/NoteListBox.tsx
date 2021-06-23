import NoteList from '../../Variable/NoteList';
import React, { createRef,useCallback,useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import SwipeActionList from 'react-native-swipe-action-list';
import RenderLeft from './RenderLeft';
import RenderRight from './RenderRight';
import NoteView from './NoteView';
import Action from '../Action/Action';
import { useState } from 'react';
import Notedata from '../../Variable/Notedata';
//(Noteview(仮))

const ListKey = (props) => {
   //console.log(props["id"]);
  //  const data = props["data"]["item"];
    return props["id"];


}
const NoteListBox = () => {
  const actionSheetRef = createRef();
  const {notelist, notelistwrite} = useContext(NoteList);
  const [notedata,notedatawrite] = useState();
  let actionSheet;

  const openAction = (data:any) => {
    notedatawrite(data);
    actionSheetRef.current?.setModalVisible();
  }

  const renderNoteView = useCallback(({item}) => <NoteView data={item} EopenAction={(data:any) => openAction(data)}/>,[]);
  const getkey = useCallback((item) => ListKey(item),[]);
  const getItemLayout  = useCallback((data,index) => ({
    length:77,
    offset: 77 * index,
    index
  }),[]);
  
  return(
  <NoteList.Consumer>
    {(value) => {
      const nlist = value["notelist"];
//初回は唐リスト
return (
    //FlatListだとこのままでok
    //SwipeAcrionListは更新に対応していない？
    <Notedata.Provider value={{notedata,notedatawrite}}>
      <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
        <Action style={{justifyContent: "center",flex: 1}} actionSheetRef={actionSheetRef} />
        <SwipeActionList
          style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
          keyExtractor={getkey}
          data={nlist} //be string 更新されるとだめらしい
          renderItem={item => <NoteView data={item} EopenAction={(data:any) => openAction(data)}/>} 
          renderLeftHiddenItem={RenderLeft}
          renderRightHiddenItem={RenderRight}
          getItemLayout = {getItemLayout} 
        /> 
      </View>
    </Notedata.Provider>
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