import * as WebBrowser from 'expo-web-browser';
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
const openlink = (url:string) => {
    WebBrowser.openBrowserAsync(url);
}
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
						onPressCallback={() => {openlink("https://github.com/0-a-e/Pingheng")}} 
                    />
                    <NavigateRow
						text='絵文字を更新'
						iconName='wrench'
					//	onPressCallback={() => {openlink("https:///msk.seppuku.club/@oae")}} 
                    />
                    <NavigateRow
						text='@oae'
				//		iconName='github'
						onPressCallback={() => {openlink("https:///msk.seppuku.club/@oae")}} 
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