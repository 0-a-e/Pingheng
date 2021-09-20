import React, { useContext } from 'react';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import useOldNote from '../data/useOldNote';
import WSobj from '../Variable/WSobj';


const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any,Mtokenlocal:string,notelist,notelistwrite) => {

    //TL切り替え完成　2021/5/2/22:50
    const convertedval = convert(val);
 //   const {ws,wswrite} = useContext(WSobj);
  // console.log(ws);
    /* try{
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
     }*/
    timelinestatewrite(convertedval);
    useOldNote(Mtokenlocal,convertedval,notelist,notelistwrite);
};

export default changetimeline;