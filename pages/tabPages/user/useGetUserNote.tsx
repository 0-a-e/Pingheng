import {Alert} from 'react-native';
import {sendAPI} from '../../../api/useApi';

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

  return {getUserNote};
};
export default useGetUserNote;
