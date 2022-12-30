import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {sendAPI} from '../../../api/useApi';
import {getUser} from '../../../api/tokenManage';
import LinearGradient from 'react-native-linear-gradient';
import {easeGradient} from 'react-native-easing-gradient';
import {useNavigation} from '@react-navigation/native';

const UserCard = ({props, bottomsheetRef}) => {
  const navigation = useNavigation();
  const {colors, locations} = easeGradient({
    colorStops: {
      0: {
        color: 'transparent',
      },
      1: {
        color: 'rgb(30,30,46)',
      },
    },
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    getUser().then(userInfo => {
      sendAPI([true, 'users/show', {userId: userInfo.username}]).then(data => {
        if (data) {
          setUser(data);
        } else {
          Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
            cancelable: true,
          });
          setUser({});
        }
      });
    });
  }, []);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'rgb(30,30,46)',
        height: 200,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        onPress={() => {
          bottomsheetRef.current.snapTo(1);
          navigation.navigate('User', user.id);
        }}
        style={{height: 150, width: '100%', alignItems: 'center'}}>
        <Image
          style={{position: 'absolute', width: '100%', height: 100, zIndex: 0}}
          source={{uri: user.bannerUrl}}
        />
        <LinearGradient
          colors={colors}
          locations={locations}
          style={{
            width: '100%',
            height: 100,
            zIndex: 1,
          }}
        />
        <Image
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            zIndex: 2,
            borderRadius: 50,
            top: 50,
          }}
          source={{uri: user.avatarUrl}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '65%',
          //    backgroundColor: 'red',
        }}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Icon name="mail" size={29} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}>
          <Icon name="settings" size={29} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
          <Icon name="bell" size={29} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default UserCard;
