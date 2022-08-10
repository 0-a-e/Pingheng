import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ServerInfoModal = ({serverInfo}) => (
  <View
    style={{
      backgroundColor: 'rgb(255,255,255)',
      width: '100%',
      borderRadius: 20,
      height: 345,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }}>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0657F3',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
      }}
      onPress={() => {
        Linking.openURL(serverInfo.uri);
      }}
      activeOpacity={0.85}>
      <Image
        source={{
          uri: serverInfo.iconUrl,
        }}
        style={{
          width: 45,
          height: 45,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginRight: 10,
        }}
      />
      <View>
        <Text style={{color: '#fff'}}>
          <Icon name="inbox" size={13} /> {serverInfo.name}
        </Text>
        <Text style={{color: '#fff'}}>
          <Icon name="book" size={13} /> {serverInfo.version}
        </Text>
      </View>
    </TouchableOpacity>
    <View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#c9d3f2',
            width: '50%',
            height: 70,
            borderColor: '#b7c6f7',
            borderBottomWidth: 0.5,
            borderTopStartRadius: 20,
            padding: 5,
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="zap" size={13} /> 管理者
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.maintainerName}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#c9d3f2',
            width: '50%',
            height: 70,
            borderColor: '#b7c6f7',
            borderBottomWidth: 0.5,
            borderLeftWidth: 1,
            borderTopEndRadius: 20,
            padding: 5,
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="mail" size={13} /> メール
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.maintainerEmail}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View
          style={{
            backgroundColor: '#c9d3f2',
            width: '50%',
            height: 70,
            borderColor: '#b7c6f7',
            borderTopWidth: 0.5,
            borderBottomStartRadius: 20,
            padding: 5,
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="code" size={13} /> リポジトリ
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.repositoryUrl}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#c9d3f2',
            width: '50%',
            height: 70,
            borderColor: '#b7c6f7',
            borderTopWidth: 0.5,
            borderLeftWidth: 1,
            borderBottomEndRadius: 20,
            padding: 5,
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="flag" size={13} /> フィードバック
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.feedbackUrl}
          </Text>
        </View>
      </View>
    </View>
    <View
      style={{
        borderRadius: 20,
        backgroundColor: '#c9d3f2',
        padding: 10,
        marginBottom: 10,
        height: 100,
      }}>
      <Text style={{color: '#0657F3', fontSize: 15, marginBottom: 10}}>
        <Icon name="info" size={13} /> このサーバーについて
      </Text>
      <ScrollView>
        <Text style={{color: '#073285'}}>{serverInfo.description}</Text>
      </ScrollView>
    </View>
  </View>
);

export default ServerInfoModal;
