import { useContext, useState, useEffect } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import Icon from '@components/icon';
import SearchContext from '@config/SearchContext';
import { Cuisines, Ingredients, Diets, IconFamily, SearchFilters } from '@constants';
import { Colors } from '@themes';
import { Animation } from '@utility/animation';

import styles from './styles';

const FilterTags = <T extends AllFoodTag>(
  title: string,
  tags: Record<string, T>,
  selectedTags: T[],
  onTagPress: (tag: T) => void,
) => {
  return (
    <View style={styles.filterTagsContainer}>
      <Text style={styles.filterTagsHeading}>{title}</Text>
      <View style={styles.filterTagLists}>
        {Object.values(tags).map((tag, index) => {
          const isSelected = selectedTags.includes(tag);

          const tagStyle = [
            styles.filterTag,
            {
              backgroundColor: isSelected
                ? Colors.primary.primaryContainer
                : Colors.greyShades.shade300,
            },
          ];

          return (
            <Pressable
              key={tag + index}
              onPress={() => onTagPress(tag)}
            >
              <Text style={tagStyle}>{tag}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const Filters = (inputContainerHeight: number) => {
  const {
    showSuggestions: showAutoComplete,
    suggestions: autoCompletedQueries,
    data,
    cuisines: selectedCuisines,
    diets: selectedDiets,
    ingredients: selectedIngredients,
    handleCuisine,
    handleDiet,
    handleIngredient,
  } = useContext(SearchContext);

  const [filterButtonHeight, setFilterButtonHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isOpen, setOpen] = useState(true);

  const translateY = Animation.newValue(1);

  const animate = (open?: boolean) => {
    const targetState = open !== undefined ? open : !isOpen;

    Animation.timing(translateY, targetState ? 1 : 0, 300).start(() => setOpen(targetState));
  };

  useEffect(() => {
    if (showAutoComplete || data.length) animate(false);
  }, [showAutoComplete, autoCompletedQueries, data]);

  const translateYInterpolate = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [-containerHeight, 0],
  });

  const containerStyle = [
    styles.filterContainer,
    {
      top: inputContainerHeight - 2,
      transform: [{ translateY: translateYInterpolate }],
    },
  ];

  const filterButtonStyle = [styles.filterButton, { bottom: -filterButtonHeight }];

  return (
    <Animated.View
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      style={containerStyle}
    >
      {FilterTags<Cuisine>(SearchFilters.cuisine, Cuisines, selectedCuisines, handleCuisine)}
      {FilterTags<Ingredient>(
        SearchFilters.ingredients,
        Ingredients,
        selectedIngredients,
        handleIngredient,
      )}
      {FilterTags<Diet>(SearchFilters.diets, Diets, selectedDiets, handleDiet)}
      <Pressable
        onLayout={(e) => setFilterButtonHeight(e.nativeEvent.layout.height)}
        onPress={() => {
          animate();
        }}
        style={filterButtonStyle}
      >
        <Icon
          family={IconFamily.entypo}
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          style={styles.filterText}
        />
        <Text
          onLayout={(e) => setFilterButtonHeight(e.nativeEvent.layout.height)}
          style={styles.filterText}
        >
          Filters
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Filters;
