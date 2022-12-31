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
  const userAttributes = [
    {
      icon: 'calendar',
      text:
        ' ' +
        dateToJa(user.createdAt) +
        '(' +
        roundedDiffDate(user.createdAt) +
        ')',
    },
    {
      icon: 'gift',
      text: user.birthday ? ' ' + calcBirth(user.birthday) : ' -',
    },
    {
      icon: 'map-pin',
      text: user.location ? ' ' + user.location : ' -',
    },
  ];

  const userNumbersList = [
    {text: 'フォロー', number: user.followingCount},
    {text: 'フォロワー', number: user.followersCount},
    {text: '投稿', number: user.notesCount},
  ];

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
          {userAttributes.map(item => (
            <UserAttribute icon={item.icon} text={item.text} />
          ))}
        </View>
        <View style={styles.instanceTagContainer}>
          <InstanceTag user={user} />
        </View>
      </View>
      <View style={styles.numberContainer}>
        {userNumbersList.map(item => (
          <NumberBox number={item.number} text={item.text} />
        ))}
      </View>
    </View>
  );
};
const NumberBox = ({text, number}: {text: string; number: number}) => {
  return (
    <View
      style={[
        styles.numberBox,
        {
          borderLeftWidth: 0.25,
        },
      ]}>
      <Text style={styles.numberStyle} numberOfLines={1}>
        {number.toString()}
      </Text>
      <Text style={{fontSize: 11, color: '#FFF'}} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

const UserAttribute = ({icon, text}: {icon: string; text: string}) => {
  return (
    <View style={styles.infoContainer}>
      <Icon name={icon} size={13} color={'#FFF'} style={{opacity: 0.8}} />
      <Text
        numberOfLines={1}
        style={{
          color: '#FFF',
          fontSize: 10,
          opacity: 0.8,
        }}>
        {text}
      </Text>
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
  instanceTagContainer: {
    width: '47%',
    height: '100%',
    justifyContent: 'space-around',
  },
});
export default UserDetail;
