import React, {useMemo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import UserCard from './UserCard';
import SendNoteCard from './sendNoteCard/SendNoteCard';
import SwitchTimelineButton from './SwitchTimelineButton';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';

function BottomSheetModule(sheetProps: {navigation: any}) {
  //const [bartoggle, bartoggleWrite] = useState(true);
  const snapPoints = useMemo(() => [70 + 5 + 5 + 8, '95%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const styles = StyleSheet.create({
    toptab: {
      //  flex: 1,
      flexWrap: 'wrap',
      width: '100%',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },
  });

  //homeは外部含めたフォロー中
  //globalは外内全部
  //localは内全部
  //hybrid ?

  const Navbtn = (btnProps: {indexname: string; icon: string}) => {
    return (
      <TouchableOpacity
        style={{
          width: 150,
          borderRadius: 20,
          height: 70,
          alignItems: 'center',
          // justifyContent: 'center',
        }}
        onPress={() => {
          sheetProps.navigation.navigate('Main', {
            screen: btnProps.indexname,
          });
          bottomSheetRef.current.snapToIndex(0);
        }}>
        <Icon size={40} name={btnProps.icon} color="rgb(180,180,230)" />
      </TouchableOpacity>
    );
  };

  const TopTab = () => (
    <View style={styles.toptab}>
      <Navbtn icon="hexagon" indexname="Timeline" />
      <Navbtn icon="bell" indexname="Notify" />
    </View>
  );

  const Insheet = () => (
    <BottomSheetView
      style={{
        height: '100%',
        alignItems: 'center',
      }}>
      <TopTab />
      <View
        style={{
          width: '85%',
          flex: 1,
        }}>
        <SendNoteCard />
        <UserCard props={sheetProps} bottomSheetRef={bottomSheetRef} />
        <SwitchTimelineButton />
      </View>
    </BottomSheetView>
  );

  return (
    <BottomSheet
      //backDropColor="red"
      ref={bottomSheetRef}
      index={0}
      animationConfigs={animationConfigs}
      snapPoints={snapPoints}
      backgroundStyle={{backgroundColor: 'rgba(5,5,20,1)'}}
      handleIndicatorStyle={{backgroundColor: '#FFF'}}>
      <Insheet />
    </BottomSheet>
  );
}
export default BottomSheetModule;
