import { useApi } from '@/contexts/ApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/queries/config';

const useBrowse = () => {
	const api = useApi();

	return useInfiniteQuery( {
		queryKey: [ QueryKeys.BrowsePosts ],
		initialPageParam: 1,
		queryFn: ( { pageParam = 1 } ) => api.posts().browse( { page: pageParam, perPage: 15 } ),
		getNextPageParam: lastPage => ( lastPage.hasMore ? lastPage.page + 1 : undefined ),
		enabled: !!api
	} );
};

export default useBrowse;
