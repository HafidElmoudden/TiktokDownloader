import React from "react";
import {Image, Text, View} from "react-native";
import {Bar} from "react-native-progress";
import {formatBytes} from "../utils/formatBytes";

function DownloadedItems({downloading}) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
      }}>
      <Image
        source={{
          uri: downloading.image || "",
        }}
        style={{
          width: 140,
          height: 90,
          resizeMode: "contain",
          borderRadius: 10,
          alignSelf: "flex-start",
        }}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          marginLeft: 15,
          width: "45%",
          height: "100%",
        }}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image
            source={{
              uri: downloading.avatar,
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 100,
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#141414",
              marginTop: 5,
              marginLeft: 6,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {downloading.nickname || ""}
          </Text>
        </View>
        <Text
          style={{color: "#A1A1A1", fontSize: 15, marginTop: 5}}
          numberOfLines={1}
          ellipsizeMode="tail">
          {downloading.title || ""}
        </Text>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "130%",
            }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                  marginBottom: 3,
                }}>
                <Text style={{color: "rgb(48,166,166)"}}>
                  {formatBytes(downloading.contentLength)}
                </Text>
                <Text
                  style={{
                    marginLeft: "9%",
                  }}>{`1MB/${formatBytes(downloading.contentLength)}`}</Text>
              </View>

              <View
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                }}>
                <Bar
                  progress={Number(downloading.progress) * 0.01}
                  width={130}
                  color={"rgb(48,166,166)"}
                  unfilledColor={"#E2E2E2"}
                  borderWidth={0}
                />
              </View>
            </View>
            <View>
              <Image
                source={require("../assets/pause-button.png")}
                style={{marginLeft: 3, width: 25, height: 25}}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DownloadedItems;
