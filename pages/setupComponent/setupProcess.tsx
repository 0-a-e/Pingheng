import axios from 'axios';
import {registerUser} from '../../api/tokenManage';

const setupProcess = async params => {
  if ('session' in params && 'serverAddr' in params) {
    const session = params.session;
    const serverAddr = params.serverAddr;
    if (session.length > 0 && serverAddr.length > 0) {
      const getAuthRes = await getAuth(session, serverAddr);
      if (getAuthRes.status === 'success') {
        const ifRegisterSucceed = await registerUser(
          getAuthRes.data.user.id,
          getAuthRes.data.token,
        );
        if (ifRegisterSucceed) {
          return {status: 'success', info: getAuthRes.data};
        } else {
          return {
            status: 'error',
            message: 'ユーザー情報の保存に失敗しました',
          };
        }
      } else {
        return {
          status: 'error',
          message: getAuthRes.message,
        };
      }
    } else {
      return {status: 'error', message: 'ログイン情報が破損しています'};
    }
  } else {
    return {status: 'error', message: 'ログイン情報が受信できませんでした'};
  }
};

const getAuth = async (sessionId: String, serverAddr: String) => {
  try {
    const checkurl = serverAddr + '/api/miauth/' + sessionId + '/check';
    const response = await axios.post(checkurl);
    if (response.data.ok) {
      return {status: 'success', data: response.data};
      /* HMSAvailability.isHuaweiMobileServicesAvailable()
                        .then((res) => { console.log(JSON.stringify(res)) })
                        .catch((err) => { console.log(JSON.stringify(err)) });*/
    } else {
      return {
        status: 'error',
        message: '認証に失敗しました。ネットワーク接続を確認してください。',
      };
    }
  } catch (error) {
    return {status: 'error', message: 'getAuthで不明なエラーが発生しました'};
  }
};

export default setupProcess;
