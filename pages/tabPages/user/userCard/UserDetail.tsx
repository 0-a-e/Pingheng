import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserDetail = props => {
  const user = props.data;
  console.log(user);

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Text>{user.createdAt}</Text>
      <Text>{user.birthday}</Text>
      <Text>{user.updatedAt}</Text>
      <View style={styles.numberContainer}>
        <View
          style={[
            styles.numberBox,
            {
              borderRightWidth: 0.25,
            },
          ]}>
          <Text>フォロワー</Text>
          <Text style={styles.numberStyle}>{user.followersCount}</Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
              borderRightWidth: 0.25,
            },
          ]}>
          <Text>フォロー</Text>
          <Text style={styles.numberStyle}>{user.followingCount}</Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
            },
          ]}>
          <Text>投稿</Text>
          <Text style={styles.numberStyle}>{user.notesCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    bottom: 0,
    width: '95%',
    flexDirection: 'row',
    backgroundColor: 'rgb(26,28,34)',
    borderRadius: 20,
    height: 55,
  },
  numberBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.33%',
  },
  numberStyle: {
    color: 'white',
    fontSize: 20,
  },
});
export default UserDetail;
