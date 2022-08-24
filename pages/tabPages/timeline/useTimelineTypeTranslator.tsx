const useTimelineTypeTranslator = () => {
  const reConvert = (tlstate: any) => {
    switch (tlstate) {
      case 'localTimeline':
        return 0;
      case 'homeTimeline':
        return 1;
      case 'globalTimeline':
        return 2;
      case 'hybridTimeline':
        return 3;
    }
  };

  const convert = (tlstate: any) => {
    switch (tlstate) {
      case 0:
        return 'localTimeline';
      case 1:
        return 'homeTimeline';
      case 2:
        return 'globalTimeline';
      case 3:
        return 'hybridTimeline';
    }
  };

  const toEndpoint = (tlstate: any) => {
    switch (tlstate) {
      case 'localTimeline':
        return 'local-timeline';
      case 'homeTimeline':
        return 'timeline';
      case 'globalTimeline':
        return 'global-timeline';
      case 'hybridTimeline':
        return 'hybrid-timeline';
    }
  };
  return {reConvert, convert, toEndpoint};
};
export default useTimelineTypeTranslator;
