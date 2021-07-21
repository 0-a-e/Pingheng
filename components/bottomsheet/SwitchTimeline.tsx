import { ButtonGroup } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import useSwitchTL from './useSwitchTL';
import WSobj from '../../Variable/WSobj';
import useOldNote from '../../data/useOldNote';
import NoteList from '../../Variable/NoteList';
import timelinebuttonelem from './timelinebuttonelem';

const {convert,reconvert} = useSwitchTL();


const SwitchTimeline = (Props: {Mtoken:string}) => {
    console.log("refreshed");
    const {ws,wswrite} = useContext(WSobj);
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);
    const {notelist, notelistwrite} = useContext(NoteList);

    const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any) => {
      //TL切り替え完成　2021/5/2/22:50
      const convertedval = convert(val);
      useOldNote(Props["Mtoken"],convertedval,notelist,notelistwrite);
      timelinestatewrite(convertedval);
    /*   ws.send(JSON.stringify({
          "type": "disconnect",
          "body": {
          "id": "timeline",
             }
           }));
    
      ws.send(JSON.stringify({
          "type": "connect",
          "body": {
          "channel": convertedval,
          "id": "timeline",
          "params": {}
             }
           }));*/
    };

  const returnbutton = () => {

    return ( 
      <ButtonGroup
        onPress={val => {changetimeline(val,timelinestate,timelinestatewrite)}}
        selectedIndex={reconvert(timelinestate)}
        buttons={timelinebuttonelem(timelinestate)}
        innerBorderStyle={{width:0}}
        selectedButtonStyle={{backgroundColor:"rgba(10,10,40,0.5)"}}
        containerStyle={{backgroundColor: "rgb(30,30,46)",height: 100,borderRadius:50,borderWidth:0,position:"relative",marginTop:80}}
        buttonStyle={{borderWidth:0}}
      />
    );
  }
  return returnbutton();
};

export default SwitchTimeline;