import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import SwitchTimelineButton from './SwitchTimelineButton';

function BottomSheetModule(sheetProps: {navigation: any}) {
  //const [bartoggle, bartoggleWrite] = useState(true);

  const bottomsheetref = React.useRef();
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
        <TouchableOpacity
          onPress={() => {
            bottomsheetref.current.snapTo(0);
          }}
          style={{alignItems: 'center'}}>
          <Icon size={30} name="arrow-up" color="rgb(180,180,230)" />
          <Text style={{color: 'white'}}>(仮)</Text>
        </TouchableOpacity>
        <Navbtn icon="bell" indexname="Notify" />
      </View>
    );
  }

  const Insheet = () => (
    <View style={{height: '100%', backgroundColor: 'rgba(5,5,20,0.95)'}}>
      <MyTab />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'transparent',
          width: '100%',
          height: 190,
        }}>
        <TouchableOpacity
          onPress={() => {
            sheetProps.navigation.navigate('Settings');
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'rgb(30,30,46)',
            position: 'absolute',
            top: 0,
            right: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon size={30} name="settings" color="rgb(180,180,230)" />
        </TouchableOpacity>
      </View>
      <SwitchTimelineButton />
    </View>
  );

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
