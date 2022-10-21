import {StyleSheet} from 'react-native';

const noteStyles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(31,34,42)',
    borderWidth: 0,
    padding: 0,
    marginTop: 0.5,
    marginBottom: 0.5,
  },

  topcontainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  intopcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  normalcontainer: {
    width: '100%',
    flexDirection: 'column',
    paddingTop: 5,
  },
  namebox: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    marginLeft: 8,
  },
  nameSeparator: {
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 50,
    width: 1.5,
    height: 11,
    marginTop: 6,
    marginLeft: 5,
    marginRight: 5,
  },
  leftbox: {
    flex: 0.65,
    width: '100%',
    alignItems: 'center',
    //backgroundColor: 'blue',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  rightbox: {
    flex: 0.25,
    width: '100%',
    alignItems: 'center',
    //backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  middlebox: {
    flex: 0.1,
  },
  notebox: {
    marginLeft: 5,
    width: '85%',
    //width: 100,
    //height: 100,
    backgroundColor: '#ffffff',
  },
  notetext: {
    color: 'rgba(230,230,230,1)',
  },
  username: {
    color: 'rgba(200,200,200,1)',
    marginLeft: 5,
  },

  incardcontainer: {
    position: 'relative',
    //   marginLeft: 85,
    // height: 77,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //  backgroundColor: 'rgb(0,0,0)',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  /*RT系*/
  RTicon: {
    marginTop: 5,
    marginLeft: 32,
    color: '#fff',
  },
  RT1container: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: -3,
  },
  RTtext: {
    color: '#fff',
    fontSize: 13,
    marginTop: 3,
  },
  RTtextcontainer: {
    backgroundColor: '#3eb585',
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    maxWidth: '65%',
  },
  topRTcontainer: {
    // height: 25,
    width: 77,
    marginTop: 5,
    marginLeft: -30,
    backgroundColor: '#3eb585',
  },
  renoteavatarcontainer: {
    position: 'absolute',
    //height: 25,
    width: 25,
    marginRight: 3,
    marginLeft: 52,
  },
  renoteavataroverlay: {
    backgroundColor: 'rgba(230,230,230,1)',
  },
});

export default noteStyles;
