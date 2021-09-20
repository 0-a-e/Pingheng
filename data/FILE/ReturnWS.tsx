import React,{useContext,useState,useEffect} from 'react';
import NoteList from '../../Variable/NoteList';
import WS from 'react-native-websocket';
import WSurl from '../../Variable/WSurl';
import WSobj from '../../Variable/WSobj';
import { getserverURL } from '../../data/Getmeta';
import gettoken from './gettoken';

const ReturnWS = () => {

    const {notelist, notelistwrite} = useContext(NoteList);
    const {wsurl,wsurlwrite} = useContext(WSurl);
    const {ws,wswrite} = useContext(WSobj);
    useEffect(() => {
      const d = async () => {
          const svurl = await getserverURL().then(res => {return res.replace('https://','').replace('http://','');});
          const Mtoken = await gettoken();
          const urle  = "wss://" + svurl +"/streaming?i=" + Mtoken;
          wsurlwrite(urle);
          return urle;
        };
      d();
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
        //あとでノートかどうか判定入れる
   const data = JSON.parse(msg["data"])["body"]["body"];
   console.log(data);
   const appendeddata = [...notelist].unshift(data);
   console.log(appendeddata);
   //appendeddata.reverse();
  // console.log(appendeddata);
   notelistwrite(appendeddata); 
    //タイムラグがあって一個遅れで出るのかも
  }}
  //一回エラーメッセージ出して切断するようにする
  onError={ (err: { [x: string]: any; }) =>  {
    console.log(err["message"])
  }
}
  onClose={ msg => {console.log(msg)}}
  reconnect
  />
  )

}}
  </WSurl.Consumer>
      )
  }

export default ReturnWS;