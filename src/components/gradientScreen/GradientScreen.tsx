import { SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppColors, globalStyles } from '@themes';

import Styles from './styles';

const GradientScreen = ({ children, style }: GradientScreenProps) => {
  const styles = Styles();

  return (
    <LinearGradient
      colors={AppColors.screenGradient}
      style={globalStyles.screen}
    >
      <SafeAreaView style={[globalStyles.flex1, style, styles.statusBarGap]}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GradientScreen;
