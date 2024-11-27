import { useCallback } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

import FoodTagChip from '@components/foodTagChip';
import RecipeCard, { ShimmerRecipeCard } from '@components/recipeCard';
import useScalingMetrics from '@config/useScalingMetrics';
import { FoodTags } from '@constants';

import styles from './styles';

const RenderTags = ({
  tags,
  excludedTags,
  includedTags,
  onLongPressTag,
  onPressTag,
}: RecipeListTags) => {
  return (
    <ScrollView
      contentContainerStyle={styles.tagViewContent}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {tags.map((tag: FoodTag) => {
        const isSelected = includedTags?.includes(tag) ?? false;
        const isNotSelected = excludedTags?.includes(tag) ?? false;

        return (
          <FoodTagChip
            key={tag}
            name={tag}
            onPress={onPressTag}
            onLongPress={onLongPressTag}
            selected={isSelected}
            notSelect={isNotSelected}
          />
        );
      })}
    </ScrollView>
  );
};

const RenderEmptyList = ({ numColumns }: EmptyRecipeList) => {
  return (
    <View style={styles.emptyRecipe}>
      {Array.from({ length: numColumns }).map((_, index) => (
        <ShimmerRecipeCard key={index} />
      ))}
    </View>
  );
};

const RenderList = ({ recipes, scrollEnabled }: RenderRecipeList) => {
  const { screenWidth } = useScalingMetrics();

  const minimumScreenWidthPerColumn = 250;
  const numColumns = Math.floor(screenWidth / minimumScreenWidthPerColumn);

  const columnStyles = numColumns > 1 ? styles.recipeColumn : undefined;

  return (
    <FlatList
      key={screenWidth.toString()}
      numColumns={numColumns}
      data={recipes}
      keyExtractor={({ id }, index) => `${id + index}`}
      renderItem={({ item: recipe }) => <RecipeCard {...recipe} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={<RenderEmptyList {...{ numColumns }} />}
      scrollEnabled={scrollEnabled}
      style={styles.recipeList}
      columnWrapperStyle={columnStyles}
    />
  );
};

const RecipeList = ({
  recipes,
  hideTitle = false,
  scrollEnabled = false,
  includedTags,
  excludedTags,
  onLongPressTag,
  onPressTag,
}: RecipeList) => {
  const getSortedTags = useCallback(() => {
    if (!includedTags && excludedTags) return undefined;

    const allTags = Object.keys(FoodTags) as FoodTags;

    const activeTagsSet = new Set(
      allTags.filter((tag) => includedTags?.includes(tag) || excludedTags?.includes(tag)),
    );

    const inActiveTagsSet = new Set(
      allTags.filter((tag) => !includedTags?.includes(tag) && !excludedTags?.includes(tag)),
    );

    const sortedActiveTags = Array.from(activeTagsSet).sort();
    const sortedInActiveTags = Array.from(inActiveTagsSet).sort();

    const sortedTags = [...sortedActiveTags, ...sortedInActiveTags];

    return sortedTags;
  }, [includedTags, excludedTags]);

  const tags = getSortedTags();

  return (
    <View style={styles.container}>
      {!hideTitle && <Text style={styles.heading}>Recipes</Text>}
      {tags && <RenderTags {...{ tags, includedTags, excludedTags, onPressTag, onLongPressTag }} />}
      {<RenderList {...{ recipes, scrollEnabled }} />}
    </View>
  );
};

export default RecipeList;
