import { isIos } from '@constants';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Styles = () => {
  const { top: topInsets } = useSafeAreaInsets();

  console.log(topInsets);

  return StyleSheet.create({
    statusBarGap: {
      marginTop: isIos ? 0 : topInsets / 2,
    },
  });
};

export default Styles;
