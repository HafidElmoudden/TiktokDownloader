import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

function MainButton({title, pressHandler, width, height, style}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressHandler}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: height ? height : 43,
        width: width ? width : 120,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3742fa',
        marginStart: title === 'Download' ? 20 : 0,
        ...style
      }}>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
}

export default MainButton;
