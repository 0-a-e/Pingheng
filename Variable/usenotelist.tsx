import { useCallback, useState } from "react";
import { toendpoint } from "../components/bottomsheet/useSwitchtltranslator";
import { sendAPI } from "../data/useAPI";

export const usenotelist = (notelist,setnotelist) => {

    const addoldnote = useCallback(async (Mtoken: string, rawtltype: string) => {
        const tltype = toendpoint(rawtltype);
        const payload = {
            "limit": 25
        };
       sendAPI([Mtoken, "notes/" + tltype, payload]).then(data => {
            if (data) {
              setnotelist(data);
              console.log("addoldnote length: ",data.length);
            } else {
                console.log("nodata");
            }
        });
    },[]);

    const addnote = (data) => {
        setnotelist(notelist => {
            const note = JSON.parse(JSON.stringify(data));
            const appendeddata = [note,...notelist];
            return appendeddata;
        });
     };

    return {addoldnote,addnote};
  };