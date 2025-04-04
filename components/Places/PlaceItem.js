import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

function PlateItem({ place, onSelect }) {
	return (
		<Pressable onPress={onSelect}>
			<Image source={{ uri: place.imageUri }} />
			<View>
				<Text>{place.title}</Text>
				<Text>{place.address}</Text>
			</View>
		</Pressable>
	);
}

export default PlateItem;

const styles = StyleSheet.create({});
