import { sendAPI } from '../data/useAPI';
import {toendpoint} from '../components/bottomsheet/useSwitchtltranslator';

async function addoldnote(Mtoken: string,rawtltype: string,notelist: any,notelistwrite: any) {
    // const tltype = toendpoint(rawtltype);
    const payload = {
        "limit":25
    };
    console.log("--");
    console.log(Mtoken);
    console.log(rawtltype);
    console.log("--");
/* 
    sendAPI([Mtoken,"notes/" +  tltype,payload]).then(data => {
    if(data){
      notelistwrite(data); 
    } else {
      console.log("nodata");
    }
    });*/
    
}

export default addoldnote;