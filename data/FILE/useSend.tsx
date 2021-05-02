import React, { useContext } from 'react';
import WSobj from '../../Variable/WSobj';
import { useState } from 'react';

/* 
export const send = (json) => {
   // ws.send(JSON.stringify(json));
}
*/
const send = () => {
  const wssend = (json:any) => {
  
  return wswrite;
   /*  ws.send(JSON.stringify(json));*/
  };
  return { wssend };
 // console.log("json");
};
export default send;