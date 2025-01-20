import React, { useMemo } from 'react';
import { Body } from '@/components/Text';
import { Color, useTheme } from '@/config/themes';
import { View, StyleSheet } from 'react-native';

interface TagProps { tag: string; color?: Color }

const useStyles = ( { color = Color.primary }: Pick<TagProps, 'color'> ) => {
	const theme = useTheme();

	return useMemo( () => StyleSheet.create( {
		container: {
			backgroundColor: theme.colors[ color ],
			paddingVertical: 8,
			paddingHorizontal: 14,
			borderRadius: 24,
			marginRight: 'auto'
		}
	} ), [ color, theme ] );
};

const Tag: React.FC<TagProps> = ( { tag, color } ) => {
	const styles = useStyles( { color } );

	return (
		<View style={styles.container}>
			<Body color={Color.white}>{tag}</Body>
		</View>
	);
};

export default Tag;
