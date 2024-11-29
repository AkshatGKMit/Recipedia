import { useContext } from 'react';
import { View, Text } from 'react-native';

import DetailsContext from '@config/DetailsContext';
import { removeHtmlTags } from '@utility/helpers';

import styles from './styles';

export const ContentTitle = (title: string) => {
  return <Text style={styles.contentTitle}>{title}</Text>;
};

export const Instructions = () => {
  const { recipe } = useContext(DetailsContext);

  if (!recipe) return null;

  const { instructions } = recipe;

  const optimizedInstructions = removeHtmlTags(instructions!, { start: '\n- ' }).slice(1);

  return (
    <View style={styles.padH10}>
      {ContentTitle('Instructions')}
      <Text style={styles.instructions}>{optimizedInstructions}</Text>
    </View>
  );
};
