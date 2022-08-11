import {StyleSheet} from 'react-native';

const notifyStyles = StyleSheet.create({
  background: {
    backgroundColor: 'rgb(19,20,26)',
    height: '100%',
  },
  videoStyle: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  bottomBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 30,
  },
  startButton: {padding: 15, backgroundColor: 'rgb(240,240,240)'},
  startButtonTitle: {fontSize: 25, color: 'rgb(19,20,26)'},
  startButtonContainer: {borderRadius: 50, width: '80%', marginBottom: 10},
  manualServerButtonContainer: {borderRadius: 50, width: 250},
  /*ManualServerModal.tsx*/
  modalStyle: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  modalBackground: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  modalContent: {
    backgroundColor: 'rgb(38,40,52)',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    height: 185,
  },
  manualLoginButtonTitle: {color: '#fff'},
  manualLoginButtonContainer: {
    borderRadius: 50,
    width: 150,
    marginTop: 35,
    marginBottom: 35,
    backgroundColor: 'rgb(19,20,26)',
  },
  inputView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgb(19,20,26)',
    borderRadius: 20,
    marginTop: -1,
    justifyContent: 'center',
  },
  inputStyle: {color: 'white', fontSize: 17, marginLeft: 10, marginRight: 10},
});
export default notifyStyles;
