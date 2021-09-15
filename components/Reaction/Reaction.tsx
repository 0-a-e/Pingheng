import ActionSheet from "react-native-actions-sheet";
import React, { useContext,useRef, useState,memo } from "react";
import { StyleSheet, Text, View,ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { sendAPI } from "../../data/useAPI";
import ParseEmoji from "../../data/Emojis/ParseEmoji";
import * as Progress from 'react-native-progress';
import { Avatar } from "react-native-elements";
import { v4 as uuidv4 } from "uuid";
import BottomSheet from 'reanimated-bottom-sheet';
import { Portal } from 'react-native-portalize';

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

    const closesheet = () => {
        props.reactionSheetRef.current?.snapTo(1);
    }

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
            {props.item.user.name != null && <ParseEmoji emojis={props.item.user.emojis} text={props.item.user.name} textStyle={{color:"#fff"}}/>}
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
               <ParseEmoji text={d.name} emojis={reactiondata["emojis"]} textStyle={{color:"#fff",fontSize:16}} />
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
         //     ref={myRef}
              initialScrollIndex={0}
              initialNumToRender={9999}
              keyExtractor={item => item.name + uuidv4()}
              scrollEventThrottle={1}
           //   snapToAlignment={"start"}
           //   decelerationRate={"fast"}
           //   pagingEnabled={true}
            //  showsVerticalScrollIndicator={false}
           //   showsHorizontalScrollIndicator={false} 
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
  
        const Content = () => {
          return(
            <View style={{height:"100%"}}>
                <TouchableOpacity onPress={closesheet} style={{height: '10%'}} />
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
                  showsHorizontalScrollIndicator={false} />
              </>
              : err ?
              <>
              <View style={{width: '100%', backgroundColor: "#14141c", alignItems: 'center', }}>
              <Text style={{marginTop:16,color:"white",fontSize:14,marginBottom:20}}>エラーが発生しました</Text>
              </View>
            </>
              :
              <>
                <View style={{width: '100%', backgroundColor: "#14141c", alignItems: 'center',height:Dimensions.get("window").height}}>
                <Progress.Bar indeterminate={true} useNativeDriver={true}  width={null} style={{width:"100%"}} borderRadius={0} borderWidth={0}/>
                <Text style={{marginTop:10,color:"white",fontSize:14,marginBottom:20}}>読み込み中...</Text>
                </View>
              </>
              }
            </View>
            </View>
          )
     //     return(<View style={{backgroundColor:"#14141c",width: '100%', height: '100%'}}></View>);
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
                    onCloseStart={() => {setDlist([]);setErr(false);setReactiondata(null);}}
                    onOpenStart={() => {getreactions().then(data => {if(data.length > 0){setDlist(data);} else {setErr(true);}});}}
                />
                </View>

            </Portal>
          );

}

export default Reaction;

        /*     <ActionSheet
              containerStyle={{backgroundColor:"rgb(19,20,26)",borderRadius:20,height:(Dimensions.get("window").height /10) * 9}}
              ref={props.reactionSheetRef}
              onClose={() => {setDlist([]);setErr(false);setReactiondata(null);}}
              onOpen={() => {getreactions().then(data => {if(data.length > 0){setDlist(data);} else {setErr(true);}});}}
              drawUnderStatusBar={false}
              indicatorColor={"white"}
              headerAlwaysVisible={true}
            >
            */