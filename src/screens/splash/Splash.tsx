import { useEffect, useMemo } from 'react';
import { Animated, Easing, Image } from 'react-native';

import GradientScreen from '@components/gradientScreen';
import { AppConstants, Images } from '@constants';
import { globalStyles } from '@themes';
import { Animation } from '@utility/animation';

import Styles from './styles';

const animate = (
  logoScale: Animated.Value,
  logoTranslateY: Animated.Value,
  appNameOpacity: Animated.Value,
  toScale: number,
  toTranslate: number,
  toOpacity: number,
) => {
  const { splashScreenDuration } = AppConstants;

  const duration = splashScreenDuration / 4;

  const logoScaleAnimation = Animation.timing(logoScale, toScale, duration, Easing.bounce);

  const logoTranslateAnimation = Animation.timing(
    logoTranslateY,
    toTranslate,
    duration,
    Easing.inOut(Easing.circle),
  );

  const appNameOpacityAnimation = Animation.timing(
    appNameOpacity,
    toOpacity,
    duration,
    Easing.out(Easing.circle),
  );

  Animation.sequence([logoScaleAnimation, logoTranslateAnimation, appNameOpacityAnimation]).start();
};

const Splash = () => {
  const logoScale = Animation.newValue(10);
  const logoTranslateY = Animation.newValue(0);
  const appNameOpacity = Animation.newValue(0);

  const styles = Styles();

  const { appName } = AppConstants;

  useEffect(() => {
    animate(logoScale, logoTranslateY, appNameOpacity, 1.5, -10, 1);
  }, []);

  const imageContainerStyles = useMemo(
    () => [
      styles.imageContainer,
      { transform: [{ scale: logoScale }, { translateY: logoTranslateY }] },
    ],
    [logoScale, logoTranslateY, styles],
  );

  const appNameStyles = useMemo(
    () => [styles.appName, { opacity: appNameOpacity }],
    [appNameOpacity, styles],
  );

  return (
    <GradientScreen style={globalStyles.columnCenter}>
      <Animated.View style={imageContainerStyles}>
        <Image
          source={Images.appLogo}
          style={[globalStyles.flex1, styles.image]}
        />
      </Animated.View>
      <Animated.Text style={appNameStyles}>{appName}</Animated.Text>
    </GradientScreen>
  );
};

export default Splash;
