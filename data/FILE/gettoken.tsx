import * as SecureStore from 'expo-secure-store';

const gettoken = async () => {
  const res = await SecureStore.getItemAsync("user1");
        return res;
}

export default gettoken;