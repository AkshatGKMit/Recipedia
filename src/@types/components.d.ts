import { StyleProp, TextProps, TextStyle, TouchableHighlightProps, ViewStyle } from 'react-native';

import {
  FoodTags,
  FoodTags,
  FoodTags,
  FoodTags,
  IconFamily,
  Images,
  ShimmerDirection,
} from '@constants';

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
  type FoodTags = FoodTag[];

  interface FoodTagsProps {
    name: FoodTag;
    onPress?: (tag: FoodTag) => void;
    onLongPress?: (tag: FoodTag) => void;
    selected?: boolean;
    notSelect?: boolean;
  }

  interface FoodClassificationProps {
    name: FoodTag;
  }

  interface FoodFactsProps {
    didYouKnow?: FoodFacts;
    joke?: FoodFacts;
  }

  interface RecipeListTags {
    tags: FoodTags;
    includedTags?: FoodTags;
    excludedTags?: FoodTags;
    onPressTag?: (tag: FoodTag) => void;
    onLongPressTag?: (tag: FoodTag) => void;
  }

  interface EmptyRecipeList {
    numColumns: number;
  }

  interface RenderRecipeList {
    recipes: Recipes;
    scrollEnabled: boolean;
  }

  interface RecipeList {
    recipes: Recipe[];
    scrollEnabled?: boolean;
    hideTitle?: boolean;
    includedTags?: FoodTags;
    excludedTags?: FoodTags;
    onPressTag?: (tag: FoodTag) => void;
    onLongPressTag?: (tag: FoodTag) => void;
  }
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

  interface Layout {
    height: number;
    width: number;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  }

  interface GradientPosition {
    x: number;
    y: number;
  }

  interface GradientStartEnd {
    start: GradientPosition;
    end: GradientPosition;
  }

  interface ShimmerProps {
    baseColor: string;
    highlightColor: string;
    shimmerWidth?: number;
    direction?: (typeof ShimmerDirection)[keyof typeof ShimmerDirection];
    period?: number;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
  }
}
