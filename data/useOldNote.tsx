import { sendAPI } from '../data/useAPI';
import useSwitchTL from '../components/bottomsheet/useSwitchTL';

async function addoldnote(Mtoken: string,rawtltype: string,notelist: any,notelistwrite: any) {
    const tltype = useSwitchTL()["toendpoint"](rawtltype);
    const payload = {
        "limit":25
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