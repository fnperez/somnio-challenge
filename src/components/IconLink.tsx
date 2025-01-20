import React from 'react';
import { Body } from '@/components/Text';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Color, useTheme } from '@/config/themes';

interface LinkProps extends TouchableOpacityProps {
  icon?: React.JSXElementConstructor<{ color: string }>;
}

const IconLink = ( props: LinkProps ) => {
	const theme = useTheme();

	return (
		<TouchableOpacity
			{...props}
			disabled={!props.onPress}
			style={[ styles.container, props.style ]}
		>
			<Body color={Color.primary}>{props.children}</Body>
			{props.icon && <props.icon color={theme.colors.primary} />}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create( {
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 4
	}
} );

export default IconLink;
