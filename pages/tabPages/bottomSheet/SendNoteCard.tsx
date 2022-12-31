import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {sendAPI} from '../../../api/useApi';
import {noteSettingsManage} from '../../../api/realm/realmManage';
import Visibility from '../noteComponent/noteView/Visibility';

const SendNoteCard = () => {
  const [showNoteSettings, setShowNoteSettings] = useState<boolean>(false);
  const switchShowNoteSettings = () => setShowNoteSettings(!showNoteSettings);
  const {
    managelocalOnly,
    changeVisibility: changeRealmVisibility,
    getSettings,
  } = noteSettingsManage();
  const [isLocalOnly, setIsLocalOnly] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<
    'public' | 'home' | 'followers' | 'specified'
  >('home');

  const changeVisibility = (
    vsbl: 'public' | 'home' | 'followers' | 'specified',
  ) => {
    setVisibility(vsbl);
    changeRealmVisibility(vsbl);
  };
  const uf = async () => {
    const settings = await getSettings();
    if (settings) {
      setIsLocalOnly(settings.localOnly);
      setVisibility(settings.visibility);
    }
  };
  useEffect(() => {
    uf();
  }, []);

  const switchIsLocalOnly = () => {
    managelocalOnly(!isLocalOnly);
    setIsLocalOnly(!isLocalOnly);
  };

  if (!showNoteSettings) {
    return (
      <NotePostBox
        switchShowNoteSettings={switchShowNoteSettings}
        visibility={visibility}
        isLocalOnly={isLocalOnly}
      />
    );
  } else {
    return (
      <NoteSettings
        changeVisibility={changeVisibility}
        visibility={visibility}
        switchShowNoteSettings={switchShowNoteSettings}
        isLocalOnly={isLocalOnly}
        switchIsLocalOnly={switchIsLocalOnly}
      />
    );
  }
};

const settingsList = [
  {
    id: 'public',
    icon: 'globe',
    text: 'パブリック',
  },
  {
    id: 'home',
    icon: 'home',
    text: 'ホーム',
  },
  {
    id: 'followers',
    icon: 'unlock',
    text: 'フォロワー',
  },
  {
    id: 'specified',
    icon: 'mail',
    text: 'ダイレクト',
  },
];

type settingType = {id: string; icon: string; text: string};

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
          <SettingsListComponent
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

const SettingsListComponent = ({
  item,
  visibility,
  changeVisibility,
}: {
  item: settingType;
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: '25%',
        //   borderBottomWidth: 2,
        //    borderColor: '#FFF',
      }}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          changeVisibility(item.id);
        }}>
        <Icon
          name={item.icon}
          size={25}
          {...(visibility === item.id ? {color: '#2950ff'} : {color: '#FFF'})}
          style={{marginLeft: '25%'}}
        />
        <Text
          style={[
            {
              opacity: 0.8,
              marginLeft: '20%',
              width: '100%',
            },
            visibility === item.id ? {color: '#2950ff'} : {color: '#FFF'},
          ]}
          numberOfLines={1}>
          {item.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NotePostBox = ({switchShowNoteSettings, visibility, isLocalOnly}) => {
  const [statusIcon, setStatusIcon] = useState<string>('globe');
  const [noteText, setNoteText] = useState<string>('');
  useEffect(() => {
    const matchedSetting = settingsList.find(
      setting => setting.id === visibility,
    );
    setStatusIcon(matchedSetting.icon);
  }, [visibility]);

  const sendNote = async () => {
    if (noteText) {
      await sendAPI([
        true,
        'notes/create',
        {
          text: noteText,
          localOnly: isLocalOnly,
          visibility: visibility,
        },
      ]);
      setNoteText('');
    } else {
      console.log('notext');
    }
  };
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'rgb(30,30,46)',
        height: 200,
        borderRadius: 15,
        //overflow: 'hidden',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'rgb(19,20,26)',
          borderRadius: 15,
          marginTop: -1,
        }}>
        <TextInput
          style={{
            color: 'white',
            fontSize: 13,
            marginLeft: 10,
            marginRight: 10,
          }}
          placeholder="ここに書いてください"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={noteText}
          onChangeText={(text: string) => {
            //      setinputURL(text);
            setNoteText(text);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: 50,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Icon name="image" size={25} color={'#FFF'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="smile" size={25} color={'#FFF'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="inbox" size={25} color={'#FFF'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              switchShowNoteSettings();
            }}>
            <Icon
              name={statusIcon}
              size={25}
              {...(isLocalOnly ? {color: '#2950ff'} : {color: '#FFF'})}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            sendNote();
          }}
          style={{width: 35, height: 35}}>
          <Icon
            name="send"
            size={35}
            color={'#FFF'}
            style={{width: 35, height: 35, transform: [{rotateZ: '45deg'}]}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SendNoteCard;
