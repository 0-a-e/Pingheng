import React from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler, ToastAndroid } from 'react-native';

const logout = async () => {
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    });
    await storage.remove({
        key: 'user'
    });
    await storage.remove({
        key: 'meta'
    });
    await ToastAndroid.show("ログアウトしました。再度アプリを開いてログインしてください。", 3000);
    await BackHandler.exitApp();
}

export default logout;