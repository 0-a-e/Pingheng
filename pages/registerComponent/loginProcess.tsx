import {addInfo, deleteInfo} from '../../api/serverInfo';
import {getMeta} from '../../api/useApi';
import {v4 as uuidv4} from 'uuid';
import {ToastAndroid} from 'react-native';
import openBrowser from './openBrowser';
function isValidUrl(string: string): boolean {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' +
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i',
	);
	return !!pattern.test(string);
}

const generateServerURL = (url: string) => {
	if (isValidUrl(url)) {
		if (url.match(/https:\/\//) || url.match(/http:\/\//)) {
			return url;
		} else {
			return 'https://' + url;
		}
	} else {
		return false;
	}
};

const checkServerExists = async (url: string) => {
	const res = await getMeta(url);
	if (res) {
		return res;
	} else {
		return false;
	}
};

const openAuth = async (url: string) => {
	const uuid = uuidv4();
	let redirectUrl = 'pingheng://auth?serverAddr=' + url;
	const authUrl =
		url +
		'/miauth/' +
		uuid +
		'?name=PingHeng&callback=' +
		redirectUrl +
		'&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messageing,write:messageing,read:mutes,write:mutes,write:notes,read:notifications,write:notificaions,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes';
	openBrowser(authUrl);
};

const loginProcess = async (inputUrl: string) => {
	//あとで処理中表示
	const serverUrl = generateServerURL(inputUrl);
	if (serverUrl) {
		ToastAndroid.show('処理中...', 1000);
		const res = await checkServerExists(serverUrl);
		if (res) {
			try {
				await deleteInfo();
			} catch {
				console.log('failed deleteInfo');
			}
			if (await addInfo(res)) {
				openAuth(serverUrl);
			} else {
				ToastAndroid.show(
					'サーバー情報の登録に失敗しました。アプリを再起動し、再度お試しください。',
					2000,
				);
			}
		} else {
			ToastAndroid.show(
				'サーバーにアクセスできません。正しいURLを入力し、ネットワーク接続を確認してください。',
				2000,
			);
		}
	} else {
		ToastAndroid.show('URLが入力されていないか、無効なURLです。', 2000);
	}
};

export default loginProcess;
