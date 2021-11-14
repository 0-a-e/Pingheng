import React, {} from 'react';
import { Text, View,TouchableOpacity,Image } from 'react-native';
import { ListItem,Card, Avatar } from 'react-native-elements';
import switchactionring from './switchActionring';
import notifystyles from './notifyStyle';
import Actionring from './Actionring';
import ParseEmoji from '../../data/Emojis/ParseEmoji';
import Icon from 'react-native-vector-icons/Feather';

const NotifyView = (props:any) => {

    const notereturn = () => {
      const actionringbar = switchactionring(props["data"]["item"]["type"],props,false);
    return (
    <View>
        <TouchableOpacity  onLongPress={() => {
          alert('long tap');
          console.log(props.data.item);
        }}>
            <Card wrapperStyle={notifystyles.cardwrapper} containerStyle={notifystyles.card}>
                <Actionring actionringbar={actionringbar} props={props}/>
                <View style={notifystyles.incardcontainer}>
                    <View style={notifystyles.topcontainer}>
                        {props["data"]["item"]["user"]["name"]  != null &&  <View style={notifystyles.name}>
                          <ParseEmoji text={props["data"]["item"]["user"]["name"]} ifoneline={true} emojis={props["data"]["item"]["user"]["emojis"]} textStyle={{color:"#fff",fontSize:16}} /></View>}
                        {props["data"]["item"]["user"]["name"]  == null &&  <ListItem.Title numberOfLines={1} style={notifystyles.name}>@{props["data"]["item"]["user"]["username"]}</ListItem.Title>}
                    </View>
                    <View style={notifystyles.normalcontainer}>     
                        <Text
                            style={notifystyles.notetext}
                            numberOfLines={2}
                            ellipsizeMode='middle'
            　          >
                            {actionringbar.text}
                        </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    </View>
);
}


const renotereturn = () => {
  const actionringbar = switchactionring(props["data"]["item"]["type"],props,true);

  const bdr = () => {
    if(props.data.item.note.renote.text != null){
      return 0;
    } else{
      return 50;
    }
  }

  const bd = bdr();

  return (
    <View>
    <TouchableOpacity  onLongPress={() => {
        //リアクション選択を実装
      alert('long tapeee');
      console.log(props.data.item);
    }}>
        <Card wrapperStyle={notifystyles.cardwrapper} containerStyle={notifystyles.card}>
        <Actionring actionringbar={actionringbar} props={props}/>
            <View style={notifystyles.incardcontainer}>
              
              {(props["data"]["item"]["type"] != "renote") ? 
              <View style={notifystyles.RT1container}>
                <View style={[notifystyles.topRTcontainer,{borderRadius:bd}]}>
                  <ListItem.Title style={notifystyles.RTicon}><Icon size={15} name="refresh-cw"/></ListItem.Title>
                  <Avatar
                    containerStyle = {notifystyles.renoteavatarcontainer}
                    overlayContainerStyle={notifystyles.renoteavataroverlay}
                    rounded
                    title={props["data"]["item"]["note"]["user"]["name"]}
                    source={{
                      uri:props["data"]["item"]["note"]["user"]["avatarUrl"]
                    }}
                  /> 
                </View>

                {props["data"]["item"]["note"]["renote"]["text"]  != null &&
                  <View style={notifystyles.RTtextcontainer}>
                    <ListItem.Title
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      style={notifystyles.RTtext}
                    >
                      <ParseEmoji ifoneline={true} text={props["data"]["item"]["note"]["text"]} emojis={props["data"]["item"]["note"]["emojis"]} />
                    </ListItem.Title>
                  </View>
                }

              </View>
              :
              <View style={notifystyles.topcontainer}>
                {props["data"]["item"]["user"]["name"]  != null &&  <Text style={notifystyles.name}><ParseEmoji text={props["data"]["item"]["user"]["name"]}  emojis={props["data"]["item"]["user"]["emojis"]} /> </Text>}
                {props["data"]["item"]["user"]["name"]  == null &&  <ListItem.Title numberOfLines={1} style={notifystyles.name}>@{props["data"]["item"]["user"]["username"]}</ListItem.Title>}
              </View>
                }
                <View style={notifystyles.normalcontainer}>     
                    <Text
                        style={notifystyles.notetext}
                        numberOfLines={2}
                        ellipsizeMode='middle'
        　          >
          {actionringbar.text}
                    
                    </Text>
                </View>
            </View>
        </Card>
    </TouchableOpacity>
</View>
  );
}
try {
  if(props.data.item.type == "follow" || props.data.item.type == "followRequestAccepted" || props.data.item.type == "receiveFollowRequest"){
    return notereturn();
  }
  if(props.data.item.note.renoteId == null || props.data.item.note.renoteId === void 0){
    return notereturn()
  } else if(props.data.item.note.renoteId != null){
    return renotereturn();
  } else {
    console.log("???renote");
    return (<Text style={{color:"red"}}>???</Text>);
  }
} catch(e){
    return(
    <TouchableOpacity  onLongPress={() => {
              alert('jsonがconsoleに出力されました');
              console.log(props.data.item);
            }}>
      <Text style={{color:"red"}}>error: {e.message}</Text>
    </TouchableOpacity>);
  }
}

export default NotifyView;