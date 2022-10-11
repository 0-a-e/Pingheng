const useListEditFunc = () => {
  const getHeadTailId = (list, place: string) => {
    if (list.length > 0) {
      if (place === 'head') {
        //から、先頭
        return list[0].id;
      } else if (place === 'tail') {
        //まで、最後
        return list.slice(-1)[0].id;
      }
    }
  };

  const getNewlist = (oldlist, addlist, place: string) => {
    if (place === 'head') {
      return [...addlist, ...oldlist];
    } else if (place === 'tail') {
      return [...oldlist, ...addlist];
    }
    return [];
  };
  return {getHeadTailId, getNewlist};
};

export default useListEditFunc;

/*
const firstUpdate = async () => {
  setIsLoading(true);
  const r = await getNotify('', '');
  setNotifylist(r);
  setIsLoading(false);
};

const tailUpdate = async () => {
  const placeId = getHeadTailId(notifylist, 'tail');
  const addlist = await getNotify('', placeId);
  const newlist = getNewlist(notifylist, addlist, 'tail');
  setNotifylist(newlist);
};

const headUpdate = async () => {
  setIsLoading(true);
  const newPlaceId = getHeadTailId(notifylist, 'head');
  console.log('placeid: ' + newPlaceId);
  const addlist = await getNotify(newPlaceId, '');
  const oldPlaceId = getHeadTailId(addlist, 'head');
  if (oldPlaceId !== newPlaceId) {
    const newlist = getNewlist(notifylist, addlist, 'head');
    setNotifylist(newlist);
  }
  setIsLoading(false);
};
*/
