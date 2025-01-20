import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import NewsTab from '@/screens/Blog/tabs/NewsTab/NewsTab';
import TabBar from '@/components/TabBar';
import SettingsTab from '@/screens/Blog/tabs/SettingsTab';

const routes = [
	{ key: 'news', title: 'News' },
	{ key: 'settings', title: 'Settings' }
];

const renderScene = ( { route }: { route: typeof routes[0]} ) => {
	switch ( route.key ) {
		case 'news':
			return <NewsTab />;
		case 'settings':
			return <SettingsTab />;
		default:
			return null;
	}
};

const BlogNav = () => {
	const layout = useWindowDimensions();
	const [ index, setIndex ] = useState( 0 );

	return (
		<TabView
			style={{ marginHorizontal: -14 }}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={TabBar}
		/>
	);
};

export default BlogNav;
