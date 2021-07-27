import React, { memo } from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Avatar,ListItem,Card,Badge } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import ParseEmoji from '../../data/Emojis/ParseEmoji';
import notestyles from './NoteStyle';

const RTViewraw = (props) => {
    const data = props["data"];
    const bdr = () => {
      if(data.item.text != null){
        return 0;
      } else{
        return 50;
      }
    }
    const bd = bdr();
  
    return (
      <View>
      <TouchableOpacity  
        onPress={() => {
            props.EopenAction(data);
        }}
  
        onLongPress={() => {
      //リアクション選択を実装
          alert('long tap');
        }}>
        <Card wrapperStyle={notestyles.cardwrapper} containerStyle={notestyles.card}>
        <Avatar
              size="large"
              overlayContainerStyle={notestyles.avatar}
              rounded
              title={data["item"]["renote"]["user"]["name"]}
              source={{
                uri:data["item"]["renote"]["user"]["avatarUrl"]
              }}
          />
          <View style={notestyles.incardcontainer}>
            <View style={notestyles.RT1container}>
            <View style={[notestyles.topRTcontainer,{borderRadius:bd}]}>
            <ListItem.Title style={notestyles.RTicon}><Icon size={15} name="refresh-cw"/></ListItem.Title>
            <Avatar
              containerStyle = {notestyles.renoteavatarcontainer}
              overlayContainerStyle={notestyles.renoteavataroverlay}
              rounded
              title={data["item"]["user"]["name"]}
              source={{
                uri:data["item"]["user"]["avatarUrl"]
              }}
            /> 
            </View>
            {data["item"]["text"]  != null && <View style={notestyles.RTtextcontainer}>
              <ListItem.Title numberOfLines={1} ellipsizeMode='tail' style={notestyles.RTtext}><ParseEmoji text={data["item"]["text"]} /></ListItem.Title>
            </View>
            }
            </View>
            <View style={notestyles.normalcontainer}>     
              <Text style={notestyles.notetext}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                    {data["item"]["renote"]["text"]}
  
              </Text>
            </View>
          </View>
        </Card>
    </TouchableOpacity>
      </View>
    );
  }
  const RTView = memo(RTViewraw);
  //<View style={notestyles.linkbox}></View>
  
  //<View style={notestyles.incardcontainer}>
  
  export default RTView;