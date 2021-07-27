import React, { useState,forwardRef, useImperativeHandle } from "react";
import Style from './Style';
import Textarea from 'react-native-textarea';

const Test = forwardRef((props,ref) => {
  const handleChange = e => {
    textwrite(e);
  };

  useImperativeHandle(ref, () => ({

  returntext() {
  return text;
  }

}));
  const [text, textwrite] = useState(null);

  
const textareabox = () => {
    return (
      <Textarea
        value={text}
        onChangeText={e => {
          handleChange(e);
        }}
        style={Style.textarea}
        containerStyle={Style.textareaContainer}
        maxLength={3000}
        placeholder={'ノートしたいことを入力してスライド...'}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
      />
      );
  }

  return textareabox();
});


export default Test;
  