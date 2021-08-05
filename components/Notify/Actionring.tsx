import React from "react"
import { View,Text } from "react-native"
import { Avatar } from "react-native-elements"
import Icon from "react-native-vector-icons/Feather"
import ParseEmoji from '../../data/Emojis/ParseEmoji';
import notifystyles from './notifyStyle';


const Actionring = (data: any, actionringbar: { background: any; icon: string; reaction: string; }) => {
return(
    <View>
    <Avatar
              size="large"
              containerStyle={notifystyles.avatar}
              rounded
              title={data.props["data"]["item"]["user"]["name"]}
              source={{
                uri:data.props["data"]["item"]["user"]["avatarUrl"]
              }}
          />

    <View style={[{backgroundColor:data.actionringbar.background},notifystyles.actionring]}>
            {(data.actionringbar.reaction) ? 
            <Text style={{width:20,height:20,fontSize:30,justifyContent: 'center', alignItems: 'center'}}>
              <ParseEmoji text={data.actionringbar.reaction} emojis={data.actionringbar.emoji}/>
            </Text>
            : 
            <Icon style={notifystyles.actionringicon} size={20} name={data.actionringbar.icon} color="#fff"/>
            }
         
    </View>
    </View>
)
}
export default Actionring;