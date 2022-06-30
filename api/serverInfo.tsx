import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';

const TasksContext = React.createContext(null);

const TasksProvider = ({children}) => {
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      schema: [schema, emojisSchema],
      schemaVersion: 1,
    };
    // open a realm for this particular project
    Realm.open(config).then(projectRealm => {
      realmRef.current = projectRealm;
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
      }
    };
  }, []);

  const addInfo = info => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create('ServerInfo', info);
    });
  };

  // Define the function for deleting a task.
  const deleteInfo = () => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete('ServerInfo');
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        addInfo,
        deleteInfo,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error('TasksProviderの外でuseTasks()を呼び出していませんか?'); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

const schema = {
  name: 'meta',
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
    emojis: {type: 'list', objectType: 'emojis'},
  },
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
  features: {
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
  name: 'emojis',
  properties: {
    id: 'string',
    aliases: {type: 'list', objectType: 'string'},
    name: 'string',
    category: 'string',
    host: 'bool',
    url: 'string',
  },
};

export {TasksProvider, useTasks};
