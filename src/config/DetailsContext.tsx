import { createContext, useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

import Snackbar from '@components/snackBar';
import { Routes } from '@constants';
import ApiConstants from '@network/apiConstants';
import { _get } from '@network/instanceMethods';

const defaultValue: DetailsContextValues = {
  recipe: recipeEg,
  taste: taste,
  equipments: equipments,
  similarRecipes: [recipe, recipe, recipe, recipe, recipe, recipe, recipe, recipe, recipe],
};

const DetailsContext = createContext<DetailsContextValues>(defaultValue);

export const DetailsContextProvider = ({ children }: ContextProviderProps) => {
  const {
    recipe: defaultRecipe,
    taste: defaultTaste,
    equipments: defaultEquipments,
    similarRecipes: defaultSimilarRecipes,
  } = defaultValue;

  const { params } = useRoute<RouteProp<RootStackParamList>>();

  const [recipe, setRecipe] = useState(defaultRecipe);
  const [taste, setTaste] = useState(defaultTaste);
  const [equipments, setEquipments] = useState(defaultEquipments);
  const [similarRecipes, setSimilarRecipes] = useState(defaultSimilarRecipes);

  const {
    info: infoEndpoint,
    equipments: equipmentsEndpoint,
    similarRecipes: similarRecipesEndpoint,
    taste: tasteEndpoint,
  } = ApiConstants.endpoints.details;

  const fetchRecipeInformation = async (id: number) => {
    const infoResponse = await _get<Recipe>(infoEndpoint(id));

    console.log(infoEndpoint(id));

    if (!infoResponse.success) {
      const { code, message } = infoResponse.error;
      Snackbar.show({ heading: `Error ${code}`, text: message, duration: 10000 });
      return;
    }

    setRecipe(infoResponse.responseData);
  };

  const fetchTaste = async (id: number) => {
    const tasteResponse = await _get<Taste>(tasteEndpoint(id));

    if (tasteResponse.success) {
      setTaste(tasteResponse.responseData);
    }
  };

  const fetchEquipments = async (id: number) => {
    const equipmentsResponse = await _get<EquipmentResponse>(equipmentsEndpoint(id));

    if (equipmentsResponse.success) {
      setEquipments(equipmentsResponse.responseData.equipment);
    }
  };

  const fetchSimilarRecipes = async (id: number) => {
    const similarRecipeResponse = await _get<SimilarRecipes>(similarRecipesEndpoint(id));

    if (similarRecipeResponse.success) {
      setSimilarRecipes(similarRecipeResponse.responseData);
    }
  };

  useEffect(() => {
    const { id } = params;

    fetchRecipeInformation(id);
    fetchTaste(id);
    fetchEquipments(id);
    fetchSimilarRecipes(id);
  }, []);

  const contextValues: DetailsContextValues = { recipe, taste, equipments, similarRecipes };

  return (
    <DetailsContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default DetailsContext;
