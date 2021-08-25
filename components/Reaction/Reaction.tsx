import ActionSheet from "react-native-actions-sheet";
import React, { useContext,useRef, useState,memo } from "react";
import { StyleSheet, Text, View,ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { sendAPI } from "../../data/useAPI";
import ParseEmoji from "../../data/Emojis/ParseEmoji";
import * as Progress from 'react-native-progress';

const Reaction = (props: {reactionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
  /*const reactiondata = props.Egetreactiondata();
  
  const getreactions = (reactiondata: any) => {
    let dlist: { name: string; user: any[]; }[] = [];
    try {
      console.log(reactiondata["item"]["emojis"]);
      sendAPI(["","notes/reactions",{"noteId":reactiondata["item"]["id"],limit:100}]).then(data => {
        if(data){
          dlist = [];
          Object.keys(reactiondata["item"]["reactions"]).forEach(function (key) {
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
       }
      });
    } catch {
      console.log("noreactiondata.item");
    }
  };

  console.log("============================================");
  console.log(dlist);
  console.log("============================================");
  */
  //let dlist = [{"name":":o:","user":[]},{"name":":seppuku:","user":[]},{"name":":suki:","user":[]}];
  let dlist = [];
  /*
  const [contentheight,contentheightwrite] = useState();
    const closesheet = () => {
        props.reactionSheetRef.current?.setModalVisible(false);
    }

        let myRef = useRef();
      
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
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'darkgrey',
                  borderRadius: 50,
                }}
              >
                 <ParseEmoji text={d.name} emojis={reactiondata["item"]["emojis"]} textStyle={{color:"#fff",fontSize:16}} />
              </View>
            </TouchableOpacity>
        )};
      
        const RenderSectionraw = (props) => {
          console.log(props.item.user);
          return (
          <View
            style={{
              width: '100%',
              padding: 10,
              borderWidth: 0,
              height:contentheight,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                borderBottomWidth: 2,
                color: 'white',
                borderColor: 'black',
              }}
            >
              dddpwjmep {props.index}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 20,color:"white" }}>
              dfgh
            </Text>
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
      */
          return (
            <ActionSheet containerStyle={{backgroundColor:"#14141c"}} ref={props.reactionSheetRef} onOpen={console.log} drawUnderStatusBar={false} indicatorColor={"white"} headerAlwaysVisible={true}>
            <View style={{width: '100%', flexDirection: 'row'}}>
            {dlist.length > 0 ?
              <>
                <Text>ddd</Text>
              </>
              :
              <>
                <View style={{width: '100%', backgroundColor: "#14141c", alignItems: 'center', }}>
                <Progress.Bar indeterminate={true} width={null} style={{width:"100%"}} borderRadius={0} borderWidth={0}/>
                <Text style={{marginTop:10,color:"white",fontSize:14}}>読み込み中...</Text>
                </View>
              </>
              }
            </View>
            </ActionSheet>
          );

}
/*
 <Btnlist />
              <FlatList
                    //onLayout={d => (!contentheight && contentheight != d.nativeEvent.layout.height) ? contentheightwrite(d.nativeEvent.layout.height): console.log(contentheight)}
                    onLayout={d => (d.nativeEvent.layout.height && !(contentheight == d.nativeEvent.layout.height)) && contentheightwrite(d.nativeEvent.layout.height)}
                    style={{ width: '100%', backgroundColor: "", zIndex: 2 }}
                    data={dlist}
                    renderItem={({ item, index }) => <RenderSection item={item} index={index} />}
                    ref={myRef}
                    initialScrollIndex={0}
                    initialNumToRender={9999}
                    keyExtractor={item => item.name}
                    scrollEventThrottle={1}
                    snapToAlignment={"start"}
                    decelerationRate={"fast"}
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


                    */
export default Reaction;