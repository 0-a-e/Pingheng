import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const InstanceTag = route => {
  const user = route.user;
  if ('instance' in user === false) {
    return (
      <View style={styles.localContainer}>
        <Text numberOfLines={1} style={{fontSize: 13, marginBottom: 0.5}}>
          ローカル
        </Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          ToastAndroid.show(
            'フォロー・フォロワー数、登録日時は利用中のインスタンスにおける内容を表示しています。\n正確な内容を確認するには、ユーザー名をタップしてリモートインスタンスのページに移動して下さい。',
            12000,
          );
        }}
        style={[
          styles.Container,
          {
            backgroundColor: user.instance.themeColor,
          },
        ]}>
        <Icon name="info" size={11} color={'#fff'} style={styles.infoIcon} />
        <View style={styles.imageContainer}>
          <View style={styles.imageUnderlay} />
          <Image
            style={[
              styles.imageStyle,
              {
                backgroundColor: user.instance.themeColor,
              },
            ]}
            source={{
              uri: user.instance.iconUrl,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={{fontSize: 12}}>
            {user.instance.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{fontSize: 7, marginTop: -1.8, marginLeft: 0.5}}>
            {'by ' + user.instance.softwareName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  localContainer: {
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgb(31,34,42)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    height: 50,
    borderRadius: 15,
    width: '100%',
    zIndex: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  textContainer: {
    height: '100%',
    flex: 0.85,
    marginLeft: 5,
    justifyContent: 'center',
    zIndex: 1,
  },
  imageStyle: {
    width: 45,
    height: 45,
    marginLeft: 2.5,
    marginTop: 2.5,
    borderRadius: 15,
    zIndex: 2,
    position: 'absolute',
  },
  imageUnderlay: {
    width: 50,
    height: 50,
    borderRadius: 15,
    zIndex: 1,
    position: 'relative',
    left: 0,
    backgroundColor: '#fff',
    opacity: 0.2,
  },
  infoIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.7,
  },
});
export default InstanceTag;
