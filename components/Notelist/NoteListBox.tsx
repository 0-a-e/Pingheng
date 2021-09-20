import NoteList from '../../Variable/NoteList';
import React, { createRef,useCallback,useContext, useEffect, useState } from 'react';
import { View,Text, BackHandler, ToastAndroid, TouchableOpacity, FlatList } from 'react-native';
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
  //const [ifloading,Setifloading] = useState(false);
  const actionSheetRef = createRef();
  const reactionSheetRef = createRef();
  let whichsheet = "nothing";
  let notedata;
  let reactiondata;

  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
  return () =>
    BackHandler.removeEventListener("hardwareBackPress", backAction);
 }, []);
 
 const backAction = () => {
  console.log(whichsheet);
  if(whichsheet == "reaction"){
   closeReaction({"onlyclose":true});
   return true;
 } else if(whichsheet == "action"){
   closeAction({"onlyclose":true});
   return true;
 } else if(whichsheet == "nothing"){
 //  return false;
    ToastAndroid.show("この画面では戻るボタンでホームに戻る操作はブロックされています。ホームに戻る場合はホームボタンを使用してください。", ToastAndroid.SHORT);
    return true;
   }
};
 

  const getactiondata = () => {
    return notedata;
  }
  const getreactiondata = () => {
    return reactiondata;
  }
  
  const openAction = (data:any) => {
   // console.log(data);
    notedata = data;
    whichsheet = "action";
    actionSheetRef.current?.snapTo(0);
  }

  const openReaction = (data:any) => {
    reactiondata = data;
    whichsheet = "reaction";
    reactionSheetRef.current?.snapTo(0);
  }


  const closeAction = (d) => {
   // console.log("---action: ",d);
    try{
    if(d["onlyclose"] == true){
      actionSheetRef.current?.snapTo(1);
    } else {
     whichsheet = "nothing";
     }
     } catch(e){
      console.log(e);
     }
   }
 
   const closeReaction = (d) => {
    // console.log("---reaction:",d);
     try{
     if(d["onlyclose"] == true){
      reactionSheetRef.current?.snapTo(1);
    } else {
      whichsheet = "nothing";
     }
     } catch(e){
       console.log(e);
     }
   }
 
  //const renderNoteView = useCallback(({item}) => <NoteView data={item} EopenAction={(data:any) => openAction(data)}/>,[]);
  const getkey = useCallback((item) => ListKey(item),[]);
  const getItemLayout  = useCallback((data,index) => ({
    length:77,
    offset: 77 * index,
    index
  }),[]);
  const renderItem = useCallback((item) =><NoteView data={item} EopenAction={(data:any) => openAction(data)} EopenReaction={(data:any) => openReaction(data)}/>,[]);
  const InitialNumToRender = 10;
  //const renderItem = useCallback((item) =><TouchableOpacity><Text style={{margin:70,backgroundColor:"red",fontSize:30}}>rgf</Text></TouchableOpacity>,[]);
  return(
  <NoteList.Consumer>
    {(value) => {
      const nlist = value["notelist"];
//初回は空のリスト
return (
    //FlatListだとこのままでok
    //SwipeAcrionListは更新に対応していない？

    <View style={{width: "100%",height: "100%",backgroundColor: "rgb(19,20,26)"}}>
        {nlist.length > 0 ?
        <>
         <Action
            style={{justifyContent: "center",flex: 1}}
            actionSheetRef={actionSheetRef}
            closeAction={(d) => closeAction(d)}
            Egetactiondata={(data:any) => getactiondata(data)}
          />
          <Reaction
            style={{justifyContent: "center",flex: 1}}
            reactionSheetRef={reactionSheetRef}
            closeReaction={(d) => closeReaction(d)}
            Egetreactiondata={(data:any) => getreactiondata(data)}
          />
        <FlatList
          style = {{width: "100%",backgroundColor: "rgb(19,20,26)"}}
          keyExtractor={getkey}
          data={nlist} //be string 更新されるとだめらしい
          renderItem={renderItem} 
      //    renderLeftHiddenItem={RenderLeft}
       //   renderRightHiddenItem={RenderRight}
          getItemLayout = {getItemLayout} 
          initialNumToRender={InitialNumToRender}
          removeClippedSubviews={true}
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