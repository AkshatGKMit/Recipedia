import { View, Text } from 'react-native';
import React from 'react';
import GradientScreen from '@components/gradientScreen';

const Splash = () => {
  return (
    <GradientScreen style={{ backgroundColor: 'red' }}>
      <Text>Splash</Text>
    </GradientScreen>
  );
};

export default Splash;
