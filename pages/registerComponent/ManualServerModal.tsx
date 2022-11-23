import React, {useState} from 'react';
import Modal, {ModalContent, SlideAnimation} from 'react-native-modals';
import {View, useWindowDimensions, TouchableOpacity, Text} from 'react-native';
import loginProcess from './loginProcess';
import registerStyles from './registerStyles';
import {TextInput} from 'react-native-gesture-handler';
const ManualServerModal = (props: {
	visible: Boolean;
	switchManualLoginVisible: Function;
}) => {
	const [inputURL, setinputURL] = useState('');
	return (
		<Modal
			visible={props.visible}
			onTouchOutside={() => {
				props.switchManualLoginVisible();
			}}
			modalAnimation={
				new SlideAnimation({
					slideFrom: 'bottom',
				})
			}
			width={1}
			height={1}
			modalStyle={registerStyles.modalStyle}>
			<ModalContent>
				<View
					style={[
						{height: useWindowDimensions().height - 220},
						registerStyles.modalBackground,
					]}
					onTouchStart={() => {
						props.switchManualLoginVisible();
					}}
				/>
				<View style={registerStyles.modalContent}>
					<View style={registerStyles.inputView}>
						<TextInput
							style={registerStyles.inputStyle}
							placeholder="サーバーのURLを入力...(例:misskey.io)"
							placeholderTextColor="#fff"
							selectionColor="#fff"
							onChangeText={(text: string) => {
								setinputURL(text);
							}}
						/>
					</View>
					<TouchableOpacity
						onPress={() => {
							loginProcess(inputURL);
						}}
						style={registerStyles.manualLoginButton}>
						<Text style={registerStyles.manualLoginButtonTitle}>
							ログインする
						</Text>
					</TouchableOpacity>
				</View>
			</ModalContent>
		</Modal>
	);
};

export default ManualServerModal;
