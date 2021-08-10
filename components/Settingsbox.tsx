import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {Text, ToastAndroid} from 'react-native';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
} from 'react-native-settings-page';
//import Icon from 'react-native-vector-icons/Feather';
import logout from '../data/logout';
import getMeta from '../data/Getmeta';

const Settingsbox = () => {
	const [meta, metawrite] = useState();
	useEffect(() => {
	getMeta(false).then(metaraw => {
		metawrite(metaraw);
		ToastAndroid.show("情報が更新されました。このまま使用することもできますが、更新を完全に適用するにはアプリの再起動が必要です。",4000);
	});
	}, []);

const lgout = () => {
    logout();
};
const openlink = (url:string) => {
    WebBrowser.openBrowserAsync(url);
}
    return(
<ReactNativeSettingsPage>
				<SectionRow text='設定'>
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
						text='絵文字とサーバー情報を更新'
						iconName='wrench'
						onPressCallback={() => {getMeta(true);}} 
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
				{meta &&
				<>
				<Text>サーバー名:{meta.name}</Text>
				<Text>バージョン:{meta.version}</Text>
				<Text>管理者:{meta.maintainerName}</Text>
				<Text>管理者メールアドレス:{meta.maintainerEmail}</Text>
				<Text>URL:{meta.uri}</Text>
				<Text>リポジトリ:{meta.repositoryUrl}</Text>
				<Text>説明:{meta.description}</Text>
				</>
				}
			</ReactNativeSettingsPage>
    )
}
export default Settingsbox;