import { useContext } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import Icon from '@components/icon';
import FavoriteButton from '@components/favoriteButton';
import Shimmer from '@components/shimmer';
import DetailsContext from '@config/DetailsContext';
import { IconFamily, Images, isIos } from '@constants';
import { Colors, FontSize } from '@themes';

import styles from './styles';

const AbsoluteButton = (iconName: string, isLeft: boolean, onPress: () => void) => {
  return (
    <TouchableOpacity
      style={[styles.absoluteButton, isLeft ? styles.leftPosition : styles.rightPosition]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Icon
        family={IconFamily.ionicons}
        name={iconName}
        style={{ fontSize: FontSize.labelLarge }}
      />
    </TouchableOpacity>
  );
};

const HeaderPlaceholder = () => {
  const { goBack } = useNavigation<StackNavigation>();

  return (
    <View style={styles.headerContainer}>
      <Shimmer
        baseColor={Colors.greyShades.shade400}
        highlightColor={Colors.greyShades.shade200}
        style={styles.headerImage}
      />
      {AbsoluteButton('arrow-back', true, goBack)}
    </View>
  );
};

const DetailsHeader = () => {
  const { goBack } = useNavigation<StackNavigation>();

  const { recipe } = useContext(DetailsContext);

  if (!recipe) return <HeaderPlaceholder />;

  const { image, sourceUrl } = recipe;

  const openUrl = async () => {
    const canOpenUrl = await Linking.canOpenURL(sourceUrl);

    if (!isIos || canOpenUrl) {
      Linking.openURL(sourceUrl);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <FastImage
        defaultSource={Images.recipePlaceholder}
        source={{ uri: image ?? undefined }}
        resizeMode="contain"
        style={styles.headerImage}
      />
      {AbsoluteButton('arrow-back', true, goBack)}
      {AbsoluteButton('link', false, openUrl)}
      {recipe && FavoriteButton(recipe, [styles.absoluteButton, styles.fav], FontSize.labelLarge)}
    </View>
  );
};

export default DetailsHeader;
