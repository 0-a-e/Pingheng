import { ButtonGroup } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import NoteList from '../../Variable/NoteList';
import timelinebuttonelem from './timelinebuttonelem';
//import changetimeline from '../../data/changetimeline';
import { reconvert } from './useSwitchtltranslator';
import { useWS } from '../../Variable/wshook';

const SwitchTimeline = (Props: {Mtoken:string,bottomsheetref: any}) => {
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);
    const {notelist, notelistwrite} = useContext(NoteList);
  //  const {changetimeline,CWS} = useWS();
    
  const returnbutton = () => {
    return ( 
      <ButtonGroup
        onPress={val => {
          //changetimeline(val,timelinestatewrite,notelist,notelistwrite);
          Props["bottomsheetref"].current.snapTo(1);
        }}
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