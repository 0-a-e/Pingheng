import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity,Image,Text, View, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import getMeta from '../../../data/Getmeta';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { FlatList } from 'react-native-gesture-handler';

const Picker = (props) => {
    const [meta, metawrite] = useState();
    const [emojis, emojiswrite] = useState();

    if(emojis){
     //   emojiswrite(null);

    } else {
     
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
    const Emojislist = (props) => {
        const emojis = props.emojis;
        const [waru60use, waru60write] = useState(0);
        const [sidepaddingwidthuse,sidepaddingwidthwrite] = useState(0);
        console.log("rerender");
        if(waru60use == 0 && sidepaddingwidthuse == 0){
            //メモ　消さない
            // widthはディスプレイ幅の90%(枠内)
            //waru60はwidthを60(55 + 両サイド2.5x2の5を足してる)pxで割っていくつ横に並べるか計算したやつを小数点切り捨ててる(四捨五入ではなく切り捨て）
            //sidepaddingwidthはwidthから絵文字の幅(waru60 * 60)を引いて割る2で両サイドのpadding
            const width = (Dimensions.get('window').width / 10) * 9;
            const waru60 = Math.floor(width/60); 
            const sidepaddingwidth = (width - (waru60 * 60)) / 2;
            waru60write(waru60);
            sidepaddingwidthwrite(sidepaddingwidth);
        }
        const keyExtractor = useCallback((item, index) => index.toString(),[]);
        const renderItem = useCallback((data:{item:{name:string,url:string}}) => {
                const item = data.item;
                return(
                    <TouchableOpacity style={{width:55,height:55,borderRadius:15,marginLeft:2.5,marginBottom:2.5,marginTop:2.5,marginRight:2.5,backgroundColor:""}} onPress={() => props.addreaction(":" + item.name + ":")}>
                        <FastImage style={{width:55,height:55}} source={{uri:item.url}} />
                    </TouchableOpacity>
                )
            },[]);
        const getItemLayout = useCallback((data, index) => ({length: 60,offset: 60 * index,index,}),[]);
        return(
            <FlatList
                style={{backgroundColor:'',marginLeft:sidepaddingwidthuse,marginRight:sidepaddingwidthuse,height:240}}
                data={emojis}
                numColumns={waru60use}
                key={waru60use}
                renderItem={renderItem}
                maxToRenderPerBatch={7}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
            />
        )
    }

    useEffect(() => {
        let unmounted = false;
	    (
            async() => {
                if(!emojis){
                    const res = await getMeta();
                    if(!unmounted){
                        metawrite(res);
                        emojiswrite(res["emojis"]);
                    }
                }
            }
        )
        ();
        return ()=>{ unmounted = true; };
    },[]);

    return (
            <View style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginBottom:150,backgroundColor:"#282a36",alignItems:"center",marginTop:20,borderRadius:20,paddingBottom:10}}>
                <Input
                    inputContainerStyle={{borderBottomWidth: 0, borderRadius:50,padding:10,marginTop:10,backgroundColor:"#1b1d26"}}
                    style = {{color:"rgb(240,240,240)",width:"100%"}}
                    placeholder='絵文字を検索...'
                    onChangeText={value => searchfunc(value)}
                />
                { emojis ? 
                <View
               style={{width:"100%",marginTop:-15}}
                >
                    <Emojislist emojis={emojis}/>
                </View>
                : <View style={{width: '100%', alignItems: 'center',height:240 }}>
                        <Progress.Bar indeterminate={true} width={null} useNativeDriver={true} style={{width:"100%"}} borderRadius={0} borderWidth={0}/>
                        <Text style={{color:"rgb(240,240,240)",marginTop:10}}>読み込み中...</Text>
                  </View>
                }
            </View>
    );
};

  //<View style={{height:250,width:"100%",backgroundColor:"red"}}></View>

export default Picker;