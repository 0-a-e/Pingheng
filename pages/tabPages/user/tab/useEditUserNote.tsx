import useListEditFunc from '../../../../api/useListEditFunc';
import useGetUserNote from './useGetUserNote';
const useEditUserNote = ({
  userId,
  mode,
  notelist,
  setNotelist,
  setIsLoading,
}: {
  userId: string;
  mode: string;
  notelist: any;
  setNotelist: Function;
  setIsLoading: Function;
}) => {
  let config = {
    ifWithFiles: false,
    ifAllNote: false,
    userId: userId,
    point: 'notes',
  };

  switch (mode) {
    case 'note':
      config.ifWithFiles = false;
      config.ifAllNote = false;
      break;
    case 'allnote':
      config.ifWithFiles = false;
      config.ifAllNote = true;
      break;
    case 'media':
      config.ifWithFiles = true;
      config.ifAllNote = false;
      break;
    case 'reaction':
      config.point = 'reactions';
      config.ifAllNote = true;
      break;
    default:
      break;
  }
  const {getUserNote} = useGetUserNote(config);
  const {getHeadTailId, getNewlist} = useListEditFunc();
  const firstUpdate = async () => {
    setIsLoading(true);
    const r = await getUserNote('', '');
    setNotelist(r);
    setIsLoading(false);
    return;
  };

  const tailUpdate = async () => {
    const placeId = getHeadTailId(notelist, 'tail');
    const addlist = await getUserNote('', placeId);
    const newlist = getNewlist(notelist, addlist, 'tail');
    setNotelist(newlist);
    return;
  };

  const headUpdate = async () => {
    setIsLoading(true);
    const newPlaceId = getHeadTailId(notelist, 'head');
    console.log('placeid: ' + newPlaceId);
    const addlist = await getUserNote(newPlaceId, '');
    const oldPlaceId = getHeadTailId(addlist, 'head');
    if (oldPlaceId !== newPlaceId) {
      const newlist = getNewlist(notelist, addlist, 'head');
      setNotelist(newlist);
    }
    setIsLoading(false);
  };
  return {headUpdate, tailUpdate, firstUpdate};
};
export default useEditUserNote;
