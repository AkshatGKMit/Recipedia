import { colorWithOpacity } from '@utility/helpers';

import { Colors } from './colors';
import { FontFamily, FontSize, FontWeight } from './font';
import { globalStyles } from './globalStyles';

const AppColors = {
  main: Colors.white,
  defaultIcon: Colors.black,
  divider: (opacity?: number) => colorWithOpacity(Colors.black, opacity ?? 0.2),
  placeholder: (opacity?: number) => colorWithOpacity(Colors.black, opacity ?? 0.45),
  primary: Colors.primary.color,
  primaryText: Colors.primary.color,
  primaryBackground: Colors.white,
  secondaryBackground: Colors.greyShades.shade200,
  screenGradient: [Colors.greyShades.shade100, colorWithOpacity(Colors.greyShades.shade200, 0.3)],
  statusBar: Colors.primary.color,
  text: Colors.black,
  secondaryText: Colors.greyShades.shade600,
  underlay: (opacity?: number) => colorWithOpacity(Colors.greyShades.shade800, opacity ?? 0.25),
  error: Colors.error,
};

export { AppColors, FontFamily, FontSize, FontWeight, Colors, globalStyles };
