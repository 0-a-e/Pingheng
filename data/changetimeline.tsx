/*import React, { useContext } from 'react';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import useOldNote from '../data/useOldNote';
import { useWS } from '../Variable/wshook';
*/

//const {websocket,Setwebsocket,changetimeline,CWS} = useWS();

const changetimeline = (val: any,timelinestatewrite: any,Mtokenlocal:string,notelist,notelistwrite) => {
    //TL切り替え完成　2021/5/2/22:50
  //  const convertedval = convert(val);
 //   timelinestatewrite(convertedval);
   /*  changestatus({
            "type": "disconnect",
            "body": {
              "id": "timeline",
            }
          });
    changestatus({
        "type": "connect",
        "body": {
            "channel": convertedval,
            "id": "timeline",
            "params": {}
           }
     }); */
 //   useOldNote(Mtokenlocal,convertedval,notelist,notelistwrite);
};

export default changetimeline;