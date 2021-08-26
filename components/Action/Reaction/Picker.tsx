import React, { useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text, View, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import getMeta from '../../../data/Getmeta';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

const Picker = (props) => {
    const [meta, metawrite] = useState();
    const [emojis, emojiswrite] = useState();
    console.log("loaded");
    if(emojis){
     //   emojiswrite(null);
        console.log("emoji found!");
    } else {
        console.log("emoji notfound");
    }

    const searchfunc = (search) => {
            const filterItems= (arr, query) => {
            return arr.filter(function (el) {
              return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            })
        }
            const raw = meta.emojis;
            emojiswrite(filterItems(raw, search));
          
    }

    const py = (emojis) => {
        return(emojis.map(data => { 
            return (
                <TouchableOpacity style={{width:55,height:55,borderRadius:15}} key={data.id} onPress={() => props.addreaction(":" + data.name + ":")}>
                    <FastImage style={{width:55,height:55}} source={{uri:data["url"]}} />
                </TouchableOpacity>
                )
        }))
    }

    useEffect(() => {
        let unmounted = false;
	    (
            async() => {
                if(!emojis){
                    const res = await getMeta(false);
                    if(!unmounted){
                        metawrite(res);
                        emojiswrite(res["emojis"]);
                        console.log("getmeta");
                    }
                } else {
                    console.log("already");
                }
            }
        )
        ();
        return ()=>{ unmounted = true; };
    },[]);

    return (
        <View style={{width:"100%",height:250,marginBottom:150,alignItems: 'center',borderRadius:20,marginTop:20}}>
            <View style={{width:"90%",backgroundColor:"#282a36",borderRadius:20,paddingBottom:10}}>
                <Input
                    inputContainerStyle={{borderBottomWidth: 0, borderRadius:50,padding:10,marginTop:10,backgroundColor:"#1b1d26"}}
                    style = {{color:"rgb(240,240,240)",width:"100%"}}
                    placeholder='絵文字を検索...'
                    onChangeText={value => searchfunc(value)}
                />
                { emojis ? 
                <ScrollView
                contentContainerStyle={{flexDirection:'row',flexWrap: 'wrap',justifyContent:'space-between',paddingLeft:10,paddingRight:10,borderRadius:20,}}
                style={{width:"100%",marginTop:-15}}
                >
                    {py(emojis)}
                  
                </ScrollView>
                : <View style={{width: '100%', alignItems: 'center',height:240 }}>
                        <Progress.Bar indeterminate={true} width={null} useNativeDriver={true} style={{width:"100%"}} borderRadius={0} borderWidth={0}/>
                        <Text style={{color:"rgb(240,240,240)",marginTop:10}}>読み込み中...</Text>
                  </View>
                }
            </View>
        </View>
    );
};

  //<View style={{height:250,width:"100%",backgroundColor:"red"}}></View>

export default Picker;