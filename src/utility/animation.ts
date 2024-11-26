import { useRef } from 'react';
import { Animated, EasingFunction } from 'react-native';

export namespace Animation {
  export function newValue(value: number) {
    return useRef(new Animated.Value(value)).current;
  }

  export function timing(
    animatedValue: Animated.Value,
    toValue: number,
    duration?: number,
    easing?: EasingFunction,
    useNativeDriver?: boolean,
  ): Animated.CompositeAnimation {
    return Animated.timing(animatedValue, {
      toValue,
      duration: duration,
      useNativeDriver: useNativeDriver ?? true,
      easing,
    });
  }

  export function sequence(
    animations: Array<Animated.CompositeAnimation>,
  ): Animated.CompositeAnimation {
    return Animated.sequence(animations);
  }

  export function continuous(animation: Animated.CompositeAnimation): Animated.CompositeAnimation {
    return Animated.loop(animation);
  }

  export function parallel(animation: Animated.CompositeAnimation[]): Animated.CompositeAnimation {
    return Animated.parallel(animation);
  }

  export function delay(time: number): Animated.CompositeAnimation {
    return Animated.delay(time);
  }

  export const getAnimatedValue = (value: Animated.Value) => value.__getValue();
}
