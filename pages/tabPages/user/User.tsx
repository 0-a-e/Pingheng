import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {sendAPI} from '../../../api/useApi';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  WithSpringConfig,
  withTiming,
  withSpring,
  concat,
  interpolate,
  spring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
const UserScreen = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userId = props.route.params.id;
    sendAPI([true, 'users/show', {userId: userId}]).then(data => {
      console.log(data);
      if (data) {
        setUser(data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
  }, [props.route.params]);
  const translateX = useSharedValue(0);
  const arrowrotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const width85 = SCREEN_WIDTH * 0.85;
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      console.log(-width85 / 2);
      console.log(translateX.value);
      if (-width85 / 2 < translateX.value) {
        translateX.value = withSpring(0);
        arrowrotate.value = withSpring(180);
      } else {
        //格納
        translateX.value = withSpring(-width85);
        arrowrotate.value = withSpring(0);
      }
    },
  });
  /* const onGestureEvent = useAnimatedGestureHandler({
    // Set the context value to the sheet's current height value
    onStart: (_ev, ctx: any) => {
      ctx.offsetY = sheetHeight.value;
    },
    // Update the sheet's height value based on the gesture
    onActive: (ev, ctx: any) => {
      sheetHeight.value = ctx.offsetY + ev.translationY;
    },
    // Snap the sheet to the correct position once the gesture ends
    onEnd: () => {
      // 'worklet' directive is required for animations to work based on shared values
      'worklet';
      // Snap to expanded position if the sheet is dragged up from minimised position
      // or dragged down from maximised position
      const shouldExpand =
        (position.value === 'maximised' &&
          -sheetHeight.value < maxHeight - DRAG_BUFFER) ||
        (position.value === 'minimised' &&
          -sheetHeight.value > minHeight + DRAG_BUFFER);
       // Snap to minimised position if the sheet is dragged down from expanded position
      const shouldMinimise =
        position.value === 'expanded' &&
        -sheetHeight.value < expandedHeight - DRAG_BUFFER;
       // Snap to maximised position if the sheet is dragged up from expanded position
      const shouldMaximise =
        position.value === 'expanded' &&
        -sheetHeight.value > expandedHeight + DRAG_BUFFER;
       // Update the sheet's position with spring animation
      if (shouldExpand) {
        navHeight.value = withSpring(0, springConfig);
        sheetHeight.value = withSpring(-expandedHeight, springConfig);
        position.value = 'expanded';
      } else if (shouldMaximise) {
        navHeight.value = withSpring(NAV_HEIGHT + 10, springConfig);
        sheetHeight.value = withSpring(-maxHeight, springConfig);
        position.value = 'maximised';
      } else if (shouldMinimise) {
        navHeight.value = withSpring(0, springConfig);
        sheetHeight.value = withSpring(-minHeight, springConfig);
        position.value = 'minimised';
      } else {
        sheetHeight.value = withSpring(
          position.value === 'expanded'
            ? -expandedHeight
            : position.value === 'maximised'
            ? -maxHeight
            : -minHeight,
          springConfig,
        );
      }
    },
  });*/
  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${arrowrotate.value}deg`}],
    };
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  /*
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });
*/
  const springConfig: WithSpringConfig = {
    damping: 50,
    mass: 0.3,
    stiffness: 120,
    overshootClamping: true,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
  };

  const test1 = () => {
    console.log(user.id);
    sendAPI([true, 'users/notes', {userId: user.id, limit: 10}]).then(data => {
      if (data) {
        console.log('data: ', data);
      } else {
        Alert.alert('取得エラー', 'hogehoge(枠外をタップして非表示)', [], {
          cancelable: true,
        });
      }
    });
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Image
            source={{
              uri: user.bannerUrl,
            }}
            accessible={true}
            style={{
              position: 'absolute',
              width: '100%',
              height: 150,
              borderRadius: 0,
            }}
            //   accessibilityLabel={name}
          />
          <View
            style={{
              position: 'relative',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 150,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  backgroundColor: '#fff',
                  width: 75,
                  height: 75,
                  marginLeft: 5,
                }}>
                <Image
                  source={{
                    uri: user.avatarUrl,
                  }}
                  accessible={true}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                    marginLeft: 0,
                  }}
                  //   accessibilityLabel={name}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                }}
                // タップでnameとusername入れ替わるようにする
                onPress={() => {}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    textShadowColor: 'rgba(0, 0, 0, 0.8)',
                    textShadowOffset: {width: 0, height: 0},
                    textShadowRadius: 4,
                  }}>
                  {user.username}
                  {/*user.name*/}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                translateX.value = withSpring(0, springConfig);
              }}
              style={{marginRight: 10}}
              >
              <Animated.View
                style={arrowStyle}>
                <Icon name="arrow-right" color={'#fff'} size={30} />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '85%',
                height: 150,
                backgroundColor: 'lightgreen',
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
              },
              rStyle,
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
      <TouchableOpacity
        onPress={() => {
          translateX.value = withSpring(0, springConfig);
          arrowrotate.value = withSpring(180, springConfig);
        }}
        style={{
          width: 70,
          height: 70,
          backgroundColor: 'lightblue',
        }}
      />
      <TouchableOpacity
        onPress={() => {
          translateX.value = withSpring(-width85, springConfig);
          arrowrotate.value = withSpring(0, springConfig);
        }}
        style={{
          width: 70,
          height: 70,
          backgroundColor: 'lightgreen',
        }}
      />

      <TouchableOpacity
        onPress={() => {
          test();
        }}>
        <Text>sefgsrg</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          test1();
        }}>
        <Text>sefg</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default UserScreen;
