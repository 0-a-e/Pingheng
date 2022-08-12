import React, {useState} from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {removeUser} from '../api/tokenManage';
import {addInfo, getInfo, deleteInfo} from '../api/serverInfo';
import ServerInfoModal from './settingsComponent/ServerInfoModal';
import {getMeta} from '../api/useApi';
import {settingsStyles} from './settingsComponent/settingsStyles';

const SettingsScreen = () => {
  const [serverInfo, setServerInfo] = useState();
  //	const [appinfovisible, setappinfovisible] = useState(false);
  const [serverinfovisible, setserverinfovisible] = useState(false);

  const switchServerInfoModalVisible = () => {
    setserverinfovisible(!serverinfovisible);
  };

  const setnewEmoji = async () => {
    const localServerInfo = await getInfo();
    if (localServerInfo) {
      const remoteServerInfo = await getMeta(localServerInfo.uri);
      addInfo(remoteServerInfo);
      ToastAndroid.show('情報が更新されました。', 4000);
      NativeModules.DevSettings.reload();
    } else {
      ToastAndroid.show(
        '端末にサーバー情報が保存されていないか、破損しています。アプリを再インストールしてください。',
        4000,
      );
    }
  };
  return (
    <View style={settingsStyles.background}>
      <View style={settingsStyles.logoBox}>
        <View style={{height: 150, width: 150, backgroundColor: 'red'}} />
        <Text style={{color: '#fff', fontSize: 20, marginTop: 5}}>1.0.0</Text>
      </View>

      <View style={settingsStyles.topButtonBox}>
        <TouchableOpacity
          style={[settingsStyles.topButton, settingsStyles.topButtonLeft]}
          onPress={() => {
            deleteInfo();
            removeUser();
            NativeModules.DevSettings.reload();
          }}>
          <Icon name="log-out" size={50} color="rgb(255,120,120)" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[settingsStyles.topButton, settingsStyles.topButtonRight]}
          onPress={() => {
            setnewEmoji();
          }}>
          <Icon name="download-cloud" size={50} color="rgb(120,140,255)" />
        </TouchableOpacity>
      </View>

      <View style={[settingsStyles.bottomButtonContainer, {marginTop: 20}]}>
        <TouchableOpacity
          style={[settingsStyles.bottomButton, settingsStyles.bottomButtonTop]}
          onPress={async () => {
            const info = await getInfo();
            setServerInfo(info);
            setserverinfovisible(true);
          }}>
          <Icon name="info" size={50} color="rgb(120,120,200)" />
        </TouchableOpacity>
      </View>
      <View style={settingsStyles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            settingsStyles.bottomButton,
            settingsStyles.bottomButtonBottom,
          ]}
          //  onPress={() => {setappinfovisible(true);}}
        >
          <Icon name="book-open" size={50} color="rgb(120,120,200)" />
        </TouchableOpacity>
      </View>
      <ServerInfoModal
        visible={serverinfovisible}
        switchServerInfoModalVisible={switchServerInfoModalVisible}
        serverInfo={serverInfo}
      />
    </View>
  );
};
export default SettingsScreen;
