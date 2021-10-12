import { useCallback, useState } from "react";
import { toendpoint } from "../components/bottomsheet/useSwitchtltranslator";
import { sendAPI } from "../data/useAPI";

export const usenotelist = () => {
    const [notelist, setnotelist] = useState([]);

   /*  const countUp = useCallback(() => {
      setCount((prev) => prev + 1);
    }, []); */
    const returnnotelist = () => {
        return (
            notelist
        )
    }

    const addoldnote = async (Mtoken: string,rawtltype: string) => {
        const tltype = toendpoint(rawtltype);
        const payload = {
           "limit":25
        };
        sendAPI([Mtoken,"notes/" +  tltype,payload]).then(data => {
            if(data){
                setnotelist(data); 
            } else {
                console.log("nodata");
            }
        });
   
    }

    return [returnnotelist,addoldnote];
  };