import React,{useContext,useState,useEffect} from 'react';
import gettoken from './gettoken';
import NoteList from '../../Variable/NoteList';
import WS from 'react-native-websocket';
import WSurl from '../../Variable/WSurl';
import WSobj from '../../Variable/WSobj';

const ReturnWS = () => {

    const {notelist, notelistwrite} = useContext(NoteList);
    const {wsurl,wsurlwrite} = useContext(WSurl);
    const {ws,wswrite} = useContext(WSobj);

    useEffect(() => {
      gettoken(wsurlwrite);
    },[]);
    //    wsurl = gettingtoken;

      return(
  <WSurl.Consumer>
    {(val)=>{
      return(
  <WS
  ref={ref => {wswrite(ref)}}
  url={val["wsurl"]}
  onOpen={() => {
    console.log('Open!');
  }}
  onMessage={(msg: { [x: string]: any; }) => {
    console.log(msg["data"]);
    //ノートかどうか判定入れる
   const appendeddata = [...notelist,JSON.parse(msg["data"])];
   appendeddata.reverse();
   console.log(appendeddata);
   notelistwrite(appendeddata); 
    //タイムラグが有り一個遅れで出るのかも
  }}
  onError={ err => {alert(err["message"])}}
  onClose={ msg => {alert(msg)}}
  reconnect
  // Will try to reconnect
  />
  )

}}
  </WSurl.Consumer>
      )
  }

export default ReturnWS;