import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {sendAPI} from '../../../../api/useApi';
import {settingsList} from './settings/settingsList';

const NotePostBox = ({switchShowNoteSettings, visibility, isLocalOnly}) => {
  const [statusIcon, setStatusIcon] = useState<string>('globe');
  const [noteText, setNoteText] = useState<string>('');
  const textInput = useRef(null);
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
        onStartShouldSetResponder={() => textInput.current.focus()}
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
          multiline
          ref={textInput}
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

export default NotePostBox;
