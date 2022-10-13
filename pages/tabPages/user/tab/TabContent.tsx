import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import NoteBox from '../../noteComponent/NoteBox';
import useEditUserNote from './useEditUserNote';

const TabContent = ({userId, mode}: {userId: string; mode: string}) => {
  const [notelist, setNotelist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {headUpdate, tailUpdate, firstUpdate} = useEditUserNote({
    userId,
    mode,
    notelist,
    setNotelist,
    setIsLoading,
  });
  useEffect(() => {
    firstUpdate();
  }, []);

  return (
    <View style={{width: '100%', backgroundColor: 'rgb(19,20,26)'}}>
      <NoteBox
        notelist={notelist}
        tailUpdate={tailUpdate}
        headUpdate={headUpdate}
      />
    </View>
  );
};

export default TabContent;
