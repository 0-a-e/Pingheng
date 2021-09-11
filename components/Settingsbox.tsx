import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logout from '../data/logout';
import getMeta,{setnewMeta,getserverURL} from '../data/Getmeta';

const Settingsbox = () => {
	const [meta, metawrite] = useState();
	useEffect(() => {
	getMeta().then(metaraw => {
		metawrite(metaraw);
	});
	}, []);

const lgout = () => {
    logout();
};
const openlink = (url:string) => {
    WebBrowser.openBrowserAsync(url);
}
const setnewEmoji = async () => {
	const svurl = await getserverURL();
	setnewMeta(svurl);
	ToastAndroid.show("情報が更新されました。このまま使用することもできますが、更新を完全に適用するにはアプリの再起動が必要です。",4000);
}
    return(
		<View style={{width:"100%",height:"100%",backgroundColor:"rgb(19,20,26)"}}>
			
			<View style={{width:"100%",backgroundColor:"rgb(19,20,26)",alignItems:"center",marginBottom:20,marginTop:10}}>
				<View style={{height:150,width:150,backgroundColor:"red"}}></View>
				<Text style={{color:"#fff",fontSize:20,marginTop:5}}>1.0.0</Text>
			</View>

		<View style={{width:"100%",flexDirection: 'row',alignContent:"center",justifyContent:"center"}}>
			 <TouchableOpacity
            	style={{width:'45%',borderBottomStartRadius:20,borderTopStartRadius:20,borderBottomEndRadius:0,borderTopEndRadius:0,backgroundColor:"rgb(31,34,42)",height:120,
            	borderRightWidth:0.5,borderColor:"#202020",alignItems: 'center',
	            justifyContent: 'center',}}
    	        onPress={() => lgout}
        	>
         		<Icon name="log-out" size={50} color="rgb(255,120,120)" />
            </TouchableOpacity>
            <TouchableOpacity
	            style={{width:'45%', borderBottomEndRadius:20,borderTopEndRadius:20,borderBottomStartRadius:0,
    	        borderTopStartRadius:0,backgroundColor:"rgb(31,34,42)",height:120,borderLeftWidth:0.5,borderColor:"#202020",
        	    alignItems: 'center',
            	justifyContent: 'center',}}
    	        onPress={() => setnewEmoji()}
            >
       			<Icon name="download-cloud" size={50} color="rgb(120,140,255)" />
            </TouchableOpacity>
		</View>

		<View style={{width:"100%",flexDirection: 'row',alignContent:"center",justifyContent:"center",marginTop:20}}>
		<TouchableOpacity
            style={{width:'90%', borderRadius:20,backgroundColor:"rgb(31,34,42)",height:80,alignItems: 'center',justifyContent: 'center',flexDirection:"row"}}
            onPress={() => alert("サーバー名: " + meta.name + "\nバージョン: " + meta.version + "\n管理者: " + meta.maintainerName + "\n管理者メールアドレス: " + meta.maintainerEmail + "\nリポジトリ: " + meta.repositoryUrl + "\nこのサーバーについて: " + meta.description)}
        >
        	 <Icon name="info" size={50} color="rgb(120,120,200)" />
        </TouchableOpacity>
		</View>
		</View>
    )
}
export default Settingsbox;