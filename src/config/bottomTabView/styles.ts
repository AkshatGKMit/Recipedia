import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIos } from '@constants';
import { AppColors } from '@themes';

const Styles = () => {
  const { bottom: bottomInsets } = useSafeAreaInsets();

  return StyleSheet.create({
    bottomTabContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: isIos ? bottomInsets : 15,
      paddingTop: 15,
      backgroundColor: AppColors.primaryBackground,
    },
    tabButton: {
      alignSelf: 'center',
      padding: 5,
      borderRadius: 30,
    },
  });
};

export default Styles;
