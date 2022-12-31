import axios, { AxiosError } from 'axios';
import useRealmManage, {serverInfoManage} from './realm/realmManage';
import { getUser } from './tokenManage';

export const sendAPI = async ([ifneedtoken, endpoint, data]: [
  Boolean,
  String,
  Object,
]) => {
  const {getInfo} = serverInfoManage();
  const serverInfo = await getInfo();
  const userInfo = await getUser();
  let token: string, serverURL: string;
  if (serverInfo && userInfo) {
    token = userInfo.password;
    serverURL = serverInfo.uri;
  } else {
    console.log('sendAPI: ユーザー情報またはサーバー情報がありません');
    return false;
  }
  const getjsondata = () => {
    if (ifneedtoken) {
      return {i: token, ...data};
    } else {
      return data;
    }
  };
  const datajson = getjsondata();
  try {
    const response = await axios.post(serverURL + '/api/' + endpoint, datajson);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      if (response.data) {
        return response.data;
      } else {
        return true;
      }
    } else {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data);
      return false;
    }
  } catch (error: any) {
    if (error.message === 'Network Error') {
      console.log('sendAPI: ネットワークエラー');
      return false;
    } else if (error.response.status === 429) {
      console.log('sendAPI: リクエストが多すぎます');
      console.log(error.message);
      return false;
    } else {
      console.log('sendAPI: 不明なエラー');
      console.log(error.message);
      return false;
    }
  }
};

export const getMeta = async (url: string) => {
  try {
    const resp = await axios.post(url + '/api/meta').catch(err => {
      if ((err = '[Error:Network Error]')) {
        console.log('ネットワークエラー');
        return false;
      } else {
        console.log('failed getting meta. error:', err);
        console.log('行:', err.linenumber);
        return false;
      }
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      console.log('failed getting meta. error:', resp.status);
      return false;
    }
  } catch (e) {
    console.log('failed getting meta. error:', e);
    return false;
  }
};
