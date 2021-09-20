import React, { useState, Suspense } from 'react';
import TimelineStateContext from '../Variable/TimelineState';
import { Text } from 'react-native';
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