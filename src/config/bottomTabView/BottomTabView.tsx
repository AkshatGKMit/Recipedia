import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Animated, Easing, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Icon from '@components/icon';
import { IconFamily } from '@constants';
import { AppColors, Colors, globalStyles } from '@themes';
import { Animation } from '@utility/animation';
import { colorWithOpacity } from '@utility/helpers';

import Styles from './styles';

const TabButton = ({ icon, onPress, isActive }: BottomTabButtonProps) => {
  const backgroundColor = Animation.newValue(0);
  const scale = Animation.newValue(1);

  const styles = Styles();

  const animate = useCallback((isActive: boolean) => {
    Animation.parallel([
      Animation.timing(backgroundColor, isActive ? 1 : 0, 250, Easing.linear),
      Animation.timing(scale, isActive ? 1.5 : 1, 250, Easing.linear),
    ]).start();
  }, []);

  useEffect(() => {
    animate(isActive);
  }, [isActive]);

  const backgroundColorInterpolate = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.transparent, colorWithOpacity(AppColors.primary, 0.25)],
  });

  const tabButtonStyles = useMemo(
    () => [
      styles.tabButton,
      globalStyles.rowCenter,
      {
        backgroundColor: backgroundColorInterpolate,
        transform: [{ scale }],
      },
    ],
    [],
  );

  return (
    <Pressable
      onPress={onPress}
      style={globalStyles.flex1}
    >
      <Animated.View style={tabButtonStyles}>
        <Icon
          family={IconFamily.materialIcons}
          name={icon}
          style={{ color: isActive ? AppColors.primary : AppColors.defaultIcon }}
        />
      </Animated.View>
    </Pressable>
  );
};

const BottomTabView = ({ navigation, state }: BottomTabBarProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const styles = Styles();

  const getBottomTabIcon = useCallback((index: number) => {
    switch (index) {
      case 0:
        return 'space-dashboard';
      case 1:
        return 'fastfood';
      case 2:
        return 'favorite';
      default:
        return '';
    }
  }, []);

  return (
    <View style={styles.bottomTabContainer}>
      {state.routes.map(({ name, key }, index) => {
        return (
          <TabButton
            key={key}
            icon={getBottomTabIcon(index)}
            isActive={activeTabIndex === index}
            onPress={() => {
              setActiveTabIndex(index);
              navigation.navigate(name);
            }}
          />
        );
      })}
    </View>
  );
};

export default BottomTabView;
