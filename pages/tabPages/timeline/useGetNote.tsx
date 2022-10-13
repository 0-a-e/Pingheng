import {useReducer} from 'react';
import {Alert} from 'react-native';
import {useSharedCounter, useTimelineType} from '../../../api/testReduser';
import {sendAPI} from '../../../api/useApi';
import useListEditFunc from '../../../api/useListEditFunc';
import useTimelineTypeTranslator from './useTimelineTypeTranslator';

const useGetNote = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const {notelist, addToHead, addToTail, reset} = useSharedCounter();
  const {timeline} = useTimelineType();
  const {toEndpoint} = useTimelineTypeTranslator();
  const endpoint = toEndpoint(timeline);
  const {getHeadTailId, getNewlist} = useListEditFunc();

  const headUpdate = async () => {
    let config = {
      limit: 20,
    };
    if (notelist.length > 0) {
      config.sinceId = getHeadTailId(notelist, 'head');
    }
    await getNote(config, 'head');
    return;
  };
  const tailUpdate = async () => {
    let config = {
      limit: 20,
    };
    if (notelist.length > 0) {
      config.untilId = getHeadTailId(notelist, 'tail');
    }
    await getNote(config, 'tail');
    return;
  };
  const getNote = async (config: Object, place: string) => {
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
    return;
  };
  return {headUpdate, tailUpdate};
};
export default useGetNote;
