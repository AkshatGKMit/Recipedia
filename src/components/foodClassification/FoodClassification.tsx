import { View, Image } from 'react-native';

import { FoodTags, Images } from '@constants';

import styles from './styles';

const FoodClassification = ({ name }: FoodClassificationProps) => {
  const { dessert, meat, vegan, vegetarian, dairy, gluten, sustainable, unknown } =
    Images.classification;

  const image = () => {
    switch (name) {
      case FoodTags.dessert:
        return dessert;
      case FoodTags.vegetarian:
        return vegetarian;
      case FoodTags.dairy:
        return dairy;
      case FoodTags.meat:
        return meat;
      case FoodTags.vegan:
        return vegan;
      case FoodTags.sustainable:
        return sustainable;
      case FoodTags.gluten:
        return gluten;
      default:
        return unknown;
    }
  };

  return (
    <View style={styles.chip}>
      <Image
        source={image()}
        style={styles.image}
      />
    </View>
  );
};

export default FoodClassification;
