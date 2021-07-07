import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState,useContext } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import useSwitchTL from './useSwitchTL';
import WSobj from '../../Variable/WSobj';
import useOldNote from '../../data/useOldNote';
import NoteList from '../../Variable/NoteList';


const {convert,reconvert} = useSwitchTL();

const SwitchTimeline = (Props: {Mtoken:string}) => {
    const {ws,wswrite} = useContext(WSobj);
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);
    const {notelist, notelistwrite} = useContext(NoteList);
    const local = () => <Icon name="box" size={45} color={timelinestate === "localTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const home = () => <Icon name="home" size={45} color={timelinestate === "homeTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const global= () => <Icon name="globe" size={45} color={timelinestate === "globalTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const hybrid= () => <Icon name="shuffle" size={45} color={timelinestate === "hybridTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const switchtimelinebutton = [{"element":local},{"element":home},{"element":global},{"element":hybrid}];

const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any) => {
    const convertedval = convert(val);
    timelinestatewrite(convertedval);
    //TL切り替え完成　2021/5/2/22:50
    useOldNote(Props["Mtoken"],convertedval,notelist,notelistwrite);
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
    
return ( 
    <ButtonGroup
onPress={val => {changetimeline(val,timelinestate,timelinestatewrite)}}
selectedIndex={reconvert(timelinestate)}
buttons={switchtimelinebutton}
innerBorderStyle={{width:0}}
containerStyle={{backgroundColor: "rgb(30,30,46)",height: 100,borderRadius:50,borderWidth:0,position:"relative",marginTop:80}}
buttonStyle={{borderWidth:0}}
 />
);
};

export default SwitchTimeline;