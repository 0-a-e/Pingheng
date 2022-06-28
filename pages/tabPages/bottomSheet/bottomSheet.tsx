import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import {Button} from '@rneui/base';

function BottomSheetModule(sheetProps: {navigation: any}) {
  // const [Mtoken, Mtokenwrite] = useState();
  // const {TabbarState, TabbarStatewrite} = useContext(TabbarStateContext);

  //const [bartoggle, bartoggleWrite] = useState(true);
  const bottomsheetref = React.useRef();

  /*useEffect(() => {
    const f = async () => {
      const token = await gettoken();
      Mtokenwrite(token);
    };
    f();
  }, []);*/
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
    },
    btmbox: {
      //  flex: 1,
      flexWrap: 'wrap',
      width: '100%',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
    header: {
      backgroundColor: 'rgba(5,5,20,0.95)',
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

  //homeは外部含めたフォロー中
  //globalは外内全部
  //localは内全部
  //hybrid ?
  //  bottomsheetref.current.snapTo(1);
  const Navbtn = (btnProps: {indexname: string; icon: string}) => {
    return (
      <TouchableOpacity
        style={{
          width: 150,
          borderRadius: 20,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          sheetProps.navigation.navigate('Main', {
            screen: btnProps.indexname,
          });
          bottomsheetref.current.snapTo(1);
        }}>
        <Icon size={55} name={btnProps.icon} color="rgb(180,180,230)" />
      </TouchableOpacity>
    );
  };
  function MyTab() {
    return (
      <View style={styles.btmbox}>
        <Navbtn icon="hexagon" indexname="Timeline" />
        <Navbtn icon="bell" indexname="Notify" />
      </View>
    );
  }

  function Insheet() {
    return (
      <View style={{height: '100%', backgroundColor: 'rgba(5,5,20,0.95)'}}>
        <MyTab />
        {/*  <SwitchTimeline Mtoken={Mtoken} bottomsheetref={bottomsheetref} /> */}
      </View>
    );
  }

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <BottomSheet
      //backDropColor="red"
      ref={bottomsheetref}
      initialSnap={1}
      snapPoints={['95%', 70 + 5 + 5 + 8]}
      enabledContentTapInteraction={false}
      renderHeader={Header}
      renderContent={Insheet}
    />
  );
}
export default BottomSheetModule;
