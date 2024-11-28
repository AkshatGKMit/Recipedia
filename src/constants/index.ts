import { Platform } from 'react-native';

import { displayName } from '../../app.json';

export const isIos = Platform.OS === 'ios';

export const Orientation = {
  portrait: 'portrait',
  landscape: 'landscape',
} as const;

export const StorageKey = {};

export const Errors = {
  noInternet: 'Unable to connect to Internet',
  runtimeError: 'Unexpected error occurred',
} as const;

export const IconFamily = {
  antDesign: 'AntDesign',
  entypo: 'Entypo',
  feather: 'Feather',
  fontAwesome: 'FontAwesome',
  fontisto: 'Fontisto',
  ionicons: 'Ionicons',
  materialCommunityIcons: 'MaterialCommunityIcons',
  materialIcons: 'MaterialIcons',
  octicons: 'Octicons',
  simpleLineIcons: 'SimpleLineIcons',
} as const;

export const AppConstants = {
  appName: displayName,
  splashScreenDuration: 3000,
};

export const Routes = {
  BottomTabs: {
    Dashboard: 'Dashboard',
    MealPlanner: 'MealPlanner',
    Favorites: 'Favorites',
  },
} as const;

export const FoodTags = {
  meat: 'meat',
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  dessert: 'dessert',
  dairy: 'dairy',
  gluten: 'gluten',
  sustainable: 'sustainable',
  lunch: 'lunch',
  breakfast: 'breakfast',
  dinner: 'dinner',
} as const;

export const ShimmerDirection = {
  ltr: 'ltr',
  rtl: 'rtl',
};

export const SearchFilters = {
  cuisine: 'Cuisine',
  ingredients: 'Ingredients',
  diets: 'Diets',
} as const;

export * from './images';
