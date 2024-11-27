import { useEffect, useState } from 'react';
import { View, LayoutChangeEvent, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { defaultLayout, ShimmerDirection } from '@constants';
import { Colors, globalStyles } from '@themes';
import { Animation } from '@utility/animation';

import styles from './styles';

const _highlighter = (
  layout: Layout,
  shimmerWidth: number,
  baseColor: string,
  highlightColor: string,
  shimmerDirection: GradientStartEnd,
  translateX: Animated.AnimatedInterpolation<string | number>,
) => {
  const highlighterStyle = [
    styles.highlighter,
    {
      height: layout.height,
      width: shimmerWidth,
      transform: [{ translateX }],
    },
  ];

  return (
    <Animated.View style={highlighterStyle}>
      <LinearGradient
        colors={[baseColor, highlightColor, baseColor]}
        start={shimmerDirection.start}
        end={shimmerDirection.end}
        locations={[0.3, 0.5, 0.7]}
        style={globalStyles.flex1}
      />
    </Animated.View>
  );
};

const Shimmer = (props: ShimmerProps) => {
  const [layout, setLayout] = useState<Layout>(defaultLayout);

  const positionX = Animation.newValue(-1);

  const {
    baseColor,
    highlightColor,
    style,
    children,
    shimmerWidth = layout.width / 2.5,
    direction = ShimmerDirection.ltr,
    period = 1500,
  } = props;

  function _measure(e: LayoutChangeEvent): void {
    const { height, width } = e.nativeEvent.layout;
    setLayout({ height, width });
  }

  useEffect(() => {
    Animation.continuous(Animation.timing(positionX, 1, period, Easing.linear)).start();
  }, [period, positionX]);

  const shimmerDirection = () => {
    const start = { x: -1, y: 0.5 };
    const end = { x: 2, y: 0.5 };

    if (direction === ShimmerDirection.ltr) {
      return { start, end };
    }

    return { start: end, end: start };
  };

  const translateX = () => {
    const { width } = layout;

    const outputRange = direction === ShimmerDirection.ltr ? [-width, width] : [width, -width];

    return positionX.interpolate({
      inputRange: [-1, 1],
      outputRange,
    });
  };

  const shimmerBackgroundColor =
    style && typeof style === 'object' && 'backgroundColor' in style
      ? baseColor
      : Colors.transparent;

  const containerStyles = [style, styles.container, { backgroundColor: shimmerBackgroundColor }];

  return (
    <View
      style={containerStyles}
      onLayout={_measure}
    >
      {children}
      {_highlighter(
        layout,
        shimmerWidth,
        baseColor,
        highlightColor,
        shimmerDirection(),
        translateX(),
      )}
    </View>
  );
};

export default Shimmer;
