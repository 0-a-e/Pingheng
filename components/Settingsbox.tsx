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

const Settingsbox= () => {
  return(
<ReactNativeSettingsPage>
				<SectionRow text='Usage'>
					<NavigateRow
						text='ログアウト'
						iconName='sign-out'
					//	onPressCallback={this._navigateToScreen} 
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
                    					<SwitchRow 
						text='SwitchRow' 
					//	iconName='your-icon-name'
					//	_value={this.state.switch}
					//	_onValueChange={() => { this.setState({ switch: !this.state.switch }) }} 
                    />
					<CheckRow 
						text='CheckRow'
					//	iconName='your-icon-name'
						_color='#000'
						//_value={this.state.check}
					//	_onValueChange={() => { this.setState({ check: !this.state.check }) }} 
                    />
					<SliderRow 
						text='SliderRow'
					//	iconName='your-icon-name'
						_color='#000'
						_min={0}
						_max={100}
						//_value={this.state.value}
					//	_onValueChange={value => { this.setState({ value }) }} 
                    />
				</SectionRow>
			</ReactNativeSettingsPage>
    )
}
export default Settingsbox;