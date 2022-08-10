import {ButtonGroup} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import timelinebuttonelem from './timelinebuttonelem';
//import changetimeline from '../../data/changetimeline';
import {reconvert, convert} from './useSwitchtltranslator';

const SwitchTimeline = (Props: {Mtoken: string; bottomsheetref: any}) => {
  const {timelinestate, timelinestatewrite} = useContext(TimelineStateContext);

  const returnbutton = () => {
    return (
      <ButtonGroup
        onPress={val => {
          timelinestatewrite(convert(val));
          Props['bottomsheetref'].current.snapTo(1);
        }}
        selectedIndex={reconvert(timelinestate)}
        buttons={timelinebuttonelem(timelinestate)}
        innerBorderStyle={{width: 0}}
        selectedButtonStyle={{backgroundColor: 'rgba(10,10,40,0.5)'}}
        containerStyle={{
          backgroundColor: 'rgb(30,30,46)',
          height: 100,
          borderRadius: 50,
          borderWidth: 0,
          position: 'relative',
          marginTop: 80,
        }}
        buttonStyle={{borderWidth: 0}}
      />
    );
  };

  return returnbutton();
};

export default SwitchTimeline;
