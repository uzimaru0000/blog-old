export type Color =
  | 'Black'
  | 'White'
  | 'Primary'
  | 'Accent'
  | 'Black75'
  | 'Black50'
  | 'Black25';

export const css: { [key in Color]: string } = {
  Black: '#333333',
  White: '#ffffff',
  Primary: '#199861',
  Accent: '#195b98',
  Black75: 'rgba(51, 51, 51, 0.75)',
  Black50: 'rgba(51, 51, 51, 0.50)',
  Black25: 'rgba(51, 51, 51, 0.25)',
};
