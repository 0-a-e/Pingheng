import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Linking,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {serverInfoModalStyles, infoTileStyles} from './serverInfoModalStyles';

const ServerInfoModal = (serverInfoModalProps: {
  visible: boolean;
  switchServerInfoModalVisible: () => void;
  serverInfo: any;
}) => (
  <Modal
    visible={serverInfoModalProps.visible}
    onTouchOutside={() => {
      serverInfoModalProps.switchServerInfoModalVisible();
    }}
    modalAnimation={
      new SlideAnimation({
        slideFrom: 'bottom',
      })
    }
    width={1}
    height={1}
    modalStyle={serverInfoModalStyles.modalStyle}>
    <ModalContent style={{margin: 0, padding: 0}}>
      <View
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          height: useWindowDimensions().height - 380,
        }}
        onTouchStart={() => serverInfoModalProps.switchServerInfoModalVisible()}
      />
      {serverInfoModalProps.serverInfo && (
        <ServerInfoModalContent serverInfo={serverInfoModalProps.serverInfo} />
      )}
    </ModalContent>
  </Modal>
);

const ServerInfoModalContent = ({serverInfo}) => (
  <View style={serverInfoModalStyles.modalContentBox}>
    <TouchableOpacity
      style={serverInfoModalStyles.topBox}
      onPress={() => {
        Linking.openURL(serverInfo.uri);
      }}
      activeOpacity={0.85}>
      <Image
        source={{
          uri: serverInfo.iconUrl,
        }}
        style={serverInfoModalStyles.serverIcon}
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
        <View style={[infoTileStyles.infoTile, infoTileStyles.topLeft]}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="zap" size={13} /> 管理者
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.maintainerName}
          </Text>
        </View>
        <TouchableOpacity
          style={[infoTileStyles.infoTile, infoTileStyles.topRight]}
          onPress={() => {
            Linking.openURL(`mailto:${serverInfo.maintainerEmail}`);
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="mail" size={13} /> メール
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.maintainerEmail}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TouchableOpacity
          style={[infoTileStyles.infoTile, infoTileStyles.bottomLeft]}
          onPress={() => {
            Linking.openURL(serverInfo.repositoryUrl);
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="code" size={13} /> リポジトリ
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.repositoryUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[infoTileStyles.infoTile, infoTileStyles.bottomRight]}
          onPress={() => {
            Linking.openURL(serverInfo.feedbackUrl);
          }}>
          <Text numberOfLines={1} style={{color: '#0657F3', fontSize: 15}}>
            <Icon name="flag" size={13} /> フィードバック
          </Text>
          <Text numberOfLines={2} style={{color: '#073285'}}>
            {serverInfo.feedbackUrl}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={serverInfoModalStyles.descriptionBox}>
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
