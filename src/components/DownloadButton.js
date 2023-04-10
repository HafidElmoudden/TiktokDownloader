import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";

function DownloadButton({pressHandler, style, mainMenu}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressHandler ? pressHandler : null}
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 120,
        borderRadius: 30,
        backgroundColor: "#30A6A6",
        flexDirection: "row",
        marginLeft: mainMenu ? 0 : 33,
        ...style,
      }}>
      <Image
        source={require("../assets/download-solid.png")}
        style={{width: 20, height: 20}}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 14,
          marginLeft: 5,
        }}>
        Download
      </Text>
    </TouchableOpacity>
  );
}

export default DownloadButton;
