import { ButtonGroup } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import WSobj from '../../Variable/WSobj';
import NoteList from '../../Variable/NoteList';
import timelinebuttonelem from './timelinebuttonelem';
import changetimeline from '../../data/changetimeline';
import useSwitchTL from './useSwitchTL';

const SwitchTimeline = (Props: {Mtoken:string}) => {
    const {ws,wswrite} = useContext(WSobj);
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);
    const {notelist, notelistwrite} = useContext(NoteList);
    const {convert,reconvert} = useSwitchTL();

  const returnbutton = () => {
    return ( 
      <ButtonGroup
        onPress={val => {changetimeline(val,timelinestate,timelinestatewrite,Props["Mtoken"],notelist,notelistwrite)}}
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