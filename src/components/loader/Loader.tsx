import { ActivityIndicator } from 'react-native';

import { AppColors } from '@themes';

const Loader = ({ color, size }: LoaderProps) => {
  return (
    <ActivityIndicator
      color={color ?? AppColors.primary}
      size={size ?? 'small'}
      animating
    />
  );
};

export default Loader;
