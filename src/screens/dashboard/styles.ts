import { StyleSheet } from 'react-native';

import { Colors, FontFamily, FontSize } from '@themes';

const styles = StyleSheet.create({
  triviaContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    gap: 4,
    padding: 8,
    backgroundColor: Colors.lightYellow,
  },
  triviaTitle: {
    fontFamily: FontFamily.normal.black,
    fontSize: FontSize.labelLarge,
  },
  triviaDescription: {
    fontSize: FontSize.bodyMedium,
    textAlign: 'center',
  },
  closeTriviaIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 8,
    borderRadius: 10,
  },
});

export default styles;
