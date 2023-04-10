import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Bar } from "react-native-progress";
import { formatBytes } from "../utils/FormatBytes";

function DownloadsList({downloading}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={<View style={{height: 350}} />}
      contentContainerStyle={{
        width: "130%",
      }}
      data={downloading}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: "100%",
            }}
          />
        );
      }}
      renderItem={({index, item: e}) => {
        return (
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              marginTop: 15,
              marginBottom: 15,
              borderRadius: 10,
            }}
            key={index}>
            <Image
              source={{
                uri: e.image || "",
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
                    uri: e.avatar,
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
                  {e.nickname || ""}
                </Text>
              </View>
              <Text
                style={{color: "#A1A1A1", fontSize: 15, marginTop: 5}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {e.title || ""}
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
                      alignItems: "flex-start",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "86%",
                        marginBottom: 3,
                      }}>
                      {e.status === "finished" && (
                        <>
                          <Text style={{color: "rgb(48,166,166)"}}>
                            Downloaded
                          </Text>
                          <Text style={{color: "rgb(48,166,166)"}}>
                            {formatBytes(e.contentLength) || "0"}
                          </Text>
                        </>
                      )}
                      {e.status === "going" && (
                        <Text>{`${formatBytes(e.bytesWritten) || "0"}/${formatBytes(
                          e.contentLength,
                        )||"0"}`}</Text>
                      )}
                    </View>

                    {e.status === "going" && (
                      <View
                        style={{
                          width: "100%",
                          justifyContent: "flex-start",
                        }}>
                        <Bar
                          progress={Number(Number(e.progress) * 0.01)}
                          width={200}
                          color={"rgb(48,166,166)"}
                          unfilledColor={"#E2E2E2"}
                          borderWidth={0}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

export default DownloadsList;
