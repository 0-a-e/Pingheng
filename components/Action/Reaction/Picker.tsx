import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text, View, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import getMeta from '../../../data/Getmeta';

const Picker = (props) => {
    const [meta, metawrite] = useState();
    const [emojis, emojiswrite] = useState();
    
    const searchfunc = (search) => {
            const filterItems= (arr, query) => {
            return arr.filter(function (el) {
              return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            })
        }
            const raw = meta.emojis;
            emojiswrite(filterItems(raw, search));
          
    }

    useEffect(() => {
        let unmounted = false;
	    (async() => {const res = await getMeta(false); if(!unmounted){metawrite(res);emojiswrite(res["emojis"]);}})();
            return ()=>{ unmounted = true; };
    },[]);
        const py =(emojis) => {
            return(emojis.map(data => { 
                return (<TouchableOpacity style={{width:55,height:55,borderRadius:15}} key={data.id} onPress={() => props.addreaction(":" + data.name + ":")}>
                    <Image source={{uri:data.url}}  style={{ width: 55, height: 55 }}/>
                    </TouchableOpacity>)
            }))
        }
    return (
        <View style={{width:"100%",height:250,marginBottom:150,alignItems: 'center',borderRadius:20,marginTop:20}}>
            <View style={{width:"90%",backgroundColor:"#282a36",borderRadius:20,paddingBottom:10}}>
                <Input
                    inputContainerStyle={{borderBottomWidth: 0, borderRadius:50,padding:10,marginTop:10,backgroundColor:"#1b1d26"}}
                    style = {{color:"rgb(240,240,240)",width:"100%"}}
                    placeholder='絵文字を検索...'
                    onChangeText={value => searchfunc(value)}
                />
                <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'space-between',paddingLeft:10,paddingRight:10,borderRadius:20,}} style={{width:"100%",marginTop:-15}}>
                    { (emojis) ?  py(emojis): <Text>お待ちください...</Text>}
                </ScrollView>
            </View>
        </View>
    );
};
export default Picker;