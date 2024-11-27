import Shimmer from '@components/shimmer';
import { Colors } from '@themes';

import styles from './styles';

const ShimmerRecipeCard = () => {
  return (
    <Shimmer
      baseColor={Colors.grey}
      highlightColor={Colors.greyShades.shade400}
      style={styles.shimmerContainer}
      shimmerWidth={60}
    />
  );
};

export default ShimmerRecipeCard;
