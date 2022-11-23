import {StyleSheet} from 'react-native';

export const serverInfoModalStyles = StyleSheet.create({
	/*ServerInfoModal*/
	modalStyle: {
		borderRadius: 20,
		marginBottom: 20,
		backgroundColor: 'transparent',
		padding: 0,
		margin: 0,
	},
	/*ServerInfoModalContent*/
	modalContentBox: {
		backgroundColor: 'rgb(255,255,255)',
		width: '100%',
		borderRadius: 20,
		height: 345,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	topBox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#0657F3',
		padding: 10,
		borderRadius: 20,
		marginBottom: 10,
	},
	serverIcon: {
		width: 45,
		height: 45,
		backgroundColor: '#fff',
		borderRadius: 10,
		marginRight: 10,
	},
	descriptionBox: {
		borderRadius: 20,
		backgroundColor: '#c9d3f2',
		padding: 10,
		marginBottom: 10,
		height: 100,
	},
});

export const infoTileStyles = StyleSheet.create({
	infoTile: {
		backgroundColor: '#c9d3f2',
		width: '50%',
		height: 70,
		borderColor: '#b7c6f7',
		padding: 5,
	},
	topLeft: {
		borderBottomWidth: 0.5,
		borderRightWidth: 0.5,
		borderTopStartRadius: 20,
	},
	topRight: {
		borderBottomWidth: 0.5,
		borderLeftWidth: 0.5,
		borderTopEndRadius: 20,
	},
	bottomLeft: {
		borderTopWidth: 0.5,
		borderRightWidth: 0.5,
		borderBottomStartRadius: 20,
	},
	bottomRight: {
		borderTopWidth: 0.5,
		borderLeftWidth: 0.5,
		borderBottomEndRadius: 20,
	},
});
