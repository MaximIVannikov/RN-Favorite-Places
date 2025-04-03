import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

function OutlinedButton({ children, icon, onPress }) {
	return (
		<Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
			<Ionicons name={icon} size={18} style={styles.icon} color={Colors.primary500} />
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		margin: 4,
		paddingHorizontal: 12,
		paddingVertical: 6,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.primary500,
	},
	text: {
		color: Colors.primary500,
	},
	pressed: {
		opacity: 0.7,
	},
	icon: {
		marginRight: 6,
	},
});

export default OutlinedButton;
