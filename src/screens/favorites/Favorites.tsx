import { useContext } from 'react';
import { Text, View } from 'react-native';

import RecipeList from '@components/recipeList';
import FavoriteContext from '@config/FavoritesContext';
import { AppConstants } from '@constants';
import { globalStyles } from '@themes';

import styles from './styles';

const Favorites = () => {
  const { recipes } = useContext(FavoriteContext);

  const { message, heading } = AppConstants.emptyFavorites;

  if (!recipes.length) {
    const containerStyles = [globalStyles.flex1, globalStyles.columnCenter, styles.emptyContainer];

    return (
      <View style={containerStyles}>
        <Text style={styles.emptyHeading}>{heading}</Text>
        <Text style={styles.emptyMessage}>{message}</Text>
      </View>
    );
  }

  return (
    <RecipeList
      recipes={recipes}
      scrollEnabled
      hideTitle
    />
  );
};

export default Favorites;
