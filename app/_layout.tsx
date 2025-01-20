import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { LightTheme, DarkTheme } from '@/config/themes';
import { queryConfig } from '@/config/app';
import { ApiProvider } from '@/contexts/ApiContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colorScheme = useColorScheme();

	const [ loaded ] = useFonts( {
		// eslint-disable-next-line @typescript-eslint/no-require-imports,global-require
		SpaceMono: require( '../assets/fonts/SpaceMono-Regular.ttf' )
	} );

	useEffect( () => {
		if ( loaded ) {
			SplashScreen.hideAsync();
		}
	}, [ loaded ] );

	if ( !loaded ) {
		return null;
	}

	return (
		<QueryClientProvider client={queryConfig}>
			<ApiProvider>
				<SafeAreaProvider>
					<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="index" />
						</Stack>
						<StatusBar style="auto" />
					</ThemeProvider>
				</SafeAreaProvider>
			</ApiProvider>
		</QueryClientProvider>
	);
};

export default RootLayout;
