import React, {} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button,Avatar,ListItem,Card,ButtonGroup,Badge,withBadge } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';


const notestyles = StyleSheet.create({
  card:{
    borderRadius: 50,
    backgroundColor: "rgb(31,34,42)",
    padding: 0,
    height: 77
  },
  cardwrapper:{
    flexDirection: 'row',
  },
  topcontainer:{
    width: "100%",
    flexDirection: 'row',
    paddingTop: 5
  },
    avatar: {
      backgroundColor: "rgba(230,230,230,1)",
      height: 77
    },
    notebox:{
  marginLeft: 5,
  width: "85%"
    },

name:{
color: "#fff"
},
notetext:{
  color:"rgba(230,230,230,1)"
},
username:{
  color: "rgba(200,200,200,1)",
  marginLeft: 5
  },

  incardbox:{
flexDirection: 'column',
  },

    });

const NoteView = (props) => {
    const data = props["data"];

    return (
    <View>
    <TouchableOpacity  onLongPress={() => {
          alert('長押しタップ成功！');
        }}>
          <Card wrapperStyle={notestyles.cardwrapper} containerStyle={notestyles.card}>

          <Avatar
      size="large"
      overlayContainerStyle={notestyles.avatar}
      rounded
      title={data["item"]["body"]["body"]["user"]["name"]}
      source={{
        uri:data["item"]["body"]["body"]["user"]["avatarUrl"]
      }}
    />
  <View style={notestyles.incardbox}>
  <View style={notestyles.topcontainer}>
    <ListItem.Title style={notestyles.name}>{data["item"]["body"]["body"]["user"]["name"]}</ListItem.Title>
  
    <Badge
    status="primary"
    value={<Icon name="terminal" color="#fff"/>}
    containerStyle={{marginLeft: 5}}
    badgeStyle={{width: 35}}
  />

  <ListItem.Subtitle style={notestyles.username}>@{data["item"]["body"]["body"]["user"]["username"]}</ListItem.Subtitle>
  </View>
  <View style={notestyles.notebox}>
    <ReadMore numberOfLines={3} style={notestyles.notetext}>
      {data["item"]["body"]["body"]["text"]}
      </ReadMore>
        <Text>{data["item"]["body"]["body"]["visibility"]}</Text>
        <Text>{data["item"]["body"]["body"]["localOnly"]}</Text>
  </View>
</View>
        </Card>
    </TouchableOpacity>
      </View>
);
};

export default NoteView;