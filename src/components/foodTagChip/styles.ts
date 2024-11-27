import { StyleSheet } from 'react-native';

import { Colors, FontFamily } from '@themes';

const Styles = (isSelected?: boolean, isNotSelected?: boolean) => {
  const backgroundColor = isSelected
    ? Colors.primary.primaryContainer
    : isNotSelected
      ? Colors.error
      : Colors.transparent;

  return StyleSheet.create({
    chip: {
      flexDirection: 'row',
      padding: 8,
      borderRadius: 20,
      backgroundColor,
      borderWidth: isSelected || isNotSelected ? 0 : 0.2,
    },
    tagName: {
      textTransform: 'capitalize',
      fontFamily: FontFamily.normal.regular,
    },
  });
};
export default Styles;
