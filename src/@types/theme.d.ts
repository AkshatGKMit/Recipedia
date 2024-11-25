import { FontFamily, FontSize, FontWeight } from '@themes';

declare global {
  type FontFamily = (typeof FontFamily)[keyof typeof FontFamily];

  type FontSize = (typeof FontSize)[keyof typeof FontSize];

  type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];
}
