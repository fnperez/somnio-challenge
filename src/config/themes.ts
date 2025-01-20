import { DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme, useTheme as useDefaultTheme } from '@react-navigation/native';

enum FontSize {
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  normal = 'normal',
  sm = 'sm',
  xs = 'xs',
}

enum FontWeight {
  regular = 'regular',
  medium = 'medium',
  bold = 'bold',
  heavy = 'heavy',
}

enum Color {
  primary = 'primary',
  background = 'background',
  card = 'card',
  text = 'text',
  border = 'border',
  notification = 'notification',
  white = 'white'
}

const DefaultTheme = {
	fontSizes: {
		[ FontSize.xl ]: {
			fontSize: 26
		},
		[ FontSize.lg ]: {
			fontSize: 22
		},
		[ FontSize.md ]: {
			fontSize: 18
		},
		[ FontSize.normal ]: {
			fontSize: 16
		},
		[ FontSize.sm ]: {
			fontSize: 14
		},
		[ FontSize.xs ]: {
			fontSize: 12
		}
	}
};

const LightTheme = {
	...DefaultLightTheme,
	...DefaultTheme,
	colors: {
		primary: '#1E90FF', // For active tab, buttons, etc.
		background: '#FFFFFF', // Main background
		card: '#F8F9FA', // Tab bar or header background
		text: '#333333', // Main text color
		border: '#E0E0E0', // Dividers
		notification: '#FFA500',
		white: '#f8f0f0'
	},
	dark: false
};

const DarkTheme = {
	...DefaultDarkTheme,
	...DefaultTheme,
	colors: {
		primary: '#1E90FF',
		background: '#121212',
		card: '#1E1E1E',
		text: '#FFFFFF',
		border: '#333333',
		notification: '#FFA500',
		white: '#f8f0f0'
	},
	dark: true
};

export type Theme = typeof LightTheme

export const useTheme = () => useDefaultTheme() as Theme;

export {
	FontSize,
	FontWeight,
	Color,
	LightTheme,
	DarkTheme
};
