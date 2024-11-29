import { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

import DetailsContext from '@config/DetailsContext';
import useScalingMetrics from '@config/useScalingMetrics';
import { Images } from '@constants';
import ApiConstants from '@network/apiConstants';
import { globalStyles } from '@themes';

import { ContentTitle } from './DetailsContent';
import styles from './styles';

const Equipment = ({ image, name }: Equipment) => {
  const { wp } = useScalingMetrics();

  const { equipment: equipmentImage } = ApiConstants.imageUrl;

  return (
    <View style={globalStyles.columnCenter}>
      <FastImage
        defaultSource={Images.recipePlaceholder}
        source={{ uri: equipmentImage(image) }}
        style={[styles.equipmentImage, { width: wp(20) }]}
        resizeMode="contain"
      />
      <Text style={styles.equipmentName}>{name}</Text>
    </View>
  );
};

const Equipments = () => {
  const { equipments } = useContext(DetailsContext);

  if (!equipments) return null;

  return (
    <View style={styles.gap10}>
      <View style={styles.padH10}>{ContentTitle('Equipments')}</View>
      <ScrollView
        contentContainerStyle={[styles.marginH10, styles.gap10]}
        horizontal
      >
        {equipments.map((equipment, index) => {
          const { name } = equipment;

          return (
            <Equipment
              key={name + index}
              {...equipment}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Equipments;
