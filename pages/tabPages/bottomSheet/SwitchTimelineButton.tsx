import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTimelineType} from '../../../api/testReduser';

const SwitchTimeline = () => {
  const {
    timeline,
    setTimelineHome,
    setTimelineLocal,
    setTimelineGlobal,
    setTimelineHybrid,
  } = useTimelineType();
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(30,30,46)',
        borderRadius: 50,
        height: 70,
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => {
          setTimelineHome();
        }}
        style={{marginLeft: 5, marginRight: 5}}>
        <Icon
          name="home"
          color={
            timeline === 'homeTimeline'
              ? 'rgba(255,255,255,0.9)'
              : 'rgb(180,180,230)'
          }
          size={45}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTimelineLocal();
        }}
        style={{marginLeft: 5, marginRight: 5}}>
        <Icon
          name="box"
          color={
            timeline === 'localTimeline'
              ? 'rgba(255,255,255,0.9)'
              : 'rgb(180,180,230)'
          }
          size={45}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTimelineGlobal();
        }}
        style={{marginLeft: 5, marginRight: 5}}>
        <Icon
          name="globe"
          color={
            timeline === 'globalTimeline'
              ? 'rgba(255,255,255,0.9)'
              : 'rgb(180,180,230)'
          }
          size={45}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTimelineHybrid();
        }}
        style={{marginLeft: 5, marginRight: 5}}>
        <Icon
          name="shuffle"
          color={
            timeline === 'hybridTimeline'
              ? 'rgba(255,255,255,0.9)'
              : 'rgb(180,180,230)'
          }
          size={45}
        />
      </TouchableOpacity>
    </View>
  );
};

//Props['bottomsheetref'].current.snapTo(1);

export default SwitchTimeline;
