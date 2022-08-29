import React from 'react';
import {View} from 'react-native';
import TabButton from './TabButton';

const TabBar = (props) => {
  //  console.log(props.navigationState.routes);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#4d4d4d',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.navigationState.routes.map((item, _index: number) => (
        <TabButton
          icon=""
          title={item.title}
          jumpTo={props.jumpTo}
          route={item.key}
        />
      ))}
    </View>
  );
};

export default TabBar;
