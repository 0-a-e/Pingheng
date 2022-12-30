import React, {useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import 'react-native-get-random-values';
//import HMSAvailability, {ErrorCode} from "@hmscore/react-native-hms-availability";
import Video from 'react-native-video';
import loginProcess from './loginProcess';
import registerStyles from './registerStyles';
import ManualServerModal from './ManualServerModal';

const Register = () => {
  const [manualloginvisible, setmanualloginvisible] = useState(false);

  const switchManualLoginVisible = () => {
    setmanualloginvisible(!manualloginvisible);
  };

  return (
    <View style={registerStyles.background}>
      <Video
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/002/018/013/mp4/hd-bars-and-tone-free-video.mp4',
        }}
        style={[
          {height: Dimensions.get('window').height},
          registerStyles.videoStyle,
        ]}
        muted={true}
        repeat={true}
        volume={0}
        resizeMode={'cover'}
        //   rate={1.0}
        //  ignoreSilentSwitch={"obey"}
      />
      <View style={registerStyles.bottomBox}>
        <TouchableOpacity
          onPress={() => {
            loginProcess('https://msk.seppuku.club');
          }}
          style={registerStyles.startButton}>
          <Text style={registerStyles.startButtonTitle}>はじめる</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            switchManualLoginVisible();
          }}>
          <Text>別のインスタンスで使用する</Text>
        </TouchableOpacity>
      </View>
      <ManualServerModal
        visible={manualloginvisible}
        switchManualLoginVisible={switchManualLoginVisible}
      />
    </View>
  );
};
export default Register;
