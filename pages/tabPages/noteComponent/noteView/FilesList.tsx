import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {fileTypes} from '../../../../types/fileTypes';

const FilesList = ({files, setimgVisible}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {files.map((item: fileTypes, index: number) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            console.log(item);
            item.type.startsWith('image')
              ? setimgVisible(true)
              : Alert.alert('ファイルのダウンロードはまだ実装されていません');
          }}
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            margin: 2,
            width: 100,
            height: 100,
          }}>
          {item.type.startsWith('image') ? (
            <Image
              source={{uri: item.thumbnailUrl}}
              style={{width: 100, height: 100}}
            />
          ) : (
            <View
              style={{
                backgroundColor: 'rgb(19,20,26)',
                width: 100,
                height: 100,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={'file'}
                size={40}
                color={'#FFF'}
                style={{opacity: 0.7}}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode={'middle'}
                style={{
                  color: '#FFF',
                  position: 'absolute',
                  bottom: 4,
                  opacity: 0.7,
                  marginLeft: '5%',
                  marginRight: '5%',
                  width: '90%',
                }}>
                {item.name}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilesList;
