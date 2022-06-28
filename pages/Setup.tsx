import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

const Setup = ({route, navigation}) => {
  const getAuth = (url: string) => {
    if (url) {
      try {
        const sessionid = parseurl(url).session;
        if (!sessionid) {
          ToastAndroid.show('パースに失敗しました', 2000);
        } else {
          const checkurl = svurl + '/api/miauth/' + sessionid + '/check';
          axios.post(checkurl).then(function (response) {
            //あとでユーザー情報取り出してこんにちは！xxさんをやる
            if (response.data.ok) {
              const token = response.data.token;
              SecureStore.setItemAsync('user1', token).then(() => {
                /* HMSAvailability.isHuaweiMobileServicesAvailable()
                        .then((res) => { console.log(JSON.stringify(res)) })
                        .catch((err) => { console.log(JSON.stringify(err)) });*/
                setnewMeta(svurl).then(() => {
                  navigation.navigate('Main');
                });
              });
            } else {
              ToastAndroid.show('認証エラー', 2000);
            }
          });
        }
      } catch (ee) {
        console.log(ee);
        ToastAndroid.show('パースに失敗しました', 2000);
      }
    } else {
      ToastAndroid.show('入力されていません', 2000);
    }
  };

  if ('session' in route.params) {
    return (
      <View>
        <Text>OK</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }
};
export default Setup;
