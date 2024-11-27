import { useRef } from 'react';
import { View, Text, Image, PanResponder, Animated, Pressable } from 'react-native';

import Dialog from '@components/dialog';
import IconButton from '@components/iconButton';
import { defaultLayout, IconFamily, Images } from '@constants';
import { globalStyles } from '@themes';

import styles from './styles';

const jokeDialog = (joke: string) => {
  return (
    <View style={[globalStyles.columnCenter, styles.jokeDialog]}>
      <Image
        source={Images.foodJoke}
        style={styles.jokeImage}
      />
      <Text style={styles.jokeHeadline}>Joke</Text>
      <Text style={styles.jokeText}>{joke}</Text>
      <IconButton
        family={IconFamily.entypo}
        name="cross"
        onPress={() => Dialog.hide()}
        containerStyle={styles.closeDialogIcon}
      />
    </View>
  );
};

const foodJoke = (joke: string) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => pan.extractOffset(),
    }),
  ).current;

  const floatingContainerStyles = [
    styles.jokeFloatingButtonContainer,
    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
  ];

  return (
    <Animated.View
      style={floatingContainerStyles}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={() =>
          Dialog.show({
            child: jokeDialog(joke),
          })
        }
      >
        <Image
          source={Images.foodJoke}
          style={globalStyles.fullDimensions}
        />
      </Pressable>
    </Animated.View>
  );
};

export default foodJoke;