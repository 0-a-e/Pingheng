import * as Keychain from 'react-native-keychain';

const registerUser = async (id: string, token: string) => {
  try {
    await Keychain.setGenericPassword(id, token);
    return await checkUserexists();
  } catch (error) {
    return false;
  }
};
const checkUserexists = async () => {
  try {
    if (await getUser()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getUser = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const removeUser = async () => {
  await Keychain.resetGenericPassword();
};

export {registerUser, getUser, removeUser, checkUserexists};
