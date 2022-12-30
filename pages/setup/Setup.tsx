import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import setupStyles from './setupStyles';
import setupProcess from './setupProcess';

const Setup = ({route}) => {
  const [status, setStatus] = useState('loading');
  const [info, setInfo] = useState('');
  useEffect(() => {
    (async () => {
      const res = await setupProcess(route.params);
      try {
        if (res.status === 'success') {
          setInfo(res.info);
        } else if (res.status === 'error') {
          setInfo(res.message);
        } else {
          setInfo('不明なエラーが発生しました(0)');
        }
        setStatus(res.status);
      } catch (error) {
        setInfo('不明なエラーが発生しました(1)');
      }
    })();
  }, [route.params]);

  if (status === 'loading') {
    return <Loading />;
  } else if (status === 'error') {
    return <Error message={info} />;
  } else if (status === 'success') {
    return (
      <Welcome info={info} checkIfloggedin={route.params.checkIfloggedin} />
    );
  } else {
    return <Error message="不明なエラーが発生しました" />;
  }
};

const Loading = () => {
  return (
    <View style={setupStyles.bg}>
      <Icon size={125} name="loader" color="rgb(180,180,230)" />
    </View>
  );
};

const Welcome = ({info, checkIfloggedin}) => {
  const navigation = useNavigation();
  let name;
  if (info.user.name) {
    name = info.user.name;
  } else {
    name = info.user.username;
  }
  return (
    <View style={setupStyles.bg}>
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
        style={setupStyles.button}
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

const Error = (props: {message: String}) => {
  const message = props.message;
  const navigation = useNavigation();
  return (
    <View style={setupStyles.bg}>
      <Icon size={125} name="alert-circle" color="rgb(180,180,230)" />
      <Text style={{color: '#fff'}}>エラーが発生しました</Text>
      <Text style={{color: '#fff'}}>err: {message}</Text>
      <TouchableOpacity
        style={setupStyles.button}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Icon size={55} name="arrow-right" color="rgb(180,180,230)" />
      </TouchableOpacity>
    </View>
  );
};

export default Setup;
