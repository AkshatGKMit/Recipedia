import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import FoodClassification from '@components/foodClassification';
import { Images } from '@constants';
import { Colors, globalStyles } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import styles from './styles';

const RecipeImage = (imageUrl: string | null, classification?: FoodTags) => {
  return (
    <FastImage
      defaultSource={Images.recipePlaceholder}
      source={{ uri: imageUrl ?? undefined }}
      style={styles.image}
    >
      {classification && (
        <LinearGradient
          colors={[colorWithOpacity(Colors.black, 0.75), Colors.transparent]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.75, y: 0.5 }}
          style={globalStyles.flex1}
        >
          <View style={styles.classifications}>
            {classification.map((classifier, index) => (
              <FoodClassification
                key={classifier}
                name={classifier}
              />
            ))}
          </View>
        </LinearGradient>
      )}
    </FastImage>
  );
};

export default RecipeImage;
