import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Button} from '@rneui/base';
import 'react-native-get-random-values';
//import HMSAvailability, {ErrorCode} from "@hmscore/react-native-hms-availability";
import Video from 'react-native-video';
import loginProcess from './registerComponent/loginProcess';
import registerStyles from './registerComponent/registerStyles';
import ManualServerModal from './registerComponent/ManualServerModal';

//メモ あとでreact-native-elementsから標準のbuttonに変更
const Register = () => {
  const [manualloginvisible, setmanualloginvisible] = useState(false);

  const switchManualLoginVisible = () => {
    setmanualloginvisible(!manualloginvisible);
  };

  return (
    <View style={registerStyles.background}>
      <Video
        source={{
          uri: 'https://freetestdata.com/wp-content/uploads/2022/02/Free_Test_Data_1MB_MP4.mp4',
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
        <Button
          style={{borderRadius: 50}}
          buttonStyle={registerStyles.startButton}
          titleStyle={registerStyles.startButtonTitle}
          containerStyle={registerStyles.startButtonContainer}
          title="はじめる"
          onPress={() => {
            loginProcess('https://msk.seppuku.club');
          }}
        />
        <Button
          style={{borderRadius: 50}}
          containerStyle={registerStyles.manualServerButtonContainer}
          title="別のインスタンスで使用する"
          type="clear"
          onPress={() => {
            switchManualLoginVisible();
          }}
        />
      </View>
      <ManualServerModal
        visible={manualloginvisible}
        switchManualLoginVisible={switchManualLoginVisible}
      />
    </View>
  );
};
export default Register;
