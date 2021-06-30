import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
    SwitchRow,
	CheckRow,
    SliderRow
} from 'react-native-settings-page';
//import Icon from 'react-native-vector-icons/Feather';
import logout from '../data/logout';

const Settingsbox= () => {
const lgout = () => {
    logout();
};
    return(
<ReactNativeSettingsPage>
				<SectionRow text='Usage'>
					<NavigateRow
						text='ログアウト'
						iconName='sign-out'
						onPressCallback={lgout} 
                        />
                    <NavigateRow
						text='Github'
						iconName='github'
					//	onPressCallback={this._navigateToScreen} 
                    />
                    <NavigateRow
						text='@oae'
				//		iconName='github'
					//	onPressCallback={this._navigateToScreen} 
                    />
                    <NavigateRow
						text='バージョン: 1.0'
						iconName='info'
					//	onPressCallback={this._navigateToScreen} 
                    />
				</SectionRow>
			</ReactNativeSettingsPage>
    )
}
export default Settingsbox;