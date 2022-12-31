import editReaction from '../../../../../api/editReaction';
import {emojisManage} from '../../../../../api/realm/realmManage';
import {emojiType} from '../../../../../types/EmojiTypes';

export const useAddReaction = (noteId: string) => {
  const {addAttribute} = emojisManage();
  const addReaction = (item: emojiType) => {
    addAttribute(item, 'history');
    editReaction(':' + item.name + ':', noteId, 'create');
  };
  return {addReaction};
};
