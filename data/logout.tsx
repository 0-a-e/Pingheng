import React from 'react';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const logout = () => {
    const storage: Storage = new Storage({
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache: true,
    })
}

export default logout;