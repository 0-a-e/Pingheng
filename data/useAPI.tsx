import React, { useContext } from 'react';
import axios from 'axios';




export const sendAPI = async ([Mtoken,endpoint,data]:[String,String,Object]) => {
     const response = await axios.post("https://msk.seppuku.club/api/" + endpoint,{"i":Mtoken, ...data});
     console.log(response.status);
     if(response.status == 200){
        return true;
      } else {
        return false;
      }
    }
    //  const arrayPost = response.data;
    //  console.log(arrayPost);

//だめ
