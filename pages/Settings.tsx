//import * as WebBrowser from 'expo-web-browser';
import React, {useEffect, useState} from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  NativeModules,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//import getMeta,{setnewMeta,getserverURL} from '../data/Getmeta';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {removeUser} from '../api/tokenManage';

const SettingsScreen = () => {
  /*	const [meta, metawrite] = useState();
	const [appinfovisible, setappinfovisible] = useState(false);*/
  const [serverinfovisible, setserverinfovisible] = useState(false);
  /*	useEffect(() => {
	getMeta().then(metaraw => {
		metawrite(metaraw);
	});
	}, []);

const openlink = (url:string) => {
    WebBrowser.openBrowserAsync(url);
}
const setnewEmoji = async () => {
	const svurl = await getserverURL();
	setnewMeta(svurl);
	ToastAndroid.show("情報が更新されました。",4000);
	NativeModules.DevSettings.reload();
}*/
  return (
    <View
      style={{width: '100%', height: '100%', backgroundColor: 'rgb(19,20,26)'}}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'rgb(19,20,26)',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <View style={{height: 150, width: 150, backgroundColor: 'red'}} />
        <Text style={{color: '#fff', fontSize: 20, marginTop: 5}}>1.0.0</Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '45%',
            borderBottomStartRadius: 20,
            borderTopStartRadius: 20,
            borderBottomEndRadius: 0,
            borderTopEndRadius: 0,
            backgroundColor: 'rgb(31,34,42)',
            height: 120,
            borderRightWidth: 0.5,
            borderColor: '#202020',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            removeUser();
          }}>
          <Icon name="log-out" size={50} color="rgb(255,120,120)" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            borderBottomEndRadius: 20,
            borderTopEndRadius: 20,
            borderBottomStartRadius: 0,
            borderTopStartRadius: 0,
            backgroundColor: 'rgb(31,34,42)',
            height: 120,
            borderLeftWidth: 0.5,
            borderColor: '#202020',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          //    onPress={() => {setnewEmoji();}}
        >
          <Icon name="download-cloud" size={50} color="rgb(120,140,255)" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            borderBottomWidth: 0.5,
            borderColor: '#202020',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: 'rgb(31,34,42)',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setserverinfovisible(true);
          }}>
          <Icon name="info" size={50} color="rgb(120,120,200)" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            borderTopWidth: 0.5,
            borderColor: '#202020',
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            backgroundColor: 'rgb(31,34,42)',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          //  onPress={() => {setappinfovisible(true);}}
        >
          <Icon name="book-open" size={50} color="rgb(120,120,200)" />
        </TouchableOpacity>
      </View>
      {/*		<Modal
    visible={appinfovisible}
    onTouchOutside={() => {
      setappinfovisible(false);
    }}
  >
    <ModalContent>
      <Text>8848</Text>
    </ModalContent>
</Modal> */}
      <Modal
        visible={serverinfovisible}
        onTouchOutside={() => {
          setserverinfovisible(false);
        }}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        width={1}
        height={1}
        modalStyle={{
          borderRadius: 20,
          marginBottom: 20,
          backgroundColor: 'transparent',
          padding: 0,
          margin: 0,
        }}
        //containerStyle={{padding:0,margin:0}}
      >
        <ModalContent style={{margin: 0, padding: 0}}>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              height: useWindowDimensions().height - 380,
            }}
            onTouchStart={() => setserverinfovisible(false)}
          />
          <View
            style={{
              backgroundColor: 'rgb(255,255,255)',
              width: '100%',
              borderRadius: 20,
              height: 345,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            {/*meta &&
		<>
		<TouchableOpacity style={{flexDirection:"row",alignItems:"center",backgroundColor:"#0657F3",padding:10,borderRadius:20,marginBottom:10}} onPress={() => {openlink(meta.uri);}}  activeOpacity={0.85}>
		<Image
	source={{
          uri: meta.iconUrl,
        }}
		style={{width:45,height:45,backgroundColor:"#fff",borderRadius:10,marginRight:10}}
		/>
	<View>
	<Text  style={{color:"#fff"}}><Icon name="inbox" size={13} /> {meta.name}</Text>
	<Text style={{color:"#fff"}}><Icon name="book" size={13} /> {meta.version}</Text>
	</View>
	</TouchableOpacity>
	<View>
  <View style={{flexDirection:'row'}}>
   <View style={{backgroundColor:"#c9d3f2",width:"50%",height:70,borderColor:"#b7c6f7",borderBottomWidth:0.5,borderTopStartRadius:20,padding:5}}>
   <Text numberOfLines={1} style={{color:"#0657F3",fontSize:15}}><Icon name="zap" size={13} /> 管理者</Text>
   <Text numberOfLines={2} style={{color:"#073285"}} >{meta.maintainerName}</Text>
   </View>
   <View style={{backgroundColor:"#c9d3f2",width:"50%",height:70,borderColor:"#b7c6f7",borderBottomWidth:0.5,borderLeftWidth:1,borderTopEndRadius:20,padding:5}}>
   <Text numberOfLines={1} style={{color:"#0657F3",fontSize:15}}><Icon name="mail" size={13} /> メール</Text>
   <Text numberOfLines={2} style={{color:"#073285"}} >{meta.maintainerEmail}</Text>
   </View>
  </View>
  <View style={{flexDirection:'row',marginBottom:10}}>
  <View style={{backgroundColor:"#c9d3f2",width:"50%",height:70,borderColor:"#b7c6f7",borderTopWidth:0.5,borderBottomStartRadius:20,padding:5}}>
  <Text numberOfLines={1} style={{color:"#0657F3",fontSize:15}}><Icon name="code" size={13} /> リポジトリ</Text>
  <Text numberOfLines={2} style={{color:"#073285"}} >{meta.repositoryUrl}</Text>
  </View>
   <View style={{backgroundColor:"#c9d3f2",width:"50%",height:70,borderColor:"#b7c6f7",borderTopWidth:0.5,borderLeftWidth:1,borderBottomEndRadius:20,padding:5}}>
	      <Text numberOfLines={1} style={{color:"#0657F3",fontSize:15}}><Icon name="flag" size={13} /> フィードバック</Text>
		  <Text numberOfLines={2} style={{color:"#073285"}} >{meta.feedbackUrl}</Text>
   </View>
  </View>
</View>
<View style={{borderRadius:20,backgroundColor:"#c9d3f2",padding:10,marginBottom:10,height:100}}>
<Text style={{color:"#0657F3",fontSize:15,marginBottom:10}}><Icon name="info" size={13} /> このサーバーについて</Text>
<ScrollView>
<Text style={{color:"#073285"}}>{meta.description}</Text>
</ScrollView>
</View>
</>
*/}
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};
export default SettingsScreen;
