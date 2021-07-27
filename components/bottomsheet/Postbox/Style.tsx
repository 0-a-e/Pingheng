import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    textarea: {
      textAlignVertical: 'top',  // android用　外さない
      height: 170,
      fontSize: 14,
      color: '#c7c7c7',
    },
  textareaContainer: {
    height: 180,
    padding: 10,
    marginLeft:"5%",
    marginRight:"5%",
    width: "90%",
    backgroundColor: '#1a202e',
    borderRadius: 20,
},
});

export default styles;