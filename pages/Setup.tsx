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
import {registerUser} from '../api/tokenManage';

const Setup = ({route, navigation}) => {
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
          setinfo(Info);
        } else {
          setinfo(false);
        }
      } else {
        setinfo(false);
      }
    })();
  }, [route.params]);
  if (info) {
    return <Welcome info={info} navigation={navigation} />;
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
      // const token = response.data.token;
      //  SecureStore.setItemAsync('user1', token).then(() => {
      /* HMSAvailability.isHuaweiMobileServicesAvailable()
                      .then((res) => { console.log(JSON.stringify(res)) })
                      .catch((err) => { console.log(JSON.stringify(err)) });*/
      //   setnewMeta(svurl).then(() => {
      //     navigation.navigate('Main');
      //  });
      //   });
    } else {
      ToastAndroid.show('認証エラー', 2000);
      return false;
    }
  } catch (error) {
    ToastAndroid.show('エラー', 2000);
    return false;
  }
};

const Welcome = (rawinfo: any, navigation: any) => {
  const info = rawinfo.info;
  console.log(info);
  // console.log(info.user.username);
  return (
    <View style={styles.bg}>
      {/*   <Image source={info.user.avatarUrl} /> */}
      <Text>welcome</Text>
      <Icon size={125} name="check" color="rgb(180,180,230)" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          registerUser(info.user.id, info.token).then(res => {
            if (res) {
              console.log(navigation);
             // navigation.push('Main');
            } else {
              ToastAndroid.show('エラー', 2000);
            }
          });
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
