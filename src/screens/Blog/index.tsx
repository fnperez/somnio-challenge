import { View } from 'react-native';
import { Subtitle, Title } from '@/components/Text';
import Container from '@/components/Container';
import BlogNav from '@/screens/Blog/BlogNav';

const BlogScreen = () => (
	<Container style={{ gap: 14 }}>
		<View>
			<Title>Blog</Title>
			<Subtitle>Keep posted on the latest news!</Subtitle>
		</View>

		<BlogNav />
	</Container>
);

export default BlogScreen;
