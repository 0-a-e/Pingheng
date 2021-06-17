import React from "react"
import { View } from "react-native"
import { Avatar } from "react-native-elements"
import Icon from "react-native-vector-icons/Feather"
import notifystyles from './notifyStyle';


const Actionring = (data: any, actionringvar: { background: any; icon: string; text: string; }) => {
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

    <View style={[{backgroundColor:data.actionringvar.background},notifystyles.actionring]}>
            <Icon style={notifystyles.actionringicon} size={20} name={data.actionringvar.icon} color="#fff"/>
    </View>
    </View>
)
}
export default Actionring;