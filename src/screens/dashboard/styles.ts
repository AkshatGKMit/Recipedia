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
  jokeFloatingButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 100,
    height: 50,
    width: 50,
    padding: 4,
    borderRadius: 50,
    backgroundColor: Colors.lightGreen,
  },
  jokeDialog: {
    maxWidth: 500,
    paddingHorizontal: 15,
    paddingBottom: 15,
    gap: 5,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  jokeImage: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  jokeHeadline: {
    fontFamily: FontFamily.normal.black,
    fontSize: FontSize.headlineLarge,
    top: -10,
  },
  jokeText: {
    fontFamily: FontFamily.normal.regular,
    fontSize: FontSize.bodyLarge,
  },
  closeDialogIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.greyShades.shade200,
  },
});

export default styles;
