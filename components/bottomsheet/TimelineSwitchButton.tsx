import { ButtonGroup } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import WSobj from '../../Variable/WSobj';
import NoteList from '../../Variable/NoteList';
import timelinebuttonelem from './timelinebuttonelem';
import changetimeline from '../../data/changetimeline';
import { reconvert } from './useSwitchtltranslator';

const SwitchTimeline = (Props: {Mtoken:string,bottomsheetref: any}) => {
    const {ws,wswrite} = useContext(WSobj);
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);
    const {notelist, notelistwrite} = useContext(NoteList);

  const returnbutton = () => {
    return ( 
      <ButtonGroup
        onPress={val => {changetimeline(val,timelinestate,timelinestatewrite,Props["Mtoken"],notelist,notelistwrite);switchws();Props["bottomsheetref"].current.snapTo(1);}}
        selectedIndex={reconvert(timelinestate)}
        buttons={timelinebuttonelem(timelinestate)}
        innerBorderStyle={{width:0}}
        selectedButtonStyle={{backgroundColor:"rgba(10,10,40,0.5)"}}
        containerStyle={{backgroundColor: "rgb(30,30,46)",height: 100,borderRadius:50,borderWidth:0,position:"relative",marginTop:80}}
        buttonStyle={{borderWidth:0}}
      />
    );
  }

  const switchws = () => {
    try{
      console.log("--");
      console.log(timelinestate);
      console.log("--");
     ws.send(JSON.stringify({
        "type": "disconnect",
        "body": {
          "id": "timeline",
        }
      })); 
      ws.send(JSON.stringify({
      "type": "connect",
      "body": {
      "channel": timelinestate,
      "id": "timeline",
      "params": {}
         }
       }));
     }catch(ee){
      console.log(ee);
      alert("タイムライン切り替えエラー");
     }
  }
  return returnbutton();
};

export default SwitchTimeline;