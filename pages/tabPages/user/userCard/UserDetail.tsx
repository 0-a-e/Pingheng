import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {roundedDiffDate} from '../../../../api/dateCalc';

const UserDetail = props => {
  const user = props.data;
  const dateToJa = (dateString: string) => {
    const date = new Date(Date.parse(dateString));
    const dateJa =
      date.getFullYear() +
      '年' +
      (date.getMonth() + 1).toString().replace(/^0+/, '') +
      '月' +
      date.getDate() +
      '日';
    return dateJa;
  };

  const calcBirth = (dateString: string) => {
    const date = new Date(Date.parse(dateString));
    const nowDate = new Date(Date.now());
    const difference = nowDate - date;
    const age = Math.round(difference / (1000 * 60 * 60 * 24 * 365));
    const dateJa = dateToJa(dateString) + '(' + age + '歳)';
    return dateJa;
  };

  const InstanceTag = () => {
    if ('instance' in user === false) {
      return (
        <View
          style={{
            height: 18,
            borderRadius: 50,
            backgroundColor: 'rgb(31,34,42)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
            position: 'relative',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Text numberOfLines={1} style={{fontSize: 10, marginBottom: 0.5}}>
            ローカル
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{height: 18, justifyContent: 'center'}}>
          <Image
            style={{
              width: 50,
              height: 18,
              borderRadius: 20,
              zIndex: 1,
              position: 'absolute',
              backgroundColor: user.instance.themeColor,
            }}
            source={{
              uri: user.instance.iconUrl,
            }}
          />
          <View
            style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: user.instance.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 0,
              marginLeft: 10,
              position: 'relative',
              paddingRight: 5,
            }}>
            <Text
              numberOfLines={1}
              style={{marginLeft: 12, fontSize: 10, marginBottom: 0.5}}>
              {user.instance.name}
            </Text>
          </View>
        </View>
      );
    }
  };
  return (
    //ローカルでないときに注意書き
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
          paddingRight: 15,
        }}>
        <View
          style={{
            width: '60%',
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
            width: '40%',
            height: '100%',
            justifyContent: 'space-around',
           // backgroundColor: 'green',
          }}>
          <InstanceTag />
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
          <Text style={styles.numberStyle}>{user.followingCount}</Text>
          <Text style={{fontSize: 11}}>フォロー</Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
              borderRightWidth: 0.25,
            },
          ]}>
          <Text style={styles.numberStyle}>{user.followersCount}</Text>
          <Text style={{fontSize: 11}}>フォロワー</Text>
        </View>
        <View
          style={[
            styles.numberBox,
            {
              borderLeftWidth: 0.25,
            },
          ]}>
          <Text style={styles.numberStyle}>{user.notesCount}</Text>
          <Text style={{fontSize: 11}}>投稿</Text>
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
    width: '33.33%',
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
