import React, {useEffect, useState} from 'react';
import {noteSettingsManage} from '../../../../api/realm/realmManage';
import NotePostBox from './NotePostBox';
import NoteSettings from './settings/NoteSettings';

const SendNoteCard = () => {
  const [showNoteSettings, setShowNoteSettings] = useState<boolean>(false);
  const switchShowNoteSettings = () => setShowNoteSettings(!showNoteSettings);
  const {
    managelocalOnly,
    changeVisibility: changeRealmVisibility,
    getSettings,
  } = noteSettingsManage();
  const [isLocalOnly, setIsLocalOnly] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<
    'public' | 'home' | 'followers' | 'specified'
  >('home');

  const changeVisibility = (
    vsbl: 'public' | 'home' | 'followers' | 'specified',
  ) => {
    setVisibility(vsbl);
    changeRealmVisibility(vsbl);
  };

  useEffect(() => {
    (async () => {
      const settings = await getSettings();
      if (settings) {
        setIsLocalOnly(settings.localOnly);
        setVisibility(settings.visibility);
      }
    })();
  }, []);

  const switchIsLocalOnly = () => {
    managelocalOnly(!isLocalOnly);
    setIsLocalOnly(!isLocalOnly);
  };

  if (!showNoteSettings) {
    return (
      <NotePostBox
        switchShowNoteSettings={switchShowNoteSettings}
        visibility={visibility}
        isLocalOnly={isLocalOnly}
      />
    );
  } else {
    return (
      <NoteSettings
        changeVisibility={changeVisibility}
        visibility={visibility}
        switchShowNoteSettings={switchShowNoteSettings}
        isLocalOnly={isLocalOnly}
        switchIsLocalOnly={switchIsLocalOnly}
      />
    );
  }
};

export default SendNoteCard;
