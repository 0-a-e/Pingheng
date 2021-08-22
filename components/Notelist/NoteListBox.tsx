import NoteList from '../../Variable/NoteList';
import React, { createRef,useCallback,useContext } from 'react';
import { View } from 'react-native';
import SwipeActionList from 'react-native-swipe-action-list';
import RenderLeft from './RenderLeft';
import RenderRight from './RenderRight';
import NoteView from './NoteView';
import Action from '../Action/Action';
import Reaction from '../Reaction/Reaction';
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
  const reactionSheetRef = createRef();
  const {notelist, notelistwrite} = useContext(NoteList);
  const [notedata,notedatawrite] = useState();
  let actionSheet;

  const openAction = (data:any) => {
    notedatawrite(data);
    actionSheetRef.current?.setModalVisible();
  }
  const openReaction = (data:any) => {
    reactionSheetRef.current?.setModalVisible();
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
      <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
        <Notedata.Provider value={{notedata,notedatawrite}}>
          <Action style={{justifyContent: "center",flex: 1}} actionSheetRef={actionSheetRef} />
          <Reaction style={{justifyContent: "center",flex: 1}} reactionSheetRef={reactionSheetRef} />
        </Notedata.Provider>
        <SwipeActionList
          style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
          keyExtractor={getkey}
          data={nlist} //be string 更新されるとだめらしい
          renderItem={item => <NoteView data={item} EopenAction={(data:any) => openAction(data)} EopenReaction={(data:any) => openReaction(data)}/>} 
          renderLeftHiddenItem={RenderLeft}
          renderRightHiddenItem={RenderRight}
          getItemLayout = {getItemLayout} 
        /> 
      </View>
)
}}
</NoteList.Consumer>
)

}
export default NoteListBox;