import React,{useContext,useState,useEffect} from 'react';
import NoteList from '../../Variable/NoteList';
import WS from 'react-native-websocket';
import WSobj from '../../Variable/WSobj';
import { getserverURL } from '../../data/Getmeta';
import gettoken from './gettoken';

const ReturnWS = () => {
    const {ws,wswrite} = useContext(WSobj);
    const {notelist, notelistwrite} = useContext(NoteList);
    const [wsurl, setwsurl] = useState("");
    useEffect(() => {
      const d = async () => {
          const svurl = await getserverURL().then(res => {return res.replace('https://','').replace('http://','');});
          const Mtoken = await gettoken();
          setwsurl("wss://" + svurl +"/streaming?i=" + Mtoken);
        };
      d();
      },[wsurl]);

if(wsurl){
    return(
        <WS
          ref={ref => {wswrite(ref);console.log("wswrite");}}
          url={wsurl}
          onOpen={() => {
            console.log('Open!');
           }}
          onMessage={(msg: { [x: string]: any; }) => {
            //あとでノートかどうか判定入れる  
            const data = JSON.parse(msg["data"])["body"]["body"];
            console.log(data);
           // const appendeddata = [...notelist].unshift(data);
        //    console.log(appendeddata);
            //appendeddata.reverse();
            // console.log(appendeddata);
          //  notelistwrite(appendeddata); 
            //タイムラグがあって一個遅れで出るのかも
          }}
          //一回エラーメッセージ出して切断するようにする
          onError={(err: { [x: string]: any; }) =>  {
             console.log(err["message"])
            }
          }
          onClose={ msg => {console.log(msg)}}
          reconnect
        />
    );
} else {
  return(<></>);
}
  }

export default ReturnWS;