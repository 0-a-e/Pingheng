import React, {useState} from 'react';
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  NativeModules,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {removeUser} from '../../api/tokenManage';
import ServerInfoModal from './ServerInfoModal';
import {getMeta} from '../../api/useApi';
import {settingsStyles} from './settingsStyles';
import {useNavigation} from '@react-navigation/native';
import useRealmManage, {
  emojisManage,
  serverInfoManage,
} from '../../api/realm/realmManage';
import {ScrollView} from 'react-native-gesture-handler';

const SettingsScreen = () => {
  const [serverInfo, setServerInfo] = useState();
  const [showDevOptions, setShowDevOptions] = useState<boolean>(false);
  const [devConsoleOutput, setDevConsoleOutput] = useState<string>('(∩՞ةڼ◔∩)');
  const {resetRealm} = useRealmManage();
  const {addInfo, getInfo} = serverInfoManage();
  const {resetEmojis} = emojisManage();
  //	const [appinfovisible, setappinfovisible] = useState(false);
  const [serverinfovisible, setserverinfovisible] = useState<boolean>(false);
  const navigation = useNavigation();

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

  const setServerInfoFunc = async () => {
    const info = await getInfo();
    setServerInfo(info);
    return info;
  };

  return (
    <View style={settingsStyles.background}>
      <View style={settingsStyles.logoBox}>
        <View style={{height: 150, width: 150, backgroundColor: 'red'}} />
        <Text style={{color: '#fff', fontSize: 20, marginTop: 5}}>
          ReBuild(2.0.0)
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowDevOptions(!showDevOptions);
        }}>
        <Text style={{color: 'red'}}>開発者オプションをtoggle</Text>
      </TouchableOpacity>
      <View style={settingsStyles.topButtonBox}>
        <TouchableOpacity
          style={[settingsStyles.topButton, settingsStyles.topButtonLeft]}
          onPress={() => {
            resetRealm();
            removeUser();
            Alert.alert('ログアウトしました。アプリを再起動してください。');
            // NativeModules.DevSettings.reload();
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
          onPress={() => {
            setServerInfoFunc();
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
      {showDevOptions && (
        <View
          style={{width: '100%', position: 'absolute', top: 0, height: '100%'}}>
          <View style={{height: 80}}>
            <ScrollView>
              <Text style={{color: '#fff'}}>
                ( ◠‿◠ )メニューはスクロールできるぞ
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowDevOptions(!showDevOptions);
                }}>
                <Text style={{color: 'green'}}>開発者オプションをtoggle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetEmojis();
                }}>
                <Text style={{color: 'red'}}>絵文字をリセット</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const info = await setServerInfoFunc();
                  setDevConsoleOutput(JSON.stringify(info));
                }}>
                <Text style={{color: 'green'}}>serverInfoを出力</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={{color: 'green'}}>emojisを出力</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowDevOptions(!showDevOptions);
                }}>
                <Text style={{color: 'red'}}>WebSocket</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowDevOptions(!showDevOptions);
                }}>
                <Text style={{color: 'red'}}>EasterEgg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDevConsoleOutput('(∩՞ةڼ◔∩)');
                }}>
                <Text style={{color: 'green'}}>devConsoleをクリア</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <ScrollView
            style={{
              width: '100%',
              height: '80%',
              backgroundColor: 'black',
            }}>
            <Text
              style={{
                color: 'green',
              }}>
              {devConsoleOutput}
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default SettingsScreen;
