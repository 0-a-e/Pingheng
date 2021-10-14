import { useCallback, useState } from "react";
import { toendpoint } from "../components/bottomsheet/useSwitchtltranslator";
import { sendAPI } from "../data/useAPI";

export const usenotelist = () => {
    const [notelist, setnotelist] = useState([]);
    
    const returnnotelist = useCallback(() => {
        return (
            notelist
        )
    }, [notelist]);

    const addoldnote = useCallback(async (Mtoken: string, rawtltype: string) => {
        const tltype = toendpoint(rawtltype);
        const payload = {
            "limit": 25
        };
       sendAPI([Mtoken, "notes/" + tltype, payload]).then(data => {
            if (data) {
              //  setnotelist(data);
              console.log("addoldnote length: ",data.length);
            } else {
                console.log("nodata");
            }
        });

    },[]);

    const addnote = useCallback((data) => {
        const note = JSON.parse(JSON.stringify(data));
        console.log(note);
        const appendeddata = [data,...notelist];
        console.log(appendeddata);
        //appendeddata.reverse();
        // console.log(appendeddata);
        setnotelist(appendeddata);
     },[]); 

    return {returnnotelist,notelist,addoldnote,addnote};
  };