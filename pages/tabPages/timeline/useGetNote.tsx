import {useEffect, useReducer} from 'react';
import {Alert} from 'react-native';
import {useSharedCounter, useTimelineType} from '../../../api/testReduser';
import {sendAPI} from '../../../api/useApi';
import useTimelineTypeTranslator from './useTimelineTypeTranslator';

//あとで無限スクロール対応
const useGetNote = () => {
  useEffect(() => {
    console.log('useGetNoteUseEffect');
    console.log(timeline);
  }, []);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const {notelist, addToHead, addToTail, reset} = useSharedCounter();
  const {timeline} = useTimelineType();
  const {toEndpoint} = useTimelineTypeTranslator();
  const endpoint = toEndpoint(timeline);
  console.log('endpoint: ', endpoint);
  const getNote = async (place: String) => {
    let config = {
      limit: 20,
    };
    if (notelist.length > 0) {
      if (place === 'head') {
        //から、先頭
        config.sinceId = notelist[0].id;
      } else if (place === 'tail') {
        //まで、最後
        config.untilId = notelist.slice(-1)[0].id;
      }
    }
    console.log(endpoint);
    console.log(config);
    const data = await sendAPI([true, 'notes/' + endpoint, config]);
    if (data) {
      if (place === 'head') {
        addToHead(data);
      } else if (place === 'tail') {
        addToTail(data);
      } else {
        addToHead(data);
      }
      forceUpdate();
    } else {
      Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
        cancelable: true,
      });
    }
  };

  return {getNote};
};
export default useGetNote;
