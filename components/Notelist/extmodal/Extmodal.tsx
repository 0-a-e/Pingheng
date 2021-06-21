import Modal from 'react-native-modal';
import React from "react"
import { View } from 'react-native';

const Extmodal = () => {
return(
    <View>
        <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
)
}
export default Extmodal;