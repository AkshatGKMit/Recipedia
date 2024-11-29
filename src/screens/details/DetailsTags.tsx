import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Icon from '@components/icon';
import Shimmer from '@components/shimmer';
import DetailsContext from '@config/DetailsContext';
import { FoodTags, IconFamily } from '@constants';
import { Colors, globalStyles } from '@themes';

import styles from './styles';

const Tag = (
  text: string | number,
  iconFamily: IconFamilyType,
  iconName: string,
  iconColor: string,
) => {
  return (
    <View style={styles.tag}>
      <Icon
        family={iconFamily}
        name={iconName}
        style={{ color: iconColor }}
      />
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const TagShimmer = () => {
  return (
    <View style={[styles.tagShimmerContainer, styles.gap10, styles.marginH10]}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Shimmer
          key={i}
          baseColor={Colors.greyShades.shade400}
          highlightColor={Colors.greyShades.shade200}
          style={styles.tagShimmer}
        />
      ))}
    </View>
  );
};

const DetailsTags = () => {
  const { recipe } = useContext(DetailsContext);

  if (!recipe) return <TagShimmer />;

  const { veryPopular, aggregateLikes: likes, healthScore, vegetarian, cheap } = recipe;

  return (
    <ScrollView
      style={globalStyles.flex1}
      contentContainerStyle={[styles.gap10, styles.marginH10]}
      horizontal
    >
      {veryPopular &&
        Tag(FoodTags.popular, IconFamily.materialIcons, 'local-fire-department', Colors.lightRed)}

      {Tag(likes, IconFamily.antDesign, 'like1', Colors.darkYellow)}
      {Tag(healthScore, IconFamily.materialIcons, 'local-hospital', Colors.darkGreen)}

      {vegetarian
        ? Tag(FoodTags.vegetarian, IconFamily.materialCommunityIcons, 'leaf', Colors.darkGreen)
        : Tag(FoodTags.meat, IconFamily.materialCommunityIcons, 'food-turkey', Colors.red)}

      {Tag(
        cheap ? FoodTags.cheap : FoodTags.expensive,
        IconFamily.fontAwesome,
        'money',
        Colors.bluishGrey,
      )}
    </ScrollView>
  );
};

export default DetailsTags;
