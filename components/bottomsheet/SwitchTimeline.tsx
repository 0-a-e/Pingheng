import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState,useContext } from 'react';
import TimelineStateContext from '../../Variable/TimelineState';
import useSwitchTL from './useSwitchTL';
import WSobj from '../../Variable/WSobj';

const {convert,reconvert} = useSwitchTL();

const SwitchTimeline = () => {
    const {ws,wswrite} = useContext(WSobj);
    const {timelinestate,timelinestatewrite} = useContext(TimelineStateContext);

    const local = () => <Icon name="box" size={45} color={timelinestate === "localTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const home = () => <Icon name="home" size={45} color={timelinestate === "homeTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const global= () => <Icon name="globe" size={45} color={timelinestate === "globalTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const hybrid= () => <Icon name="shuffle" size={45} color={timelinestate === "hybridTimeline" ? '#fff' : 'rgb(180,180,230)'} />
    const switchtimelinebutton = [{"element":local},{"element":home},{"element":global},{"element":hybrid}];

const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any) => {
    timelinestatewrite(convert(val));
    //TL切り替え完成　2021/5/2/22:50
    ws.send(JSON.stringify({
        "type": "disconnect",
        "body": {
        "id": "timeline",
           }
         }));

    ws.send(JSON.stringify({
        "type": "connect",
        "body": {
        "channel": convert(val),
        "id": "timeline",
        "params": {}
           }
         }));
};
    
return ( 
    <ButtonGroup
onPress={val => {changetimeline(val,timelinestate,timelinestatewrite)}}
selectedIndex={reconvert(timelinestate)}
buttons={switchtimelinebutton}
innerBorderStyle={{width:0}}
containerStyle={{height: 100,borderRadius:50,borderWidth:0}}
buttonStyle={{backgroundColor: "rgb(30,30,46)",borderWidth:0}}
 />
);
};

export default SwitchTimeline;