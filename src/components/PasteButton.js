import React from 'react'
import {Image, Text, TouchableOpacity} from 'react-native';

function PasteButton({pressHandler, style}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressHandler ? pressHandler : null}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 55,
        width: 55,
        borderRadius: 100,
        backgroundColor: '#30A6A6',
        flexDirection:'row',
        ...style
      }}>
      <Image source={require("../assets/paste-solid.png")} style={{width:20, height:20}}/>
    </TouchableOpacity>
  )
}

export default PasteButton