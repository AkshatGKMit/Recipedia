import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useScalingMetrics from '@config/useScalingMetrics';
import { AppColors, Colors, FontFamily, FontSize, FontWeight } from '@themes';

const Styles = () => {
  const { scaleSize: SS } = useScalingMetrics();

  return useMemo(
    () =>
      StyleSheet.create({
        imageContainer: {
          width: SS(150),
          height: SS(150),
          borderRadius: 200,
          padding: 5,
          backgroundColor: Colors.transparent,
          shadowColor: Colors.black,
        },
        image: {
          resizeMode: 'contain',
          alignSelf: 'center',
        },
        appName: {
          textShadowColor: Colors.black,
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 5,
          fontFamily: FontFamily.italic.black,
          fontSize: SS(FontSize.displayMedium),
          color: AppColors.primary,
        },
      }),
    [],
  );
};

export default Styles;
