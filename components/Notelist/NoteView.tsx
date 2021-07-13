import React, { memo } from 'react';
import { View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Avatar,ListItem,Card,Badge } from 'react-native-elements';
import ReadMore from '@fawazahmed/react-native-read-more';
import ParseEmoji from '../../data/Emojis/ParseEmoji';
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
/*
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
              {data["item"]["user"]["name"]  != null &&  <ListItem.Title style={notestyles.name}><ParseEmoji text={data["item"]["user"]["name"]}  /></ListItem.Title>}
              {data["item"]["user"]["name"]  == null &&  <ListItem.Title style={notestyles.name}>{data["item"]["user"]["username"]}</ListItem.Title>}
  
              {
              data["item"]["user"]["isBot"] && 
                <Badge 
                status="primary"
                value={<Icon name="terminal" color="#fff"/>}
                containerStyle={{marginLeft: 5,marginTop:3}}
                badgeStyle={{width: 25}}
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
            </View>

          </View>


        </Card>
    </TouchableOpacity>
      </View>
);
};
const NoteView = memo(NoteViewraw);
//<View style={notestyles.linkbox}></View>

//<View style={notestyles.incardcontainer}>

export default NoteView;