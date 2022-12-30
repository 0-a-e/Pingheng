import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import WS from 'react-native-websocket';
//import {convert} from '../components/bottomsheet/useSwitchtltranslator';
//import {getInfo} from '../../../api/realm/serverInfo.tsx-save';
import {getUser} from '../../../api/tokenManage';
import {useSharedCounter, useTimelineType} from '../../../api/testReduser';
import React from 'react';
import {v4 as uuidv4} from 'uuid';

export const WSComponent = (
  _refresh: boolean,
  _setrefresh: {(value: SetStateAction<boolean>): void; (arg0: boolean): void},
) => {
  const [ws, setws] = useState();
  const [socketUrl, setSocketUrl] = useState('');
  const {notelist, addToHead, addToTail, reset} = useSharedCounter();
  const {timeline} = useTimelineType();
  const getSocketUrl = useCallback(() => {
    return new Promise<string>(async resolve => {
      const serverInfo = await getInfo();
      const userInfo = await getUser();
      const serverAddr = serverInfo.uri
        .replace('https://', '')
        .replace('http://', '');
      resolve(`wss://${serverAddr}/streaming?i=${userInfo.password}`);
    });
  }, []);
  getSocketUrl().then(url => setSocketUrl(url));
  const sendMsg = () => {
    ws.send(
      JSON.stringify({
        type: 'connect',
        body: {
          channel: 'globalTimeline',
          id: uuidv4(),
          params: {},
        },
      }),
    );
  };

  return (
    <View style={{display: 'none'}}>
      {socketUrl !== '' && (
        <WS
          ref={ref => {
            setws(ref);
          }}
          url={socketUrl}
          onOpen={() => {
            console.log('ws Open!');
            sendMsg();
          }}
          onMessage={note => {
            const data = JSON.parse(note['data']).body;
            if (data.type === 'note') {
              addToHead([data.body]);
            }
          }}
          onError={() => {
            ToastAndroid.show(
              'WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。',
              6000,
            );
            console.log('Websocket Error: ', error);
          }}
          onClose={console.log}
          reconnect
        />
      )}
    </View>
  );
  //const {notelist, addToHead, addToTail, reset} = useSharedCounter();
  //const {timeline} = useTimelineType();
  /* const getSocketUrl = useCallback(() => {
    return new Promise<string>(async resolve => {
      const serverInfo = await getInfo();
      const userInfo = await getUser();
      const serverAddr = serverInfo.uri
        .replace('https://', '')
        .replace('http://', '');
      resolve(`wss://${serverAddr}/streaming?i=${userInfo.password}`);
    });
  }, []);*/
  //const {addoldnote, addnote} = usenotelist(notelist, setnotelist);

  //sendMessage, _lastM, _rds,
  /* const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(
    //getSocketUrl
    'wss://echo.websocket.org',
    {
      onOpen: () => console.log('Websocket opened'),
      share: true,
     // shouldReconnect: _closeEvent => true,
    },
  );
*/
  /*
const {
  sendMessage,
  lastMessage,
  readyState,
  getWebSocket
} = useWebSocket('wss://echo.websocket.org', {
  onOpen: () => console.log('Websocket opened'),
});

  useEffect(() => {
    if (lastMessage !== null) {
      console.log('lastMessage', lastMessage);
    }
  }, []);*/

  // getWebSocket().onmessage = console.log;
  /*  const websocket = getWebSocket();
    const websocket2 = getWebSocket();
    console.log('websocket: ', websocket);
    console.log('ws2', websocket2);
  */
  /* if (websocket) {
      // websocket.onopen = () => console.log('opened');
      websocket.onopen = () => {
        console.log('opened');
        sendMessage(
          JSON.stringify({
            type: 'connect',
            body: {
              channel: 'globalTimeline',
              id: 'timeline',
              params: {},
            },
          }),
        );
      };*/
  /*   websocket.onmessage = message => {
        const data = JSON.parse(message.data);
        if (data.body.type === 'note') {
          addToHead(data.body.body);
        }
        console.log('ws message!');
      };*/
  /*  websocket.onerror = error => {
        ToastAndroid.show(
          'WebSocket接続ができませんでした。インターネット接続やサーバーの状態を確認してください。',
          6000,
        );
        console.log('Websocket Error: ', error);
      };
      websocket.onclose = closeEvent => {
        ToastAndroid.show('WebSocket接続が切断されました。', 6000);
        console.log('Websocket Closed', closeEvent);
      };
      setrefresh(refresh ? false : true);
    }
  }, []);*/

  /* const changetimeline = useCallback((val: any, setbeforeTimelineState) => {
    console.log('--;;', val);
    const websocket = getWebSocket();
    if (websocket && token && val) {
      websocket.send(
        JSON.stringify({
          type: 'disconnect',
          body: {
            id: 'timeline',
          },
        }),
      );
      websocket.send(
        JSON.stringify({
          type: 'connect',
          body: {
            channel: val,
            id: 'timeline',
            params: {},
          },
        }),
      );
      addoldnote(token, val);
      setbeforeTimelineState(val);
    }
  }, []);
*/
  /* return (
    //changetimeline
  );*/
};
