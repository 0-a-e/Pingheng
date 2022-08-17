import {Text} from '@rneui/themed';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {getInfo} from '../api/serverInfo';
import {registerUser, getUser} from '../api/tokenManage';
import {useNavigation} from '@react-navigation/native';

const ifSaved = async () => {
  const serverInfo = await getInfo();
  const userInfo = await getUser();
  if (serverInfo && userInfo) {
    return true;
  }
  return false;
};

const Setup = ({route}) => {
  const [info, setinfo] = useState('loading');
  useEffect(() => {
    (async () => {
      if ('session' in route.params && 'serverAddr' in route.params) {
        if (
          route.params.session.length > 0 &&
          route.params.serverAddr.length > 0
        ) {
          const Info = await getAuth(
            route.params.session,
            route.params.serverAddr,
          );
          if (Info) {
            if (Info.ok) {
              console.log(Info.user.id);
              registerUser(Info.user.id, Info.token).then(res => {
                if (res) {
                  // console.log(navigation);
                  // navigation.push('Main');
                  ToastAndroid.show('登録成功', 2000);
                  setinfo(Info);
                } else {
                  ToastAndroid.show('エラー', 2000);
                }
              });
            }
          }
        } else {
          setinfo('error');
        }
      } else {
        setinfo('error');
      }
    })();
  }, [route.params]);
  if (info === 'loading') {
    return <Loading />;
  } else if (info === 'error') {
    return <Error />;
  } else if (info) {
    return (
      <Welcome info={info} checkIfloggedin={route.params.checkIfloggedin} />
    );
  } else {
    return <Error />;
  }
};

const getAuth = async (sessionId: String, serverAddr: String) => {
  try {
    const checkurl = serverAddr + '/api/miauth/' + sessionId + '/check';
    const response = await axios.post(checkurl);
    if (response.data.ok) {
      return response.data;
      /* HMSAvailability.isHuaweiMobileServicesAvailable()
                      .then((res) => { console.log(JSON.stringify(res)) })
                      .catch((err) => { console.log(JSON.stringify(err)) });*/
    } else {
      ToastAndroid.show('認証エラー', 2000);
      return false;
    }
  } catch (error) {
    ToastAndroid.show('エラー', 2000);
    return false;
  }
};
const Loading = () => {
  return (
    <View style={styles.bg}>
      <Icon size={125} name="loader" color="rgb(180,180,230)" />
    </View>
  );
};

const Welcome = ({info, checkIfloggedin}) => {
  const navigation = useNavigation();
  console.log(info.user);
  let name;
  if (info.user.name) {
    name = info.user.name;
  } else {
    name = info.user.username;
  }
  return (
    <View style={styles.bg}>
      <Image
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 50,
        }}
        source={{uri: info.user.avatarUrl}}
      />
      <Text style={{color: 'white'}}>ようこそ！</Text>
      <Text style={{color: 'white'}}>{name}さん</Text>
      <Icon size={125} name="check" color="rgb(180,180,230)" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          checkIfloggedin();
          try {
            navigation.navigate('Main');
          } catch {}
        }}>
        <Icon size={55} name="arrow-right" color="rgb(180,180,230)" />
      </TouchableOpacity>
    </View>
  );
};

const Error = () => {
  return (
    <View style={styles.bg}>
      <Icon size={125} name="alert-circle" color="rgb(180,180,230)" />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Icon size={55} name="arrow-right" color="rgb(180,180,230)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(5,5,20,0.95)',
    flex: 1,
  },
  button: {
    width: 150,
    borderRadius: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Setup;
