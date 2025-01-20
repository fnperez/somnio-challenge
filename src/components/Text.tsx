import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useMemo } from 'react';
import {
	Color, FontSize, FontWeight, useTheme
} from '@/config/themes';

export interface TextProps extends RNTextProps {
  color?: Color,
  weight?: FontWeight,
  size?: FontSize
}

const useStyles = ( props: TextProps ) => {
	const theme = useTheme();

	const {
		color = Color.text,
		weight = FontWeight.regular,
		size = FontSize.normal
	} = props;

	return useMemo<TextStyle>( () => ( {
		color: theme.colors[ color ],
		...theme.fonts[ weight ],
		...theme.fontSizes[ size ]
	} ), [ color, weight, size, theme ] );
};

const Text = ( props: TextProps ) => {
	const styles = useStyles( props );

	return (
		<RNText {...props} style={[ styles, props.style ]} />
	);
};

export const Title = ( props: Omit<TextProps, 'size' | 'weight'> ) => (
	<Text size={FontSize.xl} weight={FontWeight.bold} {...props} />
);

export const Subtitle = ( props: Omit<TextProps, 'size' | 'weight'> ) => (
	<Text size={FontSize.lg} weight={FontWeight.medium} {...props} />
);

export const Body = ( props: Omit<TextProps, 'size' | 'weight'> ) => (
	<Text size={FontSize.normal} weight={FontWeight.regular} {...props} />
);

export default Text;
