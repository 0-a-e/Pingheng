import {StyleSheet} from 'react-native';

const notifyStyles = StyleSheet.create({
  card: {
    borderRadius: 50,
    backgroundColor: 'rgb(31,34,42)',
    borderWidth: 0,
    padding: 0,
    height: 77,
    marginTop: 4,
    marginBottom: 4,
  },

  cardwrapper: {
    width: '60%',
    flexDirection: 'row',
  },

  topcontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  normalcontainer: {
    width: '100%',
    flexDirection: 'column',
    paddingTop: 5,
  },
  notebox: {
    marginLeft: 5,
    //width: "85%",
    width: 100,
    height: 100,
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
    position: 'absolute',
    marginLeft: 115,
    height: 77,
    width: '100%',
    flexDirection: 'column',
  },
  avatarContainer: {
    zIndex: 20,
  },
  avatar: {
    position: 'relative',
    backgroundColor: 'rgba(230,230,230,1)',
    borderRadius: 50,
    height: 77,
    width: 77,
  },

  actionring: {
    position: 'absolute',
    zIndex: 18,
    height: 77,
    width: 110,
    borderRadius: 50,
    justifyContent: 'center',
    paddingLeft: 83,
  },
  actionringicon: {
    position: 'relative',
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
    height: 25,
    width: 77,
    marginTop: 5,
    marginLeft: -30,
    backgroundColor: '#3eb585',
  },
  renoteavatarcontainer: {
    position: 'absolute',
    height: 25,
    width: 25,
    marginRight: 3,
    marginLeft: 52,
  },
  renoteavataroverlay: {
    backgroundColor: 'rgba(230,230,230,1)',
  },
});

export default notifyStyles;
