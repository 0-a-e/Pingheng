import React, { useContext } from 'react';
import { convert } from '../components/bottomsheet/useSwitchtltranslator';
import useOldNote from '../data/useOldNote';


const changetimeline = (val: any,timelinestate: any,timelinestatewrite: any,Mtokenlocal:string,notelist,notelistwrite) => {

    //TL切り替え完成　2021/5/2/22:50
    const convertedval = convert(val);
  //  const {ws,wswrite} = useContext(WSobj);

    timelinestatewrite(convertedval);
    useOldNote(Mtokenlocal,convertedval,notelist,notelistwrite);
};

export default changetimeline;