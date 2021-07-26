import React, { memo } from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
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

  const notereturn = () =>{  
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
              <Text style={notestyles.notetext}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                    {data["item"]["text"]}

              </Text>
            </View>

          </View>


        </Card>
    </TouchableOpacity>
      </View>
);
};

const renotereturn = () => {
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

if(data.item.renoteId){
  return renotereturn();
} else if (data.item.renoteId == null){
  return notereturn();
} else {
console.log("???renote");
}
};


const NoteView = memo(NoteViewraw);
//<View style={notestyles.linkbox}></View>

//<View style={notestyles.incardcontainer}>

export default NoteView;