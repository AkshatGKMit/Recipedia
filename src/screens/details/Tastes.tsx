import { useState, useEffect, useContext } from 'react';
import { Easing, View, Text, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import DetailsContext from '@config/DetailsContext';
import { Animation } from '@utility/animation';

import styles from './styles';

const Taste = ({ title, value }: { title: string; value: number }) => {
  const isFocused = useIsFocused();

  const [barWidth, setBarWidth] = useState(0);
  const width = Animation.newValue(0);

  useEffect(() => {
    Animation.timing(width, 1, 1000, Easing.inOut(Easing.ease), false).start();
  }, [barWidth, isFocused]);

  const widthInterpolate = width.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (value * barWidth) / 100],
  });

  const animatedStyles = [styles.tasteProgress, { width: widthInterpolate }];

  return (
    <View
      key={title}
      style={styles.tasteContainer}
    >
      <View style={styles.tasteDetailsContainer}>
        <Text style={styles.tasteText}>{title}</Text>
        <Text style={styles.tasteText}>{value.toFixed(0)}%</Text>
      </View>
      <View
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        style={styles.tasteBaseProgress}
      >
        <Animated.View style={animatedStyles} />
      </View>
    </View>
  );
};

const TastesInfo = () => {
  const { taste: tastes } = useContext(DetailsContext);

  if (!tastes) return null;

  return (
    <View style={[styles.padH10, styles.gap10]}>
      {Object.entries(tastes).map(([tasteTitle, value], index) => {
        return (
          <Taste
            key={tasteTitle + value + index}
            title={tasteTitle}
            value={value}
          />
        );
      })}
    </View>
  );
};

export default TastesInfo;
