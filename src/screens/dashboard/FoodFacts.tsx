import { useEffect, useState } from 'react';
import { Text, Animated, LayoutChangeEvent } from 'react-native';

import IconButton from '@components/iconButton';
import { IconFamily } from '@constants';
import { globalStyles } from '@themes';
import { Animation } from '@utility/animation';

import styles from './styles';

const foodFacts = (trivia: string) => {
  const [bottomPosition, setBottomPosition] = useState(0);

  const translateY = Animation.newValue(0);

  const animate = (show: boolean) => {
    Animation.timing(translateY, show ? 1 : 0, 1000).start();
  };

  useEffect(() => {
    if (trivia) animate(true);
  }, [trivia]);

  const getBottomPosition = (e: LayoutChangeEvent) => {
    const { y } = e.nativeEvent.layout;
    setBottomPosition(y);
  };

  if (!trivia) return null;

  const translateYInterpolate = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [bottomPosition, 0],
  });

  const containerStyles = [
    globalStyles.columnCenter,
    styles.triviaContainer,
    { transform: [{ translateY: translateYInterpolate }] },
  ];

  return (
    <Animated.View
      style={containerStyles}
      onLayout={getBottomPosition}
    >
      <IconButton
        family={IconFamily.entypo}
        name={'cross'}
        style={styles.closeTriviaIcon}
        onPress={() => animate(false)}
      />
      <Text style={styles.triviaTitle}>Did You Know?</Text>
      <Text style={styles.triviaDescription}>{trivia}</Text>
    </Animated.View>
  );
};

export default foodFacts;
