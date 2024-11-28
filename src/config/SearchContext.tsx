import { createContext, useCallback, useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ApiConstants from '@network/apiConstants';
import { _get } from '@network/instanceMethods';
import { debounce } from '@utility/helpers';

const defaultValue: SearchContextValues = {
  data: [],
  searchText: '',
  onChangeText: () => {},
  onSubmit: () => {},
  suggestions: [],
  showSuggestions: false,
  cuisines: [],
  diets: [],
  ingredients: [],
  handleCuisine: () => {},
  handleDiet: () => {},
  handleIngredient: () => {},
  onBackPress: () => true,
};

const SearchContext = createContext<SearchContextValues>(defaultValue);

export const SearchContextProvider = ({ children }: ContextProviderProps) => {
  const {
    data: defaultData,
    searchText: defaultSearch,
    suggestions: defaultAutoCompletedQueries,
    showSuggestions: defaultShowAutoComplete,
    cuisines: defaultCuisines,
    diets: defaultDiets,
    ingredients: defaultIngredients,
  } = defaultValue;

  const { goBack } = useNavigation<StackNavigation>();

  const [data, setData] = useState<SearchRecipes>(defaultData);
  const [searchText, setSearchText] = useState(defaultSearch);
  const [searchedOn, setSearchedOn] = useState('');
  const [suggestions, setSuggestions] = useState<AutoCompleteSearches>(defaultAutoCompletedQueries);
  const [showSuggestions, setShowSuggestions] = useState(defaultShowAutoComplete);

  const [cuisines, setCuisines] = useState<Cuisines>(defaultCuisines);
  const [ingredients, setIngredients] = useState<Ingredients>(defaultIngredients);
  const [diets, setDiets] = useState<Diets>(defaultDiets);

  const [loading, setLoading] = useState(false);

  const { autoCompleteSearch: autoCompleteEndpoint, complexSearch: complexSearchEndpoint } =
    ApiConstants.endpoints;

  const fetchAutoComplete = async (query: string) => {
    const autoCompleteResponse = await _get<AutoCompleteSearches>(autoCompleteEndpoint, {
      params: { query, number: 1 },
    });

    if (autoCompleteResponse.success) {
      const { responseData } = autoCompleteResponse;
      setSuggestions(responseData);
      setShowSuggestions(true);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchAutoComplete, 600), []);

  const onBackRequest = () => {
    if (data.length && showSuggestions) setShowSuggestions(false);
    else goBack();

    return true;
  };

  useEffect(() => {
    if (searchText && !loading) {
      debouncedSearch(searchText);
    }

    if (!searchText) setShowSuggestions(false);
  }, [searchText, debouncedSearch]);

  useEffect(() => {
    if (data.length) onSubmit(searchedOn, false);
  }, [diets, cuisines, ingredients]);

  useEffect(() => {
    const backListener = BackHandler.addEventListener('hardwareBackPress', onBackRequest);

    return () => backListener.remove();
  }, []);

  const handleCuisine = (tag: Cuisine) => {
    setCuisines((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleIngredient = (tag: Ingredient) => {
    setIngredients((prev) =>
      prev.includes(tag) ? prev.filter((prevTag) => prevTag !== tag) : [...prev, tag],
    );
  };

  const handleDiet = (tag: Diet) => {
    setDiets((prev) =>
      prev.includes(tag) ? prev.filter((prevTag) => prevTag !== tag) : [...prev, tag],
    );
  };

  const onSubmit = async (text?: string, updateSearch?: boolean) => {
    if (!text && !searchText) return;
    if (text && !updateSearch) setSearchText(text);

    setShowSuggestions(false);
    setLoading(true);

    const searchResponse = await _get<SearchRecipesResult>(complexSearchEndpoint, {
      params: {
        query: text ?? searchText,
        cuisine: cuisines.join(','),
        diet: diets.join(','),
        includeIngredients: ingredients.join(','),
        offset: 0,
        number: 1,
      },
    });

    if (searchResponse.success) setData(searchResponse.responseData.results);

    setLoading(false);
  };

  const contextValues: SearchContextValues = {
    data,
    searchText,
    onChangeText: setSearchText,
    onSubmit,
    suggestions: suggestions,
    showSuggestions: showSuggestions,
    cuisines,
    ingredients,
    diets,
    handleCuisine,
    handleIngredient,
    handleDiet,
    onBackPress: onBackRequest,
  };

  return (
    <SearchContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default SearchContext;
