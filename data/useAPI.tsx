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
     if(response.status == 200){
        return response.data;
      } else {
        return false;
      }
    }
