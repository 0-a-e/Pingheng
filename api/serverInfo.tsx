import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm, {BSON} from 'realm';

const schema = {
  name: 'serverInfo',
  properties: {
    maintainerName: 'string',
    maintainerEmail: 'string',
    version: 'string',
    name: 'string',
    uri: 'string',
    description: 'string',
    langs: {type: 'list', objectType: 'string'},
    tosUrl: 'string',
    repositoryUrl: 'string',
    feedbackUrl: 'string',
    disableRegistration: 'bool',
    disableLocalTimeline: 'bool',
    disableGlobalTimeline: 'bool',
    driveCapacityPerLocalUserMb: 'int',
    driveCapacityPerRemoteUserMb: 'int',
    emailRequiredForSignup: 'bool',
    enableHcaptcha: 'bool',
    hcaptchaSiteKey: 'string',
    enableRecaptcha: 'bool',
    recaptchaSiteKey: {type: 'string', optional: true},
    swPublickey: {type: 'string', optional: true},
    themeColor: 'string',
    mascotImageUrl: 'string',
    bannerUrl: 'string',
    errorImageUrl: 'string',
    iconUrl: 'string',
    backgroundImageUrl: {type: 'string', optional: true},
    logoImageUrl: {type: 'string', optional: true},
    maxNoteTextLength: 'int',
    emojis: {type: 'list', objectType: 'Emojis'},
    enableEmail: 'bool',
    enableTwitterIntegration: 'bool',
    enableGithubIntegration: 'bool',
    enableDiscordIntegration: 'bool',
    enableServiceWorker: 'bool',
    translatorAvailable: 'bool',
    pinnedPages: {type: 'list', objectType: 'string'},
    pinnedClipId: {type: 'string', optional: true},
    cacheRemoteFiles: 'bool',
    requireSetup: 'bool',
    proxyAccountName: {type: 'string', optional: true},
    features: 'Features',
  },
};
const featuresSchema = {
  name: 'Features',
  properties: {
    registration: 'bool',
    localTimeLine: 'bool',
    globalTimeLine: 'bool',
    emailRequiredForSignup: 'bool',
    elasticsearch: 'bool',
    hcaptcha: 'bool',
    recaptcha: 'bool',
    objectStorage: 'bool',
    twitter: 'bool',
    github: 'bool',
    discord: 'bool',
    serviceWorker: 'bool',
    miauth: 'bool',
  },
};

const emojisSchema = {
  name: 'Emojis',
  properties: {
    id: 'string',
    aliases: {type: 'list', objectType: 'string'},
    name: 'string',
    category: {type: 'string', optional: true},
    host: {type: 'bool', optional: true},
    url: 'string',
  },
};

const config = {
  schema: [schema, featuresSchema, emojisSchema],
  schemaVersion: 1,
};

const addInfo = async info => {
  try {
    const projectRealm = await Realm.open(config);
    await projectRealm.write(() => {
      projectRealm.create('serverInfo', info);
    });
    return true;
    /*   projectRealm.write(() => {
      projectRealm.create('serverInfo', info);
      return true;
    });*/
  } catch (e) {
    console.log('addInfo ERROR:', e);
    return false;
  }
};

// Define the function for deleting a task.
const deleteInfo = async () => {
  try {
    const projectRealm = await Realm.open(config);
    projectRealm.write(() => {
      projectRealm.delete('serverInfo');
      return true;
    });
  } catch (e) {
    console.log('deleteInfo ERROR:', e);
    return false;
  }
};

export {addInfo, deleteInfo};
