import {StyleSheet} from 'react-native';

export const settingsStyles = StyleSheet.create({
	background: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgb(19,20,26)',
	},
	logoBox: {
		width: '100%',
		backgroundColor: 'rgb(19,20,26)',
		alignItems: 'center',
		marginBottom: 20,
		marginTop: 10,
	},
	topButtonBox: {
		width: '100%',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
	},
	topButton: {
		width: '45%',
		backgroundColor: 'rgb(31,34,42)',
		height: 120,
		borderColor: '#202020',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topButtonLeft: {
		borderBottomStartRadius: 20,
		borderTopStartRadius: 20,
		borderBottomEndRadius: 0,
		borderTopEndRadius: 0,
		borderRightWidth: 0.5,
	},
	topButtonRight: {
		borderBottomStartRadius: 0,
		borderTopStartRadius: 0,
		borderBottomEndRadius: 20,
		borderTopEndRadius: 20,
		borderLeftWidth: 0.5,
	},
	bottomButtonContainer: {
		width: '100%',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
	},
	bottomButton: {
		width: '90%',
		borderColor: '#202020',
		backgroundColor: 'rgb(31,34,42)',
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	bottomButtonTop: {
		borderBottomWidth: 0.5,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
	},
	bottomButtonBottom: {
		borderTopWidth: 0.5,
		borderBottomStartRadius: 20,
		borderBottomEndRadius: 20,
	},
});
