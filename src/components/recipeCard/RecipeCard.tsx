import { useCallback, useContext, useMemo } from 'react';
import { View } from 'react-native';

import { FoodTags } from '@constants';
import FavoriteContext from '@config/FavoritesContext';

import RecipeImage from './RecipeImage';
import recipeDetails from './RecipeDetails';
import styles from './styles';

const RecipeCard = (recipe: Recipe) => {
  const { ids, addToFavorite, removeFromFavorite } = useContext(FavoriteContext);

  const isFavorite = useMemo(() => ids.includes(recipe.id), [ids, recipe]);

  const onFavoritePress = () => {
    isFavorite ? removeFromFavorite(recipe) : addToFavorite(recipe);
  };

  const getClassifications = useCallback(() => {
    const tags: FoodTags = [];

    const { dairyFree, vegetarian, vegan, sustainable, glutenFree } = recipe;

    if (!dairyFree) tags.push(FoodTags.dairy);
    if (vegan) tags.push(FoodTags.vegan);
    if (sustainable) tags.push(FoodTags.sustainable);
    if (!glutenFree) tags.push(FoodTags.gluten);

    tags.push(vegetarian ? FoodTags.vegetarian : FoodTags.meat);

    return tags;
  }, [recipe]);

  const { id, image, title, readyInMinutes, pricePerServing: price } = recipe;

  return (
    <View style={styles.container}>
      {RecipeImage(image, getClassifications())}
      {recipeDetails(id, title, readyInMinutes, price, isFavorite, onFavoritePress)}
    </View>
  );
};

export default RecipeCard;
