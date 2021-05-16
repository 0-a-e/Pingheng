import React, { useContext } from 'react';
import { sendAPI } from '../data/useAPI';
import useSwitchTL from '../components/bottomsheet/useSwitchTL';

const addoldnote = (Mtoken: string,rawtltype: string) => {
//console.log(Mtoken,tltype);
const tltype = useSwitchTL()["toendpoint"](rawtltype);
console.log(tltype);
const payload = {
    "limit":100
};
const data = sendAPI([Mtoken,"notes/" +  tltype,payload]);
//asyncにあとで
console.log("**");
console.log(data);
console.log("**");
}

export default addoldnote