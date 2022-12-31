import Realm from 'realm';
import {emojiType} from '../../types/EmojiTypes';
import {useEffect, useState} from 'react';
import {serverInfoSchema, featuresSchema} from './schema/serverInfoSchema';
import {serverInfoCustomEmojisSchema} from './schema/serverInfoCustomEmojisSchema';
import {customEmojisSchema} from './schema/customEmojisSchema';
import {noteSettingsSchema} from './schema/noteSettingsSchema';

export const openRealm = () => {
  const config = {
    schema: [
      serverInfoSchema,
      featuresSchema,
      serverInfoCustomEmojisSchema,
      customEmojisSchema,
      noteSettingsSchema,
    ],
    schemaVersion: 1,
  };

  return new Realm(config);
};

export const noteSettingsManage = () => {
  const changeVisibility = async (
    visibility: 'public' | 'home' | 'followers' | 'specified',
  ) => {
    try {
      const realm = openRealm();
      const noteSettings =
        realm.objects<typeof noteSettingsSchema>('noteSettings')[0];
      realm.write(() => {
        noteSettings.visibility = visibility;
      });
      return true;
    } catch (e) {
      console.log('changeVisibility ERROR:', e);
      return false;
    }
  };

  const managelocalOnly = (value: boolean) => {
    try {
      const realm = openRealm();
      const noteSettings =
        realm.objects<typeof noteSettingsSchema>('noteSettings')[0];
      realm.write(() => {
        noteSettings.localOnly = value;
      });
    } catch (e) {
      console.log('changeVisibility ERROR:', e);
      return false;
    }
  };

  const deleteSettings = async () => {
    try {
      const realm = openRealm();
      realm.write(() => {
        realm.delete(realm.objects('noteSettings'));
        return true;
      });
    } catch (e) {
      console.log('deleteInfo ERROR:', e);
      return false;
    }
  };

  const getSettings = async () => {
    try {
      const realm = openRealm();
      const info = realm.objects('noteSettings');
      if (info.length > 0) {
        return info[0];
      } else {
        return null;
      }
    } catch (e) {
      console.log('getInfo ERROR:', e);
      return false;
    }
  };
  return {getSettings, changeVisibility, deleteSettings, managelocalOnly};
};

export const serverInfoManage = () => {
  const addInfo = async info => {
    try {
      if (info) {
        deleteInfo();
        const realm = openRealm();
        realm.write(() => {
          realm.create('serverInfo', info);
          /*仮*/
          const defaultDate = new Date(1000, 1, 1);
          for (const item of info.emojis) {
            item.isFavorited = false;
            item.lastUsedDate = defaultDate;
            realm.create('customEmojis', item);
          }
          realm.create('noteSettings', {
            visibility: 'home',
            localOnly: false,
            visibleUserIds: [],
          });
        });
        return true;
      } else {
        console.log('addInfo ERROR: info is null');
        return false;
      }
    } catch (e) {
      console.log('addInfo ERROR:', e);
      return false;
    }
  };

  const deleteInfo = async () => {
    try {
      const realm = openRealm();
      realm.write(() => {
        realm.delete(realm.objects('serverInfo'));
        return true;
      });
    } catch (e) {
      console.log('deleteInfo ERROR:', e);
      return false;
    }
  };

  const getInfo = async () => {
    try {
      const realm = openRealm();
      const info = realm.objects('serverInfo');
      if (info.length > 0) {
        return info[0];
      } else {
        return null;
      }
    } catch (e) {
      console.log('getInfo ERROR:', e);
      return false;
    }
  };
  return {getInfo, addInfo, deleteInfo};
};

export const emojisManage = () => {
  const addAttribute = async (
    info: emojiType,
    type: 'favorite' | 'history',
  ) => {
    try {
      const realm = openRealm();
      if (info) {
        realm.write(() => {
          const emoji = realm
            .objects('customEmojis')
            .filtered(`id = '${info.id}' AND name = '${info.name}'`)[0];
          type === 'favorite'
            ? (emoji.isFavorited = true)
            : (emoji.lastUsedDate = new Date());
        });
        return true;
      } else {
        console.log('addEmojis ERROR: info is null');
        return false;
      }
    } catch (e) {
      console.log('addEmojis ERROR:', e);
      return false;
    }
  };

  const removeAttribute = async (
    info: emojiType,
    type: 'favorite' | 'history',
  ) => {
    try {
      const realm = openRealm();
      if (info) {
        realm.write(() => {
          const emoji = realm
            .objects('customEmojis')
            .filtered(`id = '${info.id}' AND name = '${info.name}'`)[0];
          type === 'favorite'
            ? (emoji.isFavorited = false)
            : (emoji.lastUsedDate = new Date(1000, 1, 1));
        });
        return true;
      } else {
        console.log('removeEmojis ERROR: info is null');
        return false;
      }
    } catch (e) {
      console.log('removeEmojis ERROR:', e);
      return false;
    }
  };

  const resetEmojis = async () => {
    try {
      const realm = openRealm();
      realm.write(() => {
        realm.delete(realm.objects('customEmojis'));
      });
      return true;
    } catch (e) {
      console.log('resetEmojis ERROR:', e);
      return false;
    }
  };

  const checkIsEmojiFavorited = async (info: emojiType) => {
    try {
      const realm = openRealm();
      const objects = realm
        .objects('customEmojis')
        .filtered(
          `id = '${info.id}' AND name = '${info.name}' AND isFavorited == true`,
        );
      return !(objects.length > 0);
    } catch (e) {
      console.log('favoriteEmojis ERROR:', e);
      return false;
    }
  };

  const getFavEmojis = async () => {
    try {
      const realm = openRealm();
      const info = realm
        .objects('customEmojis')
        .filtered('isFavorited == true');
      return info;
    } catch (e) {
      console.log('favoriteEmojis ERROR:', e);
      return false;
    }
  };

  const getLatest50Emojis = async () => {
    try {
      const realm = openRealm();
      const info = realm
        .objects('customEmojis')
        .sorted('lastUsedDate', true)
        .filtered(
          'isFavorited == false AND lastUsedDate != $0',
          new Date(1000, 1, 1),
        )
        .slice(0, 20);
      return info;
    } catch (e) {
      console.log('getlatest20 ERROR:', e);
      return false;
    }
  };

  const getEmojis = async () => {
    try {
      const realm = openRealm();
      const info = realm.objects('customEmojis');
      return info;
    } catch (e) {
      console.log('getemoji ERROR:', e);
      return false;
    }
  };

  return {
    addAttribute,
    removeAttribute,
    resetEmojis,
    getFavEmojis,
    checkIsEmojiFavorited,
    getLatest50Emojis,
    getEmojis,
  };
};

const realmManage = () => {
  const resetRealm = async () => {
    const realm = openRealm();
    realm.write(() => {
      realm.deleteAll();
    });
  };
  return {
    resetRealm,
  };
};

export default realmManage;

//メモ customEmojisはlastUsedDateをつけてlastUsedDateが付いてる上位30を取得する関数を作る
// FavAndHistoryEmojiPickerは廃止
// db関連づけるのが正しいんだろうけどとりあえず操作時の関数にcustomEmojisの操作つけるのでも良いかも
// あとdbいろいろ弄ってるからSchemaVersion変えるか再インストール必要
