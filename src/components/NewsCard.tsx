import React, { useCallback, useMemo } from 'react';
import Post from '@/lib/api/models/Post';
import Card from '@/components/Card';
import { Body, Subtitle, Title } from '@/components/Text';
import IconLink from '@/components/IconLink';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Color, useTheme } from '@/config/themes';
import Tag from '@/components/Tag';

const useStyles = () => {
	const theme = useTheme();

	return useMemo( () => StyleSheet.create( {
		footer: {
			backgroundColor: theme.colors.primary,
			padding: 24,
			alignItems: 'center',
			justifyContent: 'center'
		}
	} ), [ theme ] );
};

const NewsCard = React.memo( ( { item }: { item: Post } ) => {
	const styles = useStyles();

	const onLinkPress = useCallback( () => console.log( 'Read MoreClicked: #', item.id ), [ item.id ] );

	return (
		<Card
			header={(
				<>
					<Tag tag={`# ${item.id}`} />
					<Title>{item.title}</Title>
				</>
			)}
			footer={(
				<View style={styles.footer}>
					<Body color={Color.white}>Somnio Software at</Body>
					<Title color={Color.white}>Google I/O</Title>
					<Subtitle color={Color.white}>2024</Subtitle>
				</View>
			)}
			onPress={ onLinkPress }
		>
			<Body>{item.body}</Body>

			<IconLink
				icon={props => <MaterialIcons {...props} name="arrow-forward"/>}
			>
        Read More
			</IconLink>
		</Card>
	);
}, ( prevProps, nextProps ) => Post.equals( prevProps.item, nextProps.item ) );

export default NewsCard;
