import React, {useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {emojisManage} from '../../../../../api/realm/realmManage';
import {emojiType, emojisType} from '../../../../../types/EmojiTypes';
import EmojisPicker from './EmojisPicker';
import FavAndHistoryEmojiPicker from './FavAndHistoryEmojiPicker';

const EmojisPickerContainer = () => {
  const [emojis, setEmojis] = useState<emojisType>();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const {getEmojis} = emojisManage();
  const [routes, setRoutes] = useState(() => {
    return [{key: 'none', title: 'none'}];
  });

  useEffect(() => {
    getEmojis().then((emojis: emojiType[]) => {
      const result = new Map<string, emojiType[]>();
      result.set('PINGHENG_FAVANDHISTORY_PINGHENG', []);
      emojis.forEach((item: emojiType) => {
        const category =
          item.category === null || item.category === ''
            ? '未分類'
            : item.category;
        if (result.has(category)) {
          result.get(category).push(item);
        } else {
          result.set(category, [item]);
        }
      });

      const navRoute = [...result.keys()].map(item => {
        return {key: item, title: item};
      });

      setRoutes(navRoute);
      setEmojis(result);
    });
  }, []);

  const renderScene = ({route}) => {
    if (Math.abs(index - routes.indexOf(route)) > 2) {
      return <View />;
    }
    if (emojis) {
      if (route.key === 'PINGHENG_FAVANDHISTORY_PINGHENG') {
        return <FavAndHistoryEmojiPicker />;
      } else {
        return (
          <EmojisPicker key={route.key} routeKey={route.key} emojis={emojis} />
        );
      }
    } else {
      return <View />;
    }
  };

  /*ラグくなるからあとで読み込み何とかする*/
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

const renderTabBar = props => (
  <TabBar {...props} scrollEnabled tabStyle={{width: 100, height: 40}} />
);

export default EmojisPickerContainer;
