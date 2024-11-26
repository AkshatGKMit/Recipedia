import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import IconButton from '@components/iconButton';
import { IconFamily } from '@constants';
import { AppColors, Colors } from '@themes';
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
      {
        backgroundColor: backgroundColorInterpolate,
        transform: [{ scale }],
      },
    ],
    [],
  );

  return (
    <Animated.View style={tabButtonStyles}>
      <IconButton
        family={IconFamily.materialIcons}
        name={icon}
        onPress={onPress}
        iconStyle={{ color: isActive ? AppColors.primary : AppColors.defaultIcon }}
        underlayColor={Colors.transparent}
      />
    </Animated.View>
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
