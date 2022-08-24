//useReducerをimport
import React, {useCallback, useState} from 'react';
import {useBetween} from 'use-between';

const useNotelist = () => {
  const [notelist, setNotelist] = useState([]);
  const addToHead = useCallback(
    addlist => setNotelist([...addlist, ...notelist]),
    [notelist],
  );
  const addToTail = useCallback(
    addlist => setNotelist([...notelist, ...addlist]),
    [notelist],
  );
  const reset = useCallback(() => setNotelist([]), []);
  return {
    notelist,
    addToHead,
    addToTail,
    reset,
  };
};

const useTimeline = () => {
  const [timeline, setTimeline] = useState('homeTimeline');
  const setTimelineHome = useCallback(() => setTimeline('homeTimeline'), []);
  const setTimelineLocal = useCallback(() => setTimeline('localTimeline'), []);
  const setTimelineGlobal = useCallback(
    () => setTimeline('globalTimeline'),
    [],
  );
  const setTimelineHybrid = useCallback(
    () => setTimeline('hybridTimeline'),
    [],
  );
  return {
    timeline,
    setTimelineHome,
    setTimelineLocal,
    setTimelineGlobal,
    setTimelineHybrid,
  };
};

const useTimelineType = () => useBetween(useTimeline);
const useSharedCounter = () => useBetween(useNotelist);
export {useSharedCounter, useTimelineType};
