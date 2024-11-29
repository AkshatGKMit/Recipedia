import { useContext } from 'react';
import { TouchableHighlight, Text, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DetailsContext from '@config/DetailsContext';
import useScalingMetrics from '@config/useScalingMetrics';
import { Routes, ImageSizes, Images } from '@constants';
import ApiConstants from '@network/apiConstants';
import { Colors } from '@themes';

import { ContentTitle } from './DetailsContent';
import styles from './styles';

const SimilarRecipe = ({ id, imageType, title }: SimilarRecipe) => {
  const { navigate, dispatch } = useNavigation<StackNavigation>();

  const { hp, wp } = useScalingMetrics();

  const _onPressButton = () => {
    const { Details: DetailsRoute } = Routes.Stack;
    const routeParam = { id };

    const pushAction = StackActions.push(DetailsRoute, routeParam);

    dispatch(pushAction);
    navigate(DetailsRoute, routeParam);
  };

  const { recipes } = ApiConstants.imageUrl;

  const uri = recipes(id, ImageSizes.size240x150, imageType);

  const similarContainerStyles = [
    styles.similarRecipeContainer,
    { maxWidth: wp(40), maxHeight: hp(40) },
  ];

  return (
    <TouchableHighlight
      style={similarContainerStyles}
      onPress={_onPressButton}
      underlayColor={Colors.white}
    >
      <>
        <FastImage
          defaultSource={Images.recipePlaceholder}
          source={{ uri }}
          resizeMode="cover"
          style={styles.similarRecipeImage}
        />
        <Text
          style={styles.similarRecipeName}
          numberOfLines={3}
        >
          {title}
        </Text>
      </>
    </TouchableHighlight>
  );
};

const SimilarRecipes = () => {
  const { bottom } = useSafeAreaInsets();

  const { similarRecipes } = useContext(DetailsContext);

  if (!similarRecipes) return null;

  const listStyles = [styles.padH10, styles.gap10, { paddingBottom: bottom + 10 }];

  return (
    <View style={styles.gap10}>
      <View style={styles.padH10}>{ContentTitle('Similar Recipes')}</View>
      <FlatList
        style={listStyles}
        contentContainerStyle={styles.gap10}
        horizontal
        data={similarRecipes}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: similarRecipe }) => {
          const { id } = similarRecipe;

          return (
            <SimilarRecipe
              key={id}
              {...similarRecipe}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SimilarRecipes;
