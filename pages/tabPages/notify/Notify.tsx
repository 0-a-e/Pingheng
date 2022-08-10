import React, {useEffect} from 'react';
import {View, Text, Alert, FlatList, RefreshControl} from 'react-native';
import {sendAPI} from '../../../api/useApi';
import NotifyView from './NotifyView';

const ListKey = (props: any) => {
  return props.id;
};

function NotifyScreen() {
  const [notifylist, setnotifylist] = React.useState([]);
  const [refresh, setrefresh] = React.useState(false);
  useEffect(() => {
    console.log('NotifyUseEffect');
    getNotify(false);
  }, []);

  const getNotify = (ifRefresh: Boolean) => {
    if (ifRefresh) {
      setrefresh(true);
    }
    sendAPI([true, 'i/notifications', {limit: 50}]).then(data => {
      if (data) {
        setnotifylist(data);
      } else {
        Alert.alert('通知取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
    if (ifRefresh) {
      setrefresh(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <FlatList
        data={notifylist}
        style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}
        keyExtractor={item => ListKey(item)}
          renderItem={item => <NotifyView data={item} />}
       /* renderItem={item => (
          <Text style={{color: '#fff'}}>{JSON.stringify(item)}</Text>
        )}*/
        refreshControl={
          <RefreshControl
            colors={['rgb(19,20,26)', '#000']}
            refreshing={refresh}
            onRefresh={() => {
              getNotify(true);
            }}
          />
        }
      />
    </View>
  );
}
export default NotifyScreen;
