import React, { useState, Suspense } from 'react';
import TimelineStateContext from '../Variable/TimelineState';
import { Text } from 'react-native';
import ReturnWS from './FILE/ReturnWS';


const StreamWebSocket = () => {
  //timelinestateがうまく機能 してないぽい

 return(
   <TimelineStateContext.Consumer>
  {(value) => {
    //切断はしなくても切り替わる？
      const timelinestate = value;
      console.log(timelinestate["timelinestate"]);
      return(
          <Suspense fallback={<Text>Loading...</Text>}>
            <ReturnWS />
          </Suspense>
      );

    }
}
</TimelineStateContext.Consumer>
) //return
}

export default StreamWebSocket;