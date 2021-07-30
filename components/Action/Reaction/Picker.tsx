import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text, View, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
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
        <View style={{width:"100%",alignItems: 'center',borderRadius:20,marginTop:20}}>
        <View style={{width:"90%",backgroundColor:"#282a36",borderRadius:20}}>
        <Input
            inputContainerStyle={{borderBottomWidth: 0, borderRadius:50,padding:10,marginTop:10,backgroundColor:"#1b1d26"}}
            style = {{color:"rgb(240,240,240)",width:"100%"}}
                placeholder='絵文字を検索...'
        />
        <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'space-between',paddingLeft:10,paddingRight:10,borderRadius:20,}} style={{width:"100%",marginTop:-15}}>
        { (meta) ?  py(meta): <Text>お待ちください...</Text>}
        </ScrollView>
        </View>
        </View>
    );
};
export default Picker;