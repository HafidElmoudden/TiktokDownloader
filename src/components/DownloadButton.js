import React from 'react'
import {Text, TouchableOpacity} from 'react-native';

function DownloadButton({pressHandler}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressHandler ? pressHandler : null}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 120,
        borderRadius: 30,
        backgroundColor: '#30A6A6',
        marginLeft:33
      }}>
      <Text style={{color: 'white', fontWeight:'bold'}}>Download</Text>
    </TouchableOpacity>
  )
}

export default DownloadButton