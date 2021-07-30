import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text, View, ScrollView } from 'react-native';
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
                return (<TouchableOpacity style={{width:55,height:55,borderRadius:15}} key={data.id} onPress={() => alert('Hello')}>
                    <Image source={{uri:data.url}}  style={{ width: 55, height: 55 }}/>
                    </TouchableOpacity>)
            }))
        }
    return (
        <View style={{width:"100%",alignItems: 'center'}}>
        <ScrollView  contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'space-between',paddingLeft:10,paddingRight:10,borderRadius:20,}} style={{borderRadius:20,width:"90%",backgroundColor:"#282a36"}}>
        { (meta) ?  py(meta): <Text>お待ちください...</Text>}
        </ScrollView>
        </View>
    );
};
export default Picker;