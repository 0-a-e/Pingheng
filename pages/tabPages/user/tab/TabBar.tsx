import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import TabButton from './TabButton';
import {Measure} from './types';
import {Route, TabViewProps} from 'react-native-tab-view';
import TabBarBackground from './TabBarBackground';

type Props<T extends Route> = Parameters<
  NonNullable<TabViewProps<T>['renderTabBar']>
>[0] & {
  onIndexChange: (index: number) => void;
};

const TabBar = <T extends Route>(props: Props<T>) => {
  const samplemeasures = [
    {x: 20, y: 2, width: 100, height: 100},
    {x: 40, y: 9, width: 100, height: 100},
    {x: 60, y: 50, width: 100, height: 100},
  ];
  const containerRef = useRef<View | null>(null);
  const inputRange = props.navigationState.routes.map((_, i) => i);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const refs = useMemo(
    () =>
      [...new Array(props.navigationState.routes.length)].map(() =>
        React.createRef<View>(),
      ),
    [props.navigationState.routes.length],
  );
  console.log("refs", refs);
 // console.log("containerRef", containerRef.current);
  useEffect(() => {
    console.log('erswer');
    const measureValues: Measure[] = [];

    setTimeout(() => {
      refs.forEach(r => {
        console.log("r: ", r);
        if (!r.current) {
          return;
        }

        r.current.measureLayout(
          containerRef.current as any,
          (x, y, width, height) => {
            console.log('swrfarw');
            console.log(x);
            console.log(y);
            console.log(width);
            console.log(height);
            console.log('dsgegfs');
            measureValues.push({
              x,
              y,
              width,
              height,
            });
          },
          () => {},
        );
      });
      setMeasures(measureValues);
    });
  }, [refs]);
  //  console.log(props.navigationState.routes);
  console.log('drtety');
  console.log(measures.length);
  console.log(measures);
  console.log('drtety');
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'rgb(19,20,26)',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={containerRef}>
      {props.navigationState.routes.map((item, index: number) => {
        return (
          <TabButton
            key={index}
            icon=""
            title={item.title}
            jumpTo={props.jumpTo}
            route={item.key}
          />
        );
      })}
      {measures && (
        <TabBarBackground
          measures={samplemeasures}
          position={props.position}
          navigationState={props.navigationState}
        />
      )}
    </View>
  );
};

export default TabBar;
