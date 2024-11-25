import { StyleSheet } from 'react-native';

import { AppColors } from '@themes';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primaryBackground,
  },
  rowCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  columnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
});
