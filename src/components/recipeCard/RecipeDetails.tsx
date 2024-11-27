import { View, Text, Animated, Easing } from 'react-native';

import IconButton from '@components/iconButton';
import { IconFamily } from '@constants';
import { Colors } from '@themes';
import { Animation } from '@utility/animation';

import styles from './styles';

const RenderDetailsContainer = (title: string, subtitle1: string, subtitle2: string) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{subtitle1}</Text>
      <Text>|</Text>
      <Text style={styles.subtitle}>{subtitle2}</Text>
    </View>
  </View>
);

const recipeDetails = (
  id: number,
  title: string,
  readyInMinutes: number,
  price: number,
  isFavorite: boolean,
  onFavoritePress: () => void,
) => {
  const scaleFavorite = Animation.newValue(1);

  const ANIMATION_SCALE_UP = 1.2;
  const ANIMATION_SCALE_DOWN = 1;
  const ANIMATION_DURATION = 50;
  const ANIMATION_EASING = Easing.bounce;

  const animate = () => {
    Animation.sequence([
      Animation.timing(scaleFavorite, ANIMATION_SCALE_UP, ANIMATION_DURATION, ANIMATION_EASING),
      Animation.timing(scaleFavorite, ANIMATION_SCALE_DOWN, ANIMATION_DURATION, ANIMATION_EASING),
    ]).start();
  };

  const _onPressFavorite = () => {
    animate();
    onFavoritePress();
  };

  const iconStyles = [styles.icon, { color: isFavorite ? Colors.red : undefined }];

  return (
    <View style={styles.detailsWrapper}>
      {RenderDetailsContainer(title, `${readyInMinutes} Min`, `${price.toFixed(2)}$`)}
      <Animated.View style={[styles.favoriteIcon, { transform: [{ scale: scaleFavorite }] }]}>
        <IconButton
          family={IconFamily.materialIcons}
          name={isFavorite ? 'favorite' : 'favorite-outline'}
          style={styles.favoriteIcon}
          iconStyle={iconStyles}
          underlayColor={Colors.transparent}
          onPress={_onPressFavorite}
        />
      </Animated.View>
    </View>
  );
};

export default recipeDetails;
