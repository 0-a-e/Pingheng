import React, { createRef } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button,Avatar,ListItem,Card,ButtonGroup,Badge,withBadge } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import { NavigationEvents } from 'react-navigation';





const notestyles = StyleSheet.create({
  card:{
    borderRadius: 50,
    backgroundColor: "rgb(31,34,42)",
    borderWidth: 0,
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
  normalcontainer:{
    width: "100%",

    flexDirection: 'column',
    paddingTop: 5
  },
  avatar: {
      backgroundColor: "rgba(230,230,230,1)",
      height: 77
  },

  notebox:{
    marginLeft: 5,
    //width: "85%",
    width: 100,
    height: 100,
    backgroundColor: "#ffffff"
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

  incardcontainer:{
    height: 77,
    flexDirection: 'column',
    //rowにすればtitleの位置は合うけど横ならびになって本文が見えなくなる
    //Avaterの位置変更で修正済み
  }

    });

const NoteView = (props) => {
    const data = props["data"];

    return (
    <View>
      
      <TouchableOpacity  
        onPress={() => {
            props.EopenAction(data);
        }}
        onLongPress={() => {
      //リアクション選択を実装
          alert('長押しタップ成功！');
        }}>
        <Card wrapperStyle={notestyles.cardwrapper} containerStyle={notestyles.card}>
          <Avatar
              size="large"
              overlayContainerStyle={notestyles.avatar}
              rounded
              title={data["item"]["user"]["name"]}
              source={{
                uri:data["item"]["user"]["avatarUrl"]
              }}
          />
          <View style={notestyles.incardcontainer}>
            <View style={notestyles.topcontainer}>
              {data["item"]["user"]["name"]  != null &&  <ListItem.Title style={notestyles.name}>{data["item"]["user"]["name"]}</ListItem.Title>}
              {data["item"]["user"]["name"]  == null &&  <ListItem.Title style={notestyles.name}>{data["item"]["user"]["username"]}</ListItem.Title>}
  
              {
              data["item"]["user"]["isBot"] && 
                <Badge 
                status="primary"
                value={<Icon name="terminal" color="#fff"/>}
                containerStyle={{marginLeft: 5}}
                badgeStyle={{width: 35}}
                />
              }
              <ListItem.Subtitle style={notestyles.username}>@{data["item"]["user"]["username"]}</ListItem.Subtitle>
            </View>
            
            <View style={notestyles.normalcontainer}>     
              <ReadMore
                numberOfLines={3}
                style={notestyles.notetext}
                seeMoreText="続きを見る"
              　seeLessText="折りたたむ"　seeMoreStyle={{color: "rgba(255,255,255,0.6)"}}
              　seeLessStyle={{color:"rgba(255,255,255,0.6)"}}
              >

              {data["item"]["text"] == false && "リツイート対応まで消さないで"}
              {data["item"]["text"]}
              </ReadMore>
              <Text>{data["item"]["visibility"]}</Text>
              <Text>{data["item"]["localOnly"]}</Text>
            </View>

          </View>
        </Card>
    </TouchableOpacity>
      </View>
);
};
//<View style={notestyles.incardcontainer}>

export default NoteView;