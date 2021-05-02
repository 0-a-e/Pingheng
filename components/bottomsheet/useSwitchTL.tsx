import React, { useContext, useEffect } from 'react';
const switchTL = () => {
//切り分けと接続だけ
//切断はしない
/*
const switchtlfunc = (val: string) => {
    try{
      console.log("--");
      console.log(val);
      console.log("--");
      useSend({
      "type": "connect",
      "body": {
      "channel": val,
      "id": "timeline",
      "params": {}
         }
       });
     }catch(ee){
      console.log(ee);
      alert("タイムライン切り替えエラー");
     }
   }
*/

const reconvert = (tlstate: any) => {
  switch (tlstate) {
      case "localTimeline":
        return 0;
      case "homeTimeline":
        return 1;
      case "globalTimeline":
       return 2;
      case "hybridTimeline":
      return 3;
      default:
        alert(`該当する再変換タイムラインインデックスがありません`);
    }
    }
  
const convert = (tlstate: any) => {
    switch (tlstate) {
        case 0:
          return "localTimeline";
        case 1:
          return "homeTimeline";
        case 2:
         return "globalTimeline";
        case 3:
        return "hybridTimeline";
        default:
          alert(`該当するタイムラインインデックスがありません`);
      }
      }
    
return {"convert":convert,"reconvert":reconvert}
}
export default switchTL;