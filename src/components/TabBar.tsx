import { TabBarProps } from 'react-native-tab-view';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import { Body } from '@/components/Text';
import { Color, useTheme } from '@/config/themes';

const useStyles = () => {
	const theme = useTheme();

	return useMemo( () => StyleSheet.create( {
		tabBar: {
			flexDirection: 'row',
			backgroundColor: theme.colors.background,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border
		},
		tabItem: {
			flex: 1,
			paddingVertical: 14,
			alignItems: 'center',
			justifyContent: 'center'
		},
		activeTab: {
			borderBottomWidth: 2,
			borderBottomColor: theme.colors.primary
		}
	} ), [ theme ] );
};

const TabBar = ( props: TabBarProps<{ key: string; title: string }> ) => {
	const styles = useStyles();

	return (
		<View style={styles.tabBar}>
			{props.navigationState.routes.map( ( route, i ) => {
				const isActive = i === props.navigationState.index;
				return (
					<TouchableOpacity
						key={route.key}
						style={[ styles.tabItem, isActive && styles.activeTab ]}
						onPress={() => props.jumpTo( route.key )}
					>
						<Body color={isActive ? Color.primary : undefined}>
							{route.title}
						</Body>
					</TouchableOpacity>
				);
			} )}
		</View>
	);
};

export default TabBar;
