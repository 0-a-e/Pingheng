import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import NoteView from '../noteView/NoteView';
import Modal from 'react-native-modal';
import EmojisPickerContainer from './emojisPicker/EmojisPickerContainer';
import ExpandableNoteTree from '../ExpandableNoteTree';

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
  const [targetNoteId, setTargetNoteId] = useState<string>('');
  useEffect(() => {
    const noteId = getNoteDataForModal();
    noteId && setTargetNoteId(noteId);
  }, [getNoteDataForModal]);

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
        <ExpandableNoteTree noteId={targetNoteId} />
        <EmojisPickerContainer noteId={targetNoteId} />
      </View>
    </Modal>
  );
};

export default ReactionModal;
