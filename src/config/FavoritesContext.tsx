import { createContext, useEffect, useMemo, useState } from 'react';

import Snackbar from '@components/snackBar';
import { StorageKey } from '@constants';
import ApiConstants from '@network/apiConstants';
import { _get } from '@network/instanceMethods';
import { StorageManager } from '@utility/helpers';

const defaultValue: FavoriteContextValues = {
  ids: [],
  recipes: [],
  addToFavorite: () => {},
  removeFromFavorite: () => {},
};

const FavoriteContext = createContext<FavoriteContextValues>(defaultValue);

export const FavoriteContextProvider = ({ children }: ContextProviderProps) => {
  const [favorites, setFavorites] = useState<Recipes>([]);

  const { getBulkRecipeInformation: bulkRecipeInformationEndpoint } = ApiConstants.endpoints;

  const onLoad = async () => {
    const storedIds = (await StorageManager.getStoreValue<string[]>(StorageKey.favorites)) ?? [];

    const bulkRecipeInformationResponse = await _get<Recipes>(bulkRecipeInformationEndpoint, {
      params: {
        ids: storedIds.join(','),
      },
    });

    if (!bulkRecipeInformationResponse.success) {
      const { code, message } = bulkRecipeInformationResponse.error;
      Snackbar.show({ heading: `Error ${code}`, text: message, duration: 10000 });
      return;
    }

    setFavorites(bulkRecipeInformationResponse.responseData);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const saveFavorites = async (favorites: Recipe[]) => {
    const ids = favorites.map(({ id }) => id);

    try {
      await StorageManager.saveStoreValue(StorageKey.favorites, ids);
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  };

  async function handleFavorite(recipe: Recipe, isFavorite: boolean) {
    if (isFavorite) {
      setFavorites((prev) => [...prev, recipe]);
      await saveFavorites([...favorites, recipe]);
      return;
    }

    const updatedFavorites = favorites.filter(({ id }) => id !== recipe.id);

    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  }

  async function addToFavorite(recipe: Recipe) {
    await handleFavorite(recipe, true);
  }

  async function removeFromFavorite(recipe: Recipe) {
    await handleFavorite(recipe, false);
  }

  const ids = useMemo(() => favorites.map(({ id }) => id), [favorites]);

  const contextValues: FavoriteContextValues = {
    recipes: favorites,
    addToFavorite,
    removeFromFavorite,
    ids,
  };

  return (
    <FavoriteContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default FavoriteContext;
