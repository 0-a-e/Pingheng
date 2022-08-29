import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {sendAPI} from '../../../api/useApi';
import Tab from './tab/Tab';
import UserCard from './userCard/UserCard';

const UserScreen = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userId = props.route.params;
    sendAPI([true, 'users/show', {userId: userId}]).then(data => {
      if (data) {
        setUser(data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
        setUser({});
      }
    });
  }, [props.route.params]);

  if (user.id !== undefined) {
    return (
      <View style={{height: '100%'}}>
        <UserCard user={user} />
        <Tab publicReactions={user.publicReactions} id={user.id} />
      </View>
    );
  } else {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'green'}} />
    );
  }
};

export default UserScreen;
