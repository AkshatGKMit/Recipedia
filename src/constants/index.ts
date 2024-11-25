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

export * from './images';
