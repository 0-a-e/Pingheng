import {Alert} from 'react-native';
import {sendAPI} from './useApi';

const editReaction = async (
  reaction: string,
  noteId: string,
  operation: 'create' | 'delete',
) => {
  const data = await sendAPI([
    true,
    'notes/reactions/' + operation,
    {noteId: noteId, reaction: reaction},
  ]);
  if (!data) {
    Alert.alert('取得エラー', 'n', [], {
      cancelable: true,
    });
  }
};

export default editReaction;
