import { SafeAreaView, View, ViewProps } from 'react-native';
import { useMemo } from 'react';
import { useTheme, Color } from '@/config/themes';

interface ContainerProps extends ViewProps {
  bg?: Color,
}

const useStyles = ( props: ContainerProps ) => {
	const theme = useTheme();

	const {
		bg = Color.background
	} = props;

	return useMemo( () => ( {
		backgroundColor: theme.colors[ bg ],
		padding: 14,
		flex: 1
	} ), [ bg, theme.colors ] );
};

const Container = ( props: ContainerProps ) => {
	const styles = useStyles( props );

	return (
		<SafeAreaView style={[ styles, props.style ]}>
			<View {...props} style={[ styles, props.style ]} />
		</SafeAreaView>
	);
};

export default Container;
