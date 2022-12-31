import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SettingList from './SettingList';
import {settingsList} from './settingsList';
import {settingType} from './settingType';

const NoteSettings = ({
  switchShowNoteSettings,
  isLocalOnly,
  switchIsLocalOnly,
  visibility,
  changeVisibility,
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: 200,
          borderRadius: 15,
          padding: 5,
        },
        isLocalOnly
          ? {backgroundColor: '#2950ff'}
          : {backgroundColor: 'rgb(30,30,46)'},
      ]}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgb(30,30,46)',
          borderRadius: 15,
        }}>
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              switchIsLocalOnly();
            }}
            style={{marginRight: 5}}>
            {isLocalOnly ? (
              <Icon name="shield" size={30} color={'#2950ff'} />
            ) : (
              <Icon name="shield-off" size={30} color={'#fff'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              switchShowNoteSettings();
            }}
            style={{
              width: 35,
              height: 35,
            }}>
            <Icon name="x" size={35} color={'#FFF'} />
          </TouchableOpacity>
        </View>
        {/*あとでスワイプで切り替えるようなUIに変えたいな*/}
        {settingsList.map((item: settingType) => (
          <SettingList
            item={item}
            key={item.id}
            visibility={visibility}
            changeVisibility={changeVisibility}
          />
        ))}
      </View>
    </View>
  );
};
export default NoteSettings;
