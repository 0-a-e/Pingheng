import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {roundedDiffDate, dateToJa} from '../../../../api/dateCalc';
import InstanceTag from './InstanceTag';

const UserDetail = props => {
  const user = props.data;
  const calcBirth = (dateString: string) => {
    const date = new Date(Date.parse(dateString));
    const nowDate = new Date(Date.now());
    const difference = nowDate - date;
    const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const dateJa = dateToJa(dateString) + '(' + age + '歳)';
    return dateJa;
  };

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 50,
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 15,
        }}>
        <Icon name="activity" size={16} color={'#379e5f'} />
        <Text
          style={{
            fontSize: 10,
            fontWeight: '900',
            color: '#379e5f',
          }}>
          {' ' + roundedDiffDate(user.updatedAt)}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: 'rgb(32,34,40)',
          borderTopWidth: 0.1,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          height: 150 - 55 - 18 - 8 - 8,
          paddingLeft: 15,
          paddingRight: 10,
        }}>
        <View
          style={{
            width: '53%',
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={styles.infoContainer}>
            <Icon name="calendar" size={13} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
              }}>
              {' ' +
                dateToJa(user.createdAt) +
                '(' +
                roundedDiffDate(user.createdAt) +
                ')'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="gift" size={13} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
              }}>
              {user.birthday ? ' ' + calcBirth(user.birthday) : ' -'}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="map-pin" size={13} />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
              }}>
              {user.location ? ' ' + user.location : ' -'}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '47%',
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <InstanceTag user={user} />
        </View>
      </View>
      <View style={styles.numberContainer}>
        <View
          style={[
            styles.numberBox,
            {
              borderRightWidth: 0.25,
            },
          ]}>
          <Text style={styles.numberStyle} numberOfLines={1}>
            {user.followingCount}
          </Text>
          <Text style={{fontSize: 11}} numberOfLines={1}>
            フォロー
          </Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
              borderRightWidth: 0.25,
            },
          ]}>
          <Text style={styles.numberStyle} numberOfLines={1}>
            {user.followersCount}
          </Text>
          <Text style={{fontSize: 11}} numberOfLines={1}>
            フォロワー
          </Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
            },
          ]}>
          <Text style={styles.numberStyle} numberOfLines={1}>
            {user.notesCount}
          </Text>
          <Text style={{fontSize: 11}} numberOfLines={1}>
            投稿
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgb(26,28,34)',
    height: 55,
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 20,
  },
  numberBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  numberStyle: {
    color: '#cfcfcf',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default UserDetail;
