import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import NoteView from '../noteView/NoteView';
import Modal from 'react-native-modal';
import EmojisPickerContainer from './emojisPicker/EmojisPickerContainer';

const ReactionModal = ({
  modalVisible,
  getNoteDataForModal,
  switchModalVisible,
}: {
  modalVisible: boolean;
  getNoteDataForModal: any;
  switchModalVisible: any;
}) => {
  const [noteData, setNoteData] = useState();
  const notedata = getNoteDataForModal();

  return (
    <Modal
      visible={modalVisible}
      onTouchOutside={() => {
        //  serverInfoModalProps.switchServerInfoModalVisible();
      }}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      propagateSwipe={true}
      swipeDirection={['up', 'down']}
      backdropOpacity={0.8}
      animationInTiming={700}
      animationOutTiming={700}
      animationType="slide"
      onSwipeComplete={() => switchModalVisible()}
      onSwipeDown={() => {
        switchModalVisible();
      }}>
      <View style={{flex: 1, backgroundColor: 'rgb(31, 34, 42)'}}>
        <TouchableOpacity
          onPress={() => {
            switchModalVisible();
          }}>
          <Text style={{color: 'red'}}>閉じる</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 10,
            minHeight: 100,
            overflow: 'hidden',
          }}>
          {/* <NoteView data={noteData} />*/}
          <Text style={{bottom: 0, position: 'absolute'}}>ツリーを展開</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 130,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '45%',
              borderBottomStartRadius: 20,
              borderTopStartRadius: 20,
              borderBottomEndRadius: 0,
              borderTopEndRadius: 0,
              backgroundColor: 'rgb(10,10,18)',
              height: 60,
              borderRightWidth: 0.5,
              borderColor: '#202020',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            //     onPress={() => props.addreaction(':❤️:')}
          >
            <Image
              key={'fav'}
              style={{width: 40, height: 40}}
              source={require('../../../../public/svg/heart.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '45%',
              borderBottomEndRadius: 20,
              borderTopEndRadius: 20,
              borderBottomStartRadius: 0,
              borderTopStartRadius: 0,
              backgroundColor: 'rgb(10,10,18)',
              height: 60,
              borderLeftWidth: 0.5,
              borderColor: '#202020',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            //   onPress={() => props.addreaction(':👍:')}
          >
            <Image
              key={'fav'}
              style={{width: 40, height: 40}}
              source={require('../../../../public/svg/like.svg')}
            />
          </TouchableOpacity>
        </View>

        <EmojisPickerContainer />
      </View>
    </Modal>
  );
};

export default ReactionModal;
