import React, { memo } from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Avatar,ListItem,Card,Badge } from 'react-native-elements';
import ParseEmoji from '../../data/Emojis/ParseEmoji';
import notestyles from './NoteStyle';
import ReactionView from './ReactionView';

const NoteViewraw = (props) => {
    const data = props["data"];
  const notereturn = () =>{  
    return (

    <View>
      
      <TouchableOpacity  
        onLongPress={() => {
          //メモ　あとでアクションシートは長押し時に開くようにしてタップでツイート詳細を出す
          alert("lp");
        }}

        onPress={() => {
          props.EopenAction(data["item"]);
        }
      }
        >
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
              <View style={notestyles.uncontainer}>
                {data["item"]["user"]["name"]  != null &&  
                  <View style={notestyles.name}>
                    <ParseEmoji text={data["item"]["user"]["name"]} emojis={data["item"]["user"]["emojis"]} textStyle={{color:"#fff",fontSize:16}} ifoneline={true}/>
                  </View>
                }
                {data["item"]["user"]["name"]  == null &&  <Text style={notestyles.name} numberOfLines={1}>{data["item"]["user"]["username"]}</Text>}
              </View>
              {
              data["item"]["user"]["isBot"] && 
                <Badge 
                status="primary"
                value={<Icon name="terminal" color="#fff"/>}
                containerStyle={{marginLeft: 5,marginTop:3}}
                badgeStyle={{width: 25}}
                />
              }
              <Text style={notestyles.username}>@{data["item"]["user"]["username"]}</Text>
              <TouchableOpacity onPress={() => {props.EopenReaction(data["item"])}}  style={notestyles.reactionpill}>
                <ReactionView data={data["item"]} />
              </TouchableOpacity>
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
      onLongPress={() => {
          alert("lp");
          console.log(data["item"]);
      }}

      onPress={() => {
        //メモ　あとでアクションシートは長押し時に開くようにしてタップでツイート詳細を出す
        props.EopenAction(data);
      }}
      >
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
          <View style={[notestyles.RT2container,{borderRadius:bd}]}>
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
          <ListItem.Title numberOfLines={1} ellipsizeMode='tail' style={notestyles.RTtext}>
              <ParseEmoji text={data["item"]["text"]} emojis={data["item"]["emojis"]} ifoneline={true}/>
          </ListItem.Title>
          </View>
          }
          <TouchableOpacity onPress={() => {props.EopenReaction(data["item"]["renote"])}} style={notestyles.reactionpill}>
            <ReactionView data={data["item"]["renote"]} />
          </TouchableOpacity>
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