import React, { useContext } from 'react';
import axios from 'axios';




export const sendAPI = async ([Mtoken,endpoint,data]:[String,String,Object]) => {
     const response = await axios.post("https://msk.seppuku.club/api/" + endpoint,{"i":Mtoken, ...data});
     if(response.status == 200){
        return response.data;
      } else {
        return false;
      }
    }
