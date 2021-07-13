import React, {} from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { ListItem,Card } from 'react-native-elements';
import switchactionring from './switchActionring';
import notifystyles from './notifyStyle';
import Actionring from './Actionring';
import ParseEmoji from '../../data/Emojis/ParseEmoji';

const NoteView = (props:any) => {
    const actionringvar = switchactionring(props["data"]["item"]["type"],props);
    return (
    <View>
        <TouchableOpacity  onLongPress={() => {
            //リアクション選択を実装
          alert('long tap');
        }}>
            <Card wrapperStyle={notifystyles.cardwrapper} containerStyle={notifystyles.card}>
                <Actionring actionringvar={actionringvar} props={props}/>
                <View style={notifystyles.incardcontainer}>
                    <View style={notifystyles.topcontainer}>
                        {props["data"]["item"]["user"]["name"]  != null &&  <ListItem.Title style={notifystyles.name}><ParseEmoji text={props["data"]["item"]["user"]["name"]}  /> </ListItem.Title>}
                        {props["data"]["item"]["user"]["name"]  == null &&  <ListItem.Title numberOfLines={1} style={notifystyles.name}>@{props["data"]["item"]["user"]["username"]}</ListItem.Title>}
                    </View>
                    <View style={notifystyles.normalcontainer}>     
                        <Text
                            style={notifystyles.notetext}
                            numberOfLines={2}
                            ellipsizeMode='middle'
            　          >
                            {actionringvar.text}
                        </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    </View>
);
};

/*
<View style={notifystyles.incardcontainer}>
            <View style={notifystyles.topcontainer}>
              <ListItem.Title style={notifystyles.name}>{data["item"]["user"]["name"]}</ListItem.Title>
  
              {
              data["item"]["user"]["isBot"] && 
                <Badge 
                status="primary"
                value={<Icon name="terminal" color="#fff"/>}
                containerStyle={{marginLeft: 5}}
                badgeStyle={{width: 35}}
                />
              }
              <ListItem.Subtitle style={notifystyles.username}>@{data["item"]["user"]["username"]}</ListItem.Subtitle>
            </View>
            
            <View style={notifystyles.normalcontainer}>     
              <ReadMore
                numberOfLines={3}
                style={notifystyles.notetext}
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
*/
export default NoteView;