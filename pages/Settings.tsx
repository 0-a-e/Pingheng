//import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  NativeModules,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {removeUser} from '../api/tokenManage';
import {addInfo, getInfo, deleteInfo} from '../api/serverInfo';
import ServerInfoModal from './settingsComponent/ServerInfoModal';
import {getMeta} from '../api/useApi';
const SettingsScreen = () => {
  const [meta, metawrite] = useState();
  //	const [appinfovisible, setappinfovisible] = useState(false);
  const [serverinfovisible, setserverinfovisible] = useState(false);

  const setnewEmoji = async () => {
    const localServerInfo = await getInfo();
    const remoteServerInfo = await getMeta(localServerInfo.uri);
    addInfo(remoteServerInfo);
    ToastAndroid.show('情報が更新されました。', 4000);
    NativeModules.DevSettings.reload();
  };
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
            deleteInfo();
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
          onPress={() => {
            setnewEmoji();
          }}>
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
          onPress={async () => {
            const info = await getInfo();
            metawrite(info);
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
          {meta && <ServerInfoModal serverInfo={meta} />}
        </ModalContent>
      </Modal>
    </View>
  );
};
export default SettingsScreen;
