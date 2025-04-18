import { StyleSheet, View, Alert, Text, Image } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useState, useEffect } from 'react';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

function LocationPicker({ onPickLocation }) {
	const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
	const [pickedLocation, setPickedLocation] = useState();
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lng: route.params.pickedLng,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [route, isFocused]);

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				console.log(pickedLocation, 'pickedLocation');
				const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
				console.log(address, 'address');
				onPickLocation({ ...pickedLocation, address: address });
			}
		}
		handleLocation();
	}, [pickedLocation, onPickLocation]);

	async function verifyPermission() {
		if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.');
			return false;
		}

		return true;
	}
	async function getLocationHandler() {
		const hasPermission = await verifyPermission();
		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync();
		console.log(location, 'location');
		setPickedLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	function pickOnMapHandler() {
		navigation.navigate('Map');
	}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />;
	}
	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		marginVertical: 8,
		width: '100%',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: 'hidden',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 4,
	},
});
