import React, { PropsWithChildren, useMemo } from 'react';
import {
	View, StyleSheet, TouchableOpacity, TouchableOpacityProps
} from 'react-native';
import { useTheme } from '@/config/themes';

export interface CardProps extends TouchableOpacityProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  tag?: string
  onPress?: VoidFunction
}

const useStyles = () => {
	const theme = useTheme();

	return useMemo( () => StyleSheet.create( {
		container: {
			backgroundColor: theme.colors.card,
			borderColor: theme.colors.border,
			borderWidth: 1,
			borderRadius: 14
		},
		body: {
			padding: 14,
			gap: 8
		},
		footer: {
			borderRadius: 14,
			overflow: 'hidden'
		}
	} ), [ theme ] );
};

const Card: React.FC<PropsWithChildren<CardProps>> = ( {
	header, footer, onPress, children, ...props
} ) => {
	const styles = useStyles();

	return (
		<TouchableOpacity {...props} onPress={onPress} >
			<View style={[ styles.container, props.style ]}>
				<View style={styles.body}>
					{ header }

					{ children }
				</View>

				<View style={styles.footer}>
					{ footer }
				</View>
			</View>
		</TouchableOpacity>

	);
};

export default Card;
