import React, { createRef, memo } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Button,Avatar,ListItem,Card,ButtonGroup,Badge,withBadge } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import { NavigationEvents } from 'react-navigation';
import notestyles from './NoteStyle';

const NoteViewraw = (props) => {
    const data = props["data"];

    const geturl = (text) => {
      //httpsのみかも
        var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
        if(text){
        const res = text.match(regexp_url);
          if(res != []){
            return res;
          } else {
            return false;
          }
        } else {
          return false;
        }
    }

   // console.log("#swssssxd");
    //console.log(data);
   // console.log("#sssss");

  //  console.log(geturl(data["item"]["text"]));
/*<Avatar
              size="large"
              overlayContainerStyle={notestyles.avatar}
              rounded
              title={data["item"]["user"]["name"]}
              source={{
                uri:data["item"]["user"]["avatarUrl"]
              }}
          />
           */
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
          
          <Text>画像</Text>
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
          <View style={notestyles.linkbox}>
          </View>
        </Card>
    </TouchableOpacity>
      </View>
);
};
const NoteView = memo(NoteViewraw);
//<View style={notestyles.incardcontainer}>

export default NoteView;