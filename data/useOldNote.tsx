import { sendAPI } from '../data/useAPI';
import useSwitchTL from '../components/bottomsheet/useSwitchTL';

async function addoldnote(Mtoken: string,rawtltype: string,notelist: any,notelistwrite: any) {
    const tltype = useSwitchTL()["toendpoint"](rawtltype);
    console.log("=====");
    console.log(Mtoken);
    console.log(tltype);
    console.log(notelist);
    console.log(notelistwrite);
    console.log("=====");
    const payload = {
        "limit":100
    };
    sendAPI([Mtoken,"notes/" +  tltype,payload]).then(data => {
    if(data){
      notelistwrite(data); 
    } else {
      console.log("nodata");
    }
    });
}

export default addoldnote