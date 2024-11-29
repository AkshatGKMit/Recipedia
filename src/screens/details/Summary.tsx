import { useContext } from 'react';
import { View, Text } from 'react-native';

import DetailsContext from '@config/DetailsContext';
import { FontFamily, FontSize, Colors } from '@themes';
import { removeHtmlTags } from '@utility/helpers';

import styles from './styles';
import { ContentTitle } from './DetailsContent';

const Summary = () => {
  const { recipe } = useContext(DetailsContext);

  if (!recipe) return null;

  const { summary } = recipe;

  const refinedSummary = summary.split('If you like this recipe')[0];

  return (
    <View style={styles.padH10}>
      {ContentTitle('Summary')}
      <Text style={styles.summaryDescription}>{removeHtmlTags(refinedSummary)}</Text>
    </View>
  );
};

export default Summary;
