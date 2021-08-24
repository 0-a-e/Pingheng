import ActionSheet from "react-native-actions-sheet";
import React, { useContext,useRef, useState,memo } from "react";
import { StyleSheet, Text, View,ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { FlatList } from "react-native-gesture-handler";

const Reaction = (props: {reactionSheetRef: React.LegacyRef<ActionSheet> | undefined; }) => {
  const [contentheight,contentheightwrite] = useState();
    const closesheet = () => {
        props.reactionSheetRef.current?.setModalVisible(false);
    }

        const Sections = [{name:"a"},{name:"b"},{name:"c"},{name:"d"},{name:"e"},
        {name:"f"},{name:"g"},{name:"h"},{name:"i"},{name:"j"},{name:"k"},{name:"l"},{name:"m"},{name:"n"},{name:"o"},{name:"p"},{name:"q"},{name:"r"},
          {name:"s"},{name:"t"},{name:"u"},{name:"v"},{name:"w"},{name:"z"}
        ];
        
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
                <Text>{index}</Text>
              </View>
            </TouchableOpacity>
        )};
      
      
        const RenderSectionraw = (d) => {
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
              dddpwjmep {d.index}
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
                {Sections.map(renderSectionButton)}
          </ScrollView>
          </View>
          </View>
        );
      
          return (
            <ActionSheet containerStyle={{backgroundColor:"#14141c"}} ref={props.reactionSheetRef} drawUnderStatusBar={false} indicatorColor={"white"} headerAlwaysVisible={true}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Btnlist />
              <FlatList
                //onLayout={d => (!contentheight && contentheight != d.nativeEvent.layout.height) ? contentheightwrite(d.nativeEvent.layout.height): console.log(contentheight)}
                onLayout={d => contentheightwrite(d.nativeEvent.layout.height)}
                style={{width:'100%',backgroundColor:"",zIndex:2}}
                data={Sections}
                renderItem={({item,index}) => <RenderSection index={index}/>}
                ref={myRef}
                initialScrollIndex={0}
                initialNumToRender={9999}
                keyExtractor={item => item.name}
                scrollEventThrottle={1}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            </ActionSheet>
          );

}
export default Reaction;