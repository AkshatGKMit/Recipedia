import { Dimensions, StatusBar, StyleSheet } from 'react-native';

import { Colors, FontFamily, FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const Styles = (topInsets?: number) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const imageHeight = windowHeight / 4.5;

  return StyleSheet.create({
    screen: {
      marginTop: 0,
      gap: 20,
    },
    headerBackground: {
      padding: 15,
      paddingTop: topInsets,
      position: 'relative',
      width: windowWidth,
      height: imageHeight,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      width: windowWidth,
      height: imageHeight,
      backgroundColor: colorWithOpacity(Colors.primary.onPrimaryContainer, 0.4),
    },
    content: {
      position: 'absolute',
      width: windowWidth,
      height: imageHeight,
      paddingHorizontal: 15,
      paddingTop: StatusBar.currentHeight ?? topInsets ?? 0 + 10,
      paddingBottom: 25,
      justifyContent: 'space-between',
    },
    headline: {
      flex: 1,
      verticalAlign: 'middle',
      fontFamily: FontFamily.denkOne,
      fontSize: FontSize.titleLarge,
      color: Colors.white,
      textShadowColor: Colors.black,
      textShadowOffset: { height: 3, width: 3 },
      textShadowRadius: 6,
      textAlign: 'center',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 10,
      backgroundColor: Colors.greyShades.shade50,
      borderRadius: 12,
    },
    textStyle: {
      fontFamily: FontFamily.normal.semibold,
      fontSize: FontSize.labelLarge,
    },
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
};
export default Styles;
