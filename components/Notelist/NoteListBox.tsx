import NoteList from '../../Variable/NoteList';
import React, { createRef,useCallback,useContext } from 'react';
import { View,Text } from 'react-native';
import SwipeActionList from 'react-native-swipe-action-list';
import RenderLeft from './RenderLeft';
import RenderRight from './RenderRight';
import NoteView from './NoteView';
import Action from '../Action/Action';
import Reaction from '../Reaction/Reaction';


//(Noteview(仮))

//ラグくなるのは読み込み終わるまで待っちゃうからかも
const ListKey = (props) => {
   //console.log(props["id"]);
  //  const data = props["data"]["item"];
    return props["id"];
  }

const NoteListBox = () => {
  const actionSheetRef = createRef();
  const reactionSheetRef = createRef();
  let notedata;
  let reactiondata;

  const getactiondata = () => {
    return notedata;
  }
  const getreactiondata = () => {
    return reactiondata;
  }
  
  const openAction = (data:any) => {
   // console.log(data);
    notedata = data;
    actionSheetRef.current?.setModalVisible();
  }

  const openReaction = (data:any) => {
    reactiondata = data;
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
        {nlist.length > 0 ?
        <>
          <Action style={{justifyContent: "center",flex: 1}} actionSheetRef={actionSheetRef} Egetactiondata={(data:any) => getactiondata(data)} />
          <Reaction style={{justifyContent: "center",flex: 1}} reactionSheetRef={reactionSheetRef}  Egetreactiondata={(data:any) => getreactiondata(data)} />
        <SwipeActionList
          style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
          keyExtractor={getkey}
          data={nlist} //be string 更新されるとだめらしい
          renderItem={item => <NoteView data={item} EopenAction={(data:any) => openAction(data)} EopenReaction={(data:any) => openReaction(data)}/>} 
          renderLeftHiddenItem={RenderLeft}
          renderRightHiddenItem={RenderRight}
          getItemLayout = {getItemLayout} 
        /> 
        </>
        :
        <View style={{width: "100%",height: "100%",justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"#fff",fontSize:20}}>まだノートがありません</Text>
        </View>
        }
      </View>
)
}}
</NoteList.Consumer>
)

}
export default NoteListBox;