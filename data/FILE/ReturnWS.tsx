import React,{useContext,useState,useEffect} from 'react';
import NoteList from '../../Variable/NoteList';
import WS from 'react-native-websocket';
import WSurl from '../../Variable/WSurl';
import WSobj from '../../Variable/WSobj';
import Mtokenvar from '../../Variable/Mtoken';
import { getserverURL } from '../../data/Getmeta';

const ReturnWS = () => {

    const {notelist, notelistwrite} = useContext(NoteList);
    const {wsurl,wsurlwrite} = useContext(WSurl);
    const {ws,wswrite} = useContext(WSobj);
    const {Mtoken,Mtokenwrite} = useContext(Mtokenvar);
    //    wsurl = gettingtoken;
    useEffect(() => {
      const getstreamURL = async () => {
        await getserverURL();
        return "wss://msk.seppuku.club/streaming?i=" + Mtoken.toString();
      }
      const url = getstreamURL();
      console.log(url);
      wsurlwrite(url);
    },[]);

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
   console.log(msg["data"]["body"]["body"]);
    //ノートかどうか判定入れる
   const appendeddata = [...notelist,JSON.parse(msg["data"]["body"]["body"])];
   appendeddata.reverse();
  // console.log(appendeddata);
   notelistwrite(appendeddata); 
    //タイムラグが有り一個遅れで出るのかも
  }}
  //一回エラーメッセージ出して切断するようにする
  onError={ (err: { [x: string]: any; }) =>  {
    console.log(err["message"])
  }
}
  onClose={ msg => {console.log(msg)}}
  reconnect
  // Will try to reconnect
  />

  )

}}
  </WSurl.Consumer>
      )
  }

export default ReturnWS;