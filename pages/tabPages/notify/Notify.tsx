import React, {useEffect} from 'react';
import {
  View,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {sendAPI} from '../../../api/useApi';
import useListEditFunc from '../../../api/useListEditFunc';
import NotifyView from './NotifyView';

const ListKey = (props: any) => {
  return props.id;
};

function NotifyScreen() {
  const [notifylist, setNotifylist] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {getHeadTailId, getNewlist} = useListEditFunc();

  useEffect(() => {
    console.log('NotifyUseEffect');
    firstUpdate();
  }, []);

  const getNotify = async (sinceId?: string, untilId?: string) => {
    let config = {limit: 20};
    if (sinceId && sinceId !== '') {
      config.sinceId = sinceId;
    }
    if (untilId && untilId !== '') {
      config.untilId = untilId;
    }
    console.log(config);
    const data = await sendAPI([true, 'i/notifications', config]);
    if (data) {
      return data;
    } else {
      Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
        cancelable: true,
      });
      return false;
    }
  };

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={notifylist}
        style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}
        keyExtractor={item => ListKey(item)}
        renderItem={item => <NotifyView data={item} />}
        refreshControl={
          <RefreshControl
            colors={['rgb(19,20,26)', '#000']}
            refreshing={isLoading}
            onRefresh={() => {
              headUpdate();
            }}
          />
        }
        onEndReached={() => {
          tailUpdate();
        }}
        ListFooterComponent={() => (
          <View style={{backgroundColor: 'red', height: 100, width: '100%'}}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </View>
  );
}
export default NotifyScreen;
