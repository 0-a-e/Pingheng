import React, { useContext } from 'react';
import axios from 'axios';

export const sendAPI = async ([Mtoken,endpoint,data]:[String,String,Object]) => {
  
  const getjsondata = () => {
    if(Mtoken && Mtoken != ""){
      return ({"i":Mtoken, ...data});
    } else {
      return data;
    }  
  }
  const datajson = getjsondata();
     const response = await axios.post("https://msk.seppuku.club/api/" + endpoint,datajson);
     if(response.status == 200 || response.status == 201 || response.status == 204){
        if(response.data){
          return response.data;
        } else {
          return true;
        }
      } else {
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.data);
        return false;
      }
    }
