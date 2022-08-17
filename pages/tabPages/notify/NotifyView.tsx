import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
//import {ListItem, Card, Avatar} from 'react-native-elements';
import notifyStyles from './notifyStyles';
//import ParseEmoji from '../../data/Emojis/ParseEmoji';
import Icon from 'react-native-vector-icons/Feather';
import ActionRing from './ActionRing';
import allocation from './allocation';

//notereturnとrenotereturn無くす途中 allocation.tsxで出力統一 renoteのリノート元(先?)表示部分用コンポネント後で作成
const NotifyView = (props: any) => {
  const data = allocation(props);
  const notereturn = () => {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            alert('long tap');
            console.log(props.data.item);
          }}>
          <View style={notifyStyles.card}>
            <View style={notifyStyles.cardwrapper}>
              <ActionRing data={data} />
              <View style={notifyStyles.incardcontainer}>
                <View style={notifyStyles.topcontainer}>
                  <View style={{flexDirection: 'row'}}>
                    {/*  <ParseEmoji
                      text={props.data.item.user.name}
                      ifoneline={true}
                      emojis={props.data.item.user.emojis}
                      textStyle={{color: '#fff', fontSize: 16}}
                    />*/}
                    <Text numberOfLines={1}>{data.name}</Text>
                  </View>
                </View>
                <View style={notifyStyles.normalcontainer}>
                  <Text
                    style={notifyStyles.notetext}
                    numberOfLines={2}
                    ellipsizeMode="middle">
                    {data.text}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renotereturn = () => {
    const actionringbar = switchactionring(props.data.item.type, props, true);

    const bdr = () => {
      if (props.data.item.note.renote.text != null) {
        return 0;
      } else {
        return 50;
      }
    };

    const bd = bdr();

    return (
      <View>
        <TouchableOpacity
          onLongPress={() => {
            //リアクション選択を実装
            alert('long tapeee');
            console.log(props.data.item);
          }}>
          <Card
            wrapperStyle={notifyStyles.cardwrapper}
            containerStyle={notifyStyles.card}>
            <Actionring actionringbar={actionringbar} props={props} />
            <View style={notifyStyles.incardcontainer}>
              {props.data.item.type != 'renote' ? (
                <View style={notifyStyles.RT1container}>
                  <View
                    style={[notifyStyles.topRTcontainer, {borderRadius: bd}]}>
                    <ListItem.Title style={notifyStyles.RTicon}>
                      <Icon size={15} name="refresh-cw" />
                    </ListItem.Title>
                    <Avatar
                      containerStyle={notifyStyles.renoteavatarcontainer}
                      overlayContainerStyle={notifyStyles.renoteavataroverlay}
                      rounded
                      title={props.data.item.note.user.name}
                      source={{
                        uri: props.data.item.note.user.avatarUrl,
                      }}
                    />
                  </View>

                  {props.data.item.note.renote.text != null && (
                    <View style={notifyStyles.RTtextcontainer}>
                      <ListItem.Title
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={notifyStyles.RTtext}>
                        <ParseEmoji
                          ifoneline={true}
                          text={props.data.item.note.text}
                          emojis={props.data.item.note.emojis}
                        />
                      </ListItem.Title>
                    </View>
                  )}
                </View>
              ) : (
                <View style={notifyStyles.topcontainer}>
                  {props.data.item.user.name != null && (
                    <Text style={notifyStyles.name}>
                      <ParseEmoji
                        text={props.data.item.user.name}
                        emojis={props.data.item.user.emojis}
                      />{' '}
                    </Text>
                  )}
                  {props.data.item.user.name == null && (
                    <ListItem.Title numberOfLines={1} style={notifyStyles.name}>
                      @{props.data.item.user.username}
                    </ListItem.Title>
                  )}
                </View>
              )}
              <View style={notifyStyles.normalcontainer}>
                <Text
                  style={notifyStyles.notetext}
                  numberOfLines={2}
                  ellipsizeMode="middle">
                  {actionringbar.text}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  try {
    if (
      props.data.item.type === 'follow' ||
      props.data.item.type === 'followRequestAccepted' ||
      props.data.item.type === 'receiveFollowRequest' ||
      props.data.item.note.renoteId == null ||
      props.data.item.note.renoteId === void 0
    ) {
      return notereturn();
    } else if (props.data.item.note.renoteId != null) {
      //   return renotereturn();
      return notereturn();
    } else {
      console.log('???renote');
      return <Text style={{color: 'red'}}>???</Text>;
    }
  } catch (e) {
    return (
      <TouchableOpacity
        onLongPress={() => {
          console.log(props.data.item);
          alert('jsonがconsoleに出力されました');
        }}>
        <Text style={{color: 'red'}}>error: {e.message}</Text>
      </TouchableOpacity>
    );
  }
};

export default NotifyView;
