import React, { useState, Suspense, useEffect } from 'react';
import TimelineStateContext from '../Variable/TimelineState';
import { View,Text } from 'react-native';
import disconnect from './FILE/disconnect';
import connect from './FILE/connect';
import ReturnWS from './FILE/ReturnWS';
import WSurl from '../Variable/WSurl';


const StreamWebSocket = () => {
  //timelinestateがうまく機能 してないぽい
const [wsurl,wsurlwrite] = useState("wss://example.com");

 return(
   <TimelineStateContext.Consumer>
  {(value) => {
    //切断はしなくても切り替わる？
      const timelinestate = value;
      console.log(timelinestate["timelinestate"]);
  //    const tlstate = switchTL(timelinestateval);
//valueが変わるたび更新
 
    //try-catchは初回用
 //   try{
 //     disconnect(ws);
 //     switchTL(timelinestate,ws);
//    } catch(ee) {
//      console.log(ee);
//      console.log("初回接続");
    //  return connect(token,wswrite,notelist,notelistwrite,WS);
//      switchTL(timelinestate,ws);
return(
<WSurl.Provider value ={{ wsurl,wsurlwrite }}>
<Suspense fallback={<Text>Loading...</Text>}>
<ReturnWS />
</Suspense>
</WSurl.Provider>
);

    }
}
</TimelineStateContext.Consumer>
) //return
}

export default StreamWebSocket;