import ActionSheet from "react-native-actions-sheet";
import React, {useRef, useState,memo } from "react";
import { StyleSheet, Text, View,ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { sendAPI } from "../../data/useAPI";
import ParseEmoji from "../../data/Emojis/ParseEmoji";
import * as Progress from 'react-native-progress';
import { Avatar } from "react-native-elements";
import { v4 as uuidv4 } from "uuid";
import BottomSheet from 'reanimated-bottom-sheet';
import { Portal } from 'react-native-portalize';
import ContentLoader, { Rect, Circle,Code } from 'react-content-loader/native';

const Reaction = (props: {reactionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
  //ところでこれいまのリアクションのborder光らせたりしないとどれがどれのアクションかわからんな

  const [reactiondata, setReactiondata] = useState();
  const [dlist, setDlist] = useState([]);
  const [contentheight,contentheightwrite] = useState();
  const [err, setErr] = useState(false);
  let myRef = useRef();


  const styles = StyleSheet.create({
    header: {
        backgroundColor:"rgb(19,20,26)",
        shadowColor: '#000000',
        paddingTop: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 5,
      },
});


  const getreactions = async () => {
    const r = props.Egetreactiondata();
    setReactiondata(r);
    //setStateが即時反映されなくてエラーになるから取りあえずrに入れとく
    let dlist: { name: string; user: any[];}[] = [];
    try {
      const data = await sendAPI(["","notes/reactions",{"noteId":r["id"],limit:100}]);
      if(data){
        dlist = [];
        Object.keys(r["reactions"]).forEach(function (key) {
          let ulist: any[] = [];
          data.forEach((item: { type: string; }) => {
            if(item.type == key){
              ulist.push(item);
            }
            });
            //ローディングデザイン用にコメントアウトしてる
         dlist.push({"name":key,user:ulist});
        });

        return dlist;
      } else {
          console.log("nodata");
          return [];
       }
    } catch (error) {
      console.log(error);
      return [];

    }
  };

      const Userlistitem = (props) => {
        return (
          <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"rgba(230,230,255,0.1)",marginBottom:10,borderRadius:50}}>
            <Avatar
            containerStyle={{marginRight:5}}
              size="medium"
              rounded
              title={props.item.user.name}
              source={{
                uri:props.item.user.avatarUrl
              }}
            />
            {props.item.user.name != null && <ParseEmoji ifoneline={true} emojis={props.item.user.emojis} text={props.item.user.name} textStyle={{color:"#fff"}}/>}
            {props.item.user.name == null && <Text style={{color:"#fff"}}>{props.item.user.username}</Text>}
          </View>
          );
      }

      const renderSectionButton = (d: any,index: number) => {
          return (
          <TouchableOpacity
            key={index}
            onPress={() => myRef.current.scrollToIndex({animated:true,index:index})}
              style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
              width: 60,
              height: 60,
            }}
          >
           
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
               // backgroundColor: 'white',
               borderColor:"rgba(255,255,255,0.1)",
               borderWidth:1,
                borderRadius: 50,
              }}
            >
               <ParseEmoji text={d.name} ifoneline={true} emojis={reactiondata["emojis"]} textStyle={{color:"#fff",fontSize:16}} />
            </View>
          </TouchableOpacity>
        )};
      
        const RenderSectionraw = (props) => {
          return (
          <View
            style={{
              width: '100%',
              padding: 10,
              borderWidth: 0,
              height:contentheight,
            }}
          >
            <FlatList
              style={{ width: '100%', backgroundColor: "",marginTop:"10%"}}
              data={props.item.user}
              renderItem={({ item, index }) => <Userlistitem item={item} />}
              initialScrollIndex={0}
              initialNumToRender={9999}
              keyExtractor={item => item.name + uuidv4()}
              scrollEventThrottle={1}
           />
          </View>
        )
      };
       
        const RenderSection = memo(RenderSectionraw);

        const Btnlist = () => (
          <View style={{width:75,backgroundColor:"",height:"100%",padding:0,justifyContent: 'center'}}>
          <View style={{width:70,marginLeft:5,paddingLeft:5,paddingRight:5,height: '90%',borderRadius:50,backgroundColor:"rgba(230,230,255,0.1)",overflow: 'hidden'}}>
          <ScrollView style={{paddingTop:15,borderRadius:50}} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={() =>
          props.reactionSheetRef.current?.handleChildScrollEnd()
        }>
                {dlist.map(renderSectionButton)}
          </ScrollView>
          </View>
          </View>
        );

        const Header = () => (
          <View style={styles.header}>
            <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
            </View>
          </View>
        )
  
        const MLoader = () => {
          return(
          <View style={{width:"100%",height:"100%",flexDirection:"row"}}>
           <View style={{width:75,backgroundColor:"",height:"100%",padding:0,justifyContent: 'center'}}>
              <View style={{width:70,marginLeft:5,paddingLeft:5,paddingRight:5,height: '90%',borderRadius:50,backgroundColor:"rgba(230,230,255,0.1)",overflow: 'hidden'}}>  
                <ContentLoader
                  speed={1}
                  backgroundColor={'#333'}
                  foregroundColor={'#999'}
                  style={{ width: '60', height: '100%'}}
                >
                  <Circle cx="30" cy="45" r="30" />
                  <Circle cx="30" cy="110" r="30" />
                  <Circle cx="30" cy="175" r="30" />
                  </ContentLoader>
              </View>
            </View>
          <View style={{width:Dimensions.get("screen").width - 85,height:"100%",marginTop:"10%",marginLeft:10}}>
          <ContentLoader
                speed={1}
                backgroundColor={'#333'}
                  foregroundColor={'#999'}
              >
            <Rect x="0" y="0" rx="25" ry="30" width="95%" height="45" />
            <Rect x="0" y="60" rx="25" ry="30" width="95%" height="45" />
            <Rect x="0" y="120" rx="25" ry="30" width="95%" height="45" />
            <Rect x="0" y="180" rx="25" ry="30" width="95%" height="45" />
          </ContentLoader>
          </View>
          </View>
        )
      };

        const Content = () => {
          return(
            <View style={{height:"100%"}}>
                <TouchableOpacity onPress={() => {props.closeReaction({"onlyclose":true})}} style={{height: '10%'}} />
                    <Header />
<View style={{width: '100%', height:"90%",flexDirection: 'row',backgroundColor:"#14141C"}}>
            {dlist.length > 0 ?
              <>
                <Btnlist />
                <FlatList
                  onLayout={d => (d.nativeEvent.layout.height && !(contentheight == d.nativeEvent.layout.height)) && contentheightwrite(d.nativeEvent.layout.height)}
                  style={{ width: '100%', backgroundColor: "", zIndex: 2 }}
                  data={dlist}
                  renderItem={({ item, index }) => <RenderSection item={item} index={index} />}
                  ref={myRef}
                  initialScrollIndex={0}
                  initialNumToRender={9999}
                  keyExtractor={item => item.name + uuidv4()}
                  scrollEventThrottle={1}
                  snapToAlignment={"start"}
                  decelerationRate={"fast"}
                  pagingEnabled={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  />
              </>
          /*    : err ?
              <>
              <View style={{width: '100%', backgroundColor: "#14141c", alignItems: 'center', }}>
              <Text style={{marginTop:16,color:"white",fontSize:14,marginBottom:20}}>エラーが発生しました</Text>
              </View>
            </> */
              :
              <>
                <View style={{width: '100%', backgroundColor: "#14141c"}}>
                <MLoader />
                </View>
              </>
              }
            </View>
            </View>
          )
        };
      
          return (
            <Portal>
                <View style={{position:"absolute",width:"100%",height:"100%"}}>
                <BottomSheet
                    //backDropColor="red"
                    ref={props.reactionSheetRef}
                    initialSnap={1}
                    snapPoints={["100%",0]}
                    enabledContentTapInteraction={false}
                    renderContent={Content}
                    onCloseEnd={() => {props.closeReaction({"onlyclose":false});setDlist([]);setErr(false);setReactiondata(null);}}
                    onOpenStart={() => {getreactions().then(data => {if(data.length > 0){setDlist(data);} else {setErr(true);}});}}
                />
                </View>

            </Portal>
          );

}

export default Reaction;
