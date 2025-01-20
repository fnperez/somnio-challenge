import Container from '@/components/Container';
import useNewsTab from '@/screens/Blog/tabs/NewsTab/useNewsTab';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import React from 'react';
import NewsCard from '@/components/NewsCard';

const NewsTab = () => {
	const presenter = useNewsTab();

	return (
		<Container>
			<FlatList
				data={presenter.data}
				renderItem={( { item } ) => <NewsCard item={item}/>}
				contentContainerStyle={{ gap: 14 }}
				keyExtractor={item => String( item.id )}
				onEndReached={presenter.onEndReached}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					presenter.isFetchingNextPage ? <ActivityIndicator /> : null
				}
				refreshControl={
					<RefreshControl
						refreshing={presenter.isLoading}
						onRefresh={presenter.onRefresh}
					/>
				}
			/>
		</Container>
	);
};

export default NewsTab;
