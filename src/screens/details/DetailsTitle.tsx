import { useContext } from 'react';
import { View, Text } from 'react-native';

import Icon from '@components/icon';
import Shimmer from '@components/shimmer';
import DetailsContext from '@config/DetailsContext';
import { IconFamily } from '@constants';
import { Colors } from '@themes';

import styles from './styles';

const DetailsTitlePlaceholder = () => {
  const titleContainerStyles = [styles.titleContainer, styles.gap10, styles.padH10];

  return (
    <View style={titleContainerStyles}>
      {
        <Shimmer
          baseColor={Colors.greyShades.shade400}
          highlightColor={Colors.greyShades.shade200}
          style={styles.titleShimmer}
        />
      }
    </View>
  );
};

const DetailsTitle = () => {
  const { recipe } = useContext(DetailsContext);

  if (!recipe) return <DetailsTitlePlaceholder />;

  const { title, spoonacularScore } = recipe;

  const rating = spoonacularScore / 10;

  const titleContainerStyles = [styles.titleContainer, styles.gap10, styles.padH10];

  return (
    <View style={titleContainerStyles}>
      <Text style={styles.title}>{title}</Text>
      {rating && (
        <View style={styles.ratingContainer}>
          <Icon
            family={IconFamily.antDesign}
            name="star"
            style={[styles.ratingIcon, styles.ratingText]}
          />
          {<Text style={styles.ratingText}>{rating.toFixed(1)}</Text>}
        </View>
      )}
    </View>
  );
};

export default DetailsTitle;
