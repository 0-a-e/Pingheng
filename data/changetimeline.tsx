import React from 'react';
import useSwitchTL from '../components/bottomsheet/useSwitchTL';
import useOldNote from '../data/useOldNote';

const {convert,reconvert} = useSwitchTL();

const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any,Mtokenlocal:string,notelist,notelistwrite) => {

    //TL切り替え完成　2021/5/2/22:50
    const convertedval = convert(val);
    timelinestatewrite(convertedval);
    useOldNote(Mtokenlocal,convertedval,notelist,notelistwrite);
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

export default changetimeline;