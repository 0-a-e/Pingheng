import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import TabContent from './TabContent';
import TabBar from './TabBar';

const Tab = ({publicReactions, id}: {publicReactions: boolean; id: string}) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState(() => {
    let _routes = [
      {key: 'note', title: 'ノート'},
      {key: 'allnote', title: '全ノート'},
      {key: 'media', title: 'メディア'},
    ];
    publicReactions
      ? _routes.push({key: 'reaction', title: 'リアクション'})
      : null;
    return _routes;
  });

  const renderScene = SceneMap({
    note: () => <TabContent userId={id} mode={'note'} />,
    allnote: () => <TabContent userId={id} mode={'allnote'} />,
    media: () => <TabContent userId={id} mode={'media'} />,
    reaction: () => <TabContent userId={id} mode={'reaction'} />,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => <TabBar {...props} onIndexChange={setIndex} />}
    />
  );
};
export default Tab;
