import { StyleSheet } from 'react-native';

import useScalingMetrics from '@config/useScalingMetrics';

const Styles = () => {
  const { wp, hp } = useScalingMetrics();

  return StyleSheet.create({
    dialog: {
      height: '100%',
      width: '100%',
      paddingHorizontal: wp(5),
      paddingVertical: hp(5),
    },
  });
};

export default Styles;
