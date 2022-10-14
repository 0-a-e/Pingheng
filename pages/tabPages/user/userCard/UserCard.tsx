import React, {useEffect} from 'react';
import {View, Image, Text, Dimensions, StyleSheet, Linking} from 'react-native';
import {easeGradient} from 'react-native-easing-gradient';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import UserDetail from './UserDetail';

const UserCard = ({user}) => {
  useEffect(() => {
    translateX.value = -width85;
  }, []);
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const width85 = SCREEN_WIDTH * 0.85;
  const translateX = useSharedValue(0);
  const arrowrotate = useSharedValue(0);
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

  const springConfig: WithSpringConfig = {
    damping: 50,
    mass: 0.5,
    stiffness: 190,
    overshootClamping: true,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      if (-width85 < translateX.value && -width85 / 2 > translateX.value) {
        translateX.value = withSpring(0, springConfig);
        arrowrotate.value = withSpring(180, springConfig);
      } else if (
        -width85 < translateX.value &&
        -width85 / 2 < translateX.value
      ) {
        //格納
        translateX.value = withSpring(-width85, springConfig);
        arrowrotate.value = withSpring(0, springConfig);
      }
    },
  });

  const NameBox = () => {
    const username = () => {
      let un = '@' + user.username;
      if (user.host) {
        un += '@' + user.host;
      }
      return un;
    };
    // メモ usernameのとこは要素ごとifすると特殊文字なのかバージョンとかなのかわからんけど1人エラー出る人いてCSSで消してる
    return (
      <View
        style={userCardStyles.textContainer}
        // タップでnameとusername入れ替わるようにする -> やっぱやめた
      >
        <TouchableOpacity
          onPress={() => {
            if (user.uri) {
              Linking.openURL(user.uri);
            }
          }}>
          <Text style={userCardStyles.nameStyle} numberOfLines={1}>
            {user.name === '' ? username() : user.name || username()}
          </Text>
          <Text
            numberOfLines={1}
            style={{display: user.name ? 'flex' : 'none'}}>
            {username()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const BackgroundBox = () => {
    console.log("bnc", user.bannerColor);
    const {colors, locations} = easeGradient({
      colorStops: {
        0: {
          color: 'rgba(0,0,0,0.2)',
        },
        0.9: {
          color: 'rgb(15,15,20)',
        },
      },
    });
    return (
      <View
        style={[
          // user.bannerColorがあるときはその色?
          // あとで画像から色取得やる
          userCardStyles.backgroundContainer,
        ]}>
        <Image
          source={{
            uri: user.bannerUrl,
          }}
          accessible={true}
          style={userCardStyles.bannerImage}
          //   accessibilityLabel={name}
        />
        <LinearGradient
          colors={colors}
          locations={locations}
          useAngle={true}
          angle={-90}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            flex: 1,
            zIndex: 1,
          }}
        />
      </View>
    );
  };

  const FrontBox = ({children}: {children?: React.ReactNode}) => (
    <View style={userCardStyles.frontCardContainer}>{children}</View>
  );

  const IconBox = () => (
    <View style={userCardStyles.avatarContainer}>
      <TouchableOpacity>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          accessible={true}
          style={userCardStyles.avatarImage}
          //   accessibilityLabel={name}
        />
      </TouchableOpacity>
    </View>
  );

  const ArrowBox = () => (
    <View style={userCardStyles.arrowContainer}>
      <TouchableOpacity
        style={{width: 30}}
        onPress={() => {
          console.log(translateX.value);
          console.log(-width85);
          if (translateX.value <= -width85 + 80) {
            translateX.value = withSpring(0, springConfig);
            arrowrotate.value = withSpring(180, springConfig);
          } else {
            translateX.value = withSpring(-width85, springConfig);
            arrowrotate.value = withSpring(0, springConfig);
          }
        }}>
        <Animated.View style={arrowStyle}>
          <Icon name="arrow-right" color={'#fff'} size={30} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{height: 150, width: '100%'}}>
          <BackgroundBox />
          <FrontBox>
            <IconBox />
            <NameBox />
            <ArrowBox />
          </FrontBox>
          <Animated.View style={[rStyle, userCardStyles.userDetailContainer]}>
            <UserDetail data={user} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default UserCard;

const userCardStyles = StyleSheet.create({
  /* BackgroundBox */
  backgroundContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgb(30,30,36)',
  },
  bannerImage: {
    position: 'absolute',
    width: '100%',
    height: 150,
  },
  /* FrontBox */
  frontCardContainer: {
    position: 'absolute',
    width: '100%',
    height: 75,
    top: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  avatarContainer: {
    width: 95,
    height: 75,
    paddingLeft: 5,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  nameStyle: {
    color: '#fff',
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
  },
  userDetailContainer: {
    position: 'absolute',
    width: '85%',
    height: 150,
    backgroundColor: 'rgb(19,20,26)',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  /*ArrowBox*/
  arrowContainer: {
    height: '100%',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// const opacity = useSharedValue(1);

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
/*
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });
*/
