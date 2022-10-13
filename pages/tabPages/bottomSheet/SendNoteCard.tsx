import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-gesture-handler';

const SendNoteCard = () => {
  return (
    <View style={{width: '85%', backgroundColor: 'red', height: 200}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'rgb(19,20,26)',
          borderRadius: 20,
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
          onChangeText={(text: string) => {
            //      setinputURL(text);
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Icon name="inbox" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="smile" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="image" size={35} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{width: 35, height: 35}}>
          <Icon
            name="send"
            size={35}
            style={{width: 35, height: 35, transform: [{rotateZ: '45deg'}]}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SendNoteCard;
