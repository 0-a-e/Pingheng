import {Alert} from 'react-native';
import {sendAPI} from '../../../api/useApi';

//あとで無限スクロール対応
const useGetUserNote = (props: {
  ifWithFiles: boolean;
  ifAllNote: boolean;
  userId: string;
  point?: string;
}) => {
  const optionConfig = {
    userId: props.userId,
    limit: 20,
    withFiles: props.ifWithFiles,
    includeMyRenotes: props.ifAllNote,
    includeReplies: props.ifAllNote,
  };
  const endPoint = 'users/' + props.point;
  const getUserNote = async (sinceId?: string, untilId?: string) => {
    let config = {...optionConfig};
    if (sinceId && sinceId !== '') {
      config.sinceId = sinceId;
    }
    if (untilId && untilId !== '') {
      config.untilId = untilId;
    }
    console.log(config);
    const data = await sendAPI([true, endPoint, config]);
    if (data) {
      return data;
    } else {
      Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
        cancelable: true,
      });
      return false;
    }
  };

  const getHeadTailId = (notelist, place: string) => {
    if (notelist.length > 0) {
      if (place === 'head') {
        //から、先頭
        return notelist[0].id;
      } else if (place === 'tail') {
        //まで、最後
        return notelist.slice(-1)[0].id;
      }
    }
  };

  const getNewNotelist = (notelist, addlist, place: string) => {
    if (place === 'head') {
      return [...addlist, ...notelist];
    } else if (place === 'tail') {
      return [...notelist, ...addlist];
    }
    return [];
  };

  return {getUserNote, getHeadTailId, getNewNotelist};
};
export default useGetUserNote;
