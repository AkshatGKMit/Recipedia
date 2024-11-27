import { StyleProp, TextProps, TextStyle, TouchableHighlightProps, ViewStyle } from 'react-native';

import { FoodTags, FoodTags, FoodTags, FoodTags, IconFamily, Images } from '@constants';

declare global {
  type IconFamilyType = (typeof IconFamily)[keyof typeof IconFamily];

  interface IconProps extends TextProps {
    family: IconFamilyType;
    name: string;
  }

  interface IconButtonProps extends TouchableHighlightProps {
    family: IconFamilyType;
    name: string;
    iconStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
    onPress?: () => void;
  }

  type FoodTag = (typeof FoodTags)[keyof typeof FoodTags];
  type FoodTags = keyof typeof FoodTags;

  interface FoodTagsProps {
    name: FoodTags;
    onPress?: (tag: FoodTag) => void;
    onLongPress?: (tag: FoodTag) => void;
    selected?: boolean;
    notSelect?: boolean;
  }

  interface FoodClassificationProps {
    name: FoodTags;
  }

  interface RefOptions {
    onShow?: () => void;
    onHide?: () => void;
  }

  interface RefManagerParams extends RefOptions {
    child: React.JSX.Element | null;
  }

  interface DialogParams extends RefManagerParams {
    isDismissible?: boolean;
    backdropColor?: string;
    borderRadius?: number;
  }
}
