import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.LONG);
};

const Visibility = ({
  visibility,
  localOnly,
}: {
  visibility: string;
  localOnly: boolean | undefined;
}) => {
  let iconName: string;
  let message: string;
  switch (visibility) {
    case 'public':
      message = 'このノートは全てのユーザーに公開されています。';
      iconName = 'globe';
      break;
    case 'home':
      message = 'このノートはホームタイムラインのみに公開されています。';
      iconName = 'home';
      break;
    case 'followers':
      message = 'このノートはフォロワーのみに公開されています。';
      iconName = 'users';
      break;
    case 'specified':
      message = 'このノートは指定されたユーザーのみに公開されています。';
      iconName = 'mail';
      break;
    default:
      message = 'このノートの公開設定を取得できませんでした。';
      iconName = 'help-circle';
      break;
  }
  return (
    <View style={{flexDirection: 'row', marginLeft: 10}}>
      {localOnly && (
        <TouchableOpacity
          onPress={() => {
            showToast(
              'このノートはインスタンス内のユーザーのみに公開されています。',
            );
          }}
          style={{marginRight: 5}}>
          <Icon name="cloud-off" size={13} color="#fff" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          showToast(message);
        }}>
        <Icon name={iconName} size={13} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
export default Visibility;
