import { useCallback } from 'react';
import useBrowse from '@/queries/posts/useBrowse';

const useNewsTab = () => {
	const {
		isLoading, data, isFetchingNextPage, hasNextPage, refetch, fetchNextPage
	} = useBrowse();

	const onEndReached = useCallback( () => {
		if ( !hasNextPage ) return;

		void fetchNextPage( {
			cancelRefetch: true
		} );
	}, [ fetchNextPage, hasNextPage ] );

	return {
		isLoading,
		isFetchingNextPage,
		data: data?.pages.flatMap( page => page.entities ),
		onRefresh: refetch,
		onEndReached
	};
};

export default useNewsTab;
