import { StyleSheet } from 'react-native';

import { FontFamily, FontSize } from '@themes';

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 30,
  },
  emptyHeading: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FontFamily.normal.black,
    fontSize: FontSize.headlineLarge,
  },
  emptyMessage: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FontFamily.normal.semibold,
    fontSize: FontSize.labelMedium,
  },
});

export default styles;
