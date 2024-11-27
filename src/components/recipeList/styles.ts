import { StyleSheet } from 'react-native';

import { FontFamily, FontSize } from '@themes';

const recipeGap = 20;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 20,
  },
  heading: {
    fontFamily: FontFamily.normal.black,
    fontSize: FontSize.titleLarge,
  },
  tagViewContent: {
    gap: 10,
  },
  recipeList: {
    paddingBottom: recipeGap,
  },
  recipeColumn: {
    gap: recipeGap,
  },
  emptyRecipe: {
    gap: recipeGap,
    flexDirection: 'row',
  },
  itemSeparator: {
    height: recipeGap,
  },
});

export default styles;
