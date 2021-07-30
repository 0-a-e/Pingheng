import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text } from 'react-native';
import getMeta from '../../../data/Getmeta';

const Picker = () => {
    const [meta, metawrite] = useState();
    useEffect(() => {
        let unmounted = false;
	    (async() => {const res = await getMeta(false); if(!unmounted){metawrite(res);}})();
            return ()=>{ unmounted = true; };
    },[]);

        const py =(meta) => {
            return(meta.emojis.map(data => { 
                return (<TouchableOpacity style={{backgroundColor:"red",width:60,height:60}} key={data.id} onPress={() => alert('Hello')}>
                    <Image source={{uri:data.url}}  style={{ width: 60, height: 60 }}/>
                    </TouchableOpacity>)
            }))
        }
    return (
        <>
        { (meta) ?  py(meta): <Text>お待ちください...</Text>}
        </>
    );
};
export default Picker;