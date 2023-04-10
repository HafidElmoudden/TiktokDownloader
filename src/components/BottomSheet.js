import React, {useRef, useState} from "react";
import DownloadButton from "./DownloadButton";
import {Image, View, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import RNFS from "react-native-fs";
import {loadShowAd} from "../utils/ShowAd";
import {addToAsyncStorage} from "../utils/AddToAsyncStorage";
import ReactNativeBlobUtil from "react-native-blob-util";
import noWmFetchData from "../utils/NoWmFetchData";

const DownloadPath =
  RNFS.ExternalStorageDirectoryPath + "/" + "ATiktokDownloader";

const BottomSheet = ({
  fetchedData,
  refHandler,
  loading,
  downloadingProgressHandler,
  url,
}) => {

  const RBSheetRef = useRef(null);
  if (RBSheetRef) refHandler(RBSheetRef);
  const authorNick = fetchedData?.itemInfo?.itemStruct?.author?.nickname;
  const title = fetchedData?.seoProps?.metaParams?.title;
  const image = fetchedData?.itemInfo?.itemStruct?.video?.cover;
  const avatar = fetchedData?.itemInfo?.itemStruct?.author?.avatarLarger;

  function downloadVideo(url, type, format) {
    const filePath = `${DownloadPath}/TiktokDownloader${type}-${authorNick}--${
      (Math.random() * 100000) | 0
    }${format}`;
    const id = Number(filePath.split("--")[1].replace(format, ""));

    RBSheetRef.current.close();

    const defaultState = {
      id: id,
      nickname: authorNick,
      title: title,
      image: image,
      avatar: avatar,
      status: "going",
    };

    const config = {
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        path: filePath,
      },
    };

    let new_state = {};
    ReactNativeBlobUtil.config(config)
      .fetch("GET", url)
      .progress({count: 5, interval: 500}, (bytesWritten, contentLength) => {
        let progressPercent = ((bytesWritten / contentLength) * 100).toFixed(0);
        new_state = Object.assign({}, defaultState);
        new_state.bytesWritten = bytesWritten || 0;
        new_state.contentLength = contentLength || 0;
        new_state.progress = progressPercent || 0;

        downloadingProgressHandler(new_state);
      })
      .then(async () => {
        new_state.status = "finished";
        downloadingProgressHandler(new_state);
        await loadShowAd();
        await addToAsyncStorage(String(id), new_state);
      })
      .catch(e => {
        console.log("RNFetchBlob Error : ", e);
      });
  }

  return (
    <RBSheet
      ref={RBSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={600}
      customStyles={{
        wrapper: {
          blurRadius: 1,
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopEndRadius: 20,
        },
      }}>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEFEFE",
        }}>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}>
            <Text style={{fontSize: 20, fontWeight: "200"}}>Loading</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <Text
              style={{
                marginTop: "5%",
                marginBottom: "6%",
                fontWeight: "bold",
                fontSize: 18,
                color: "black",
              }}>
              Video Found
            </Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                width: "90%",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                marginBottom: 15,
              }}>
              <Image
                source={{
                  uri: image || "",
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
                  width: "40%",
                  height: "100%",
                }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "black",
                    marginTop: 5,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {authorNick || ""}
                </Text>
                <Text
                  style={{color: "black", fontSize: 15, marginTop: 5}}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {title || ""}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                width: "90%",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 17,
                width: "100%",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "96%",
                  overflow: "hidden",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}>
                  <Image source={require("../assets/video-download.png")} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      marginLeft: 15,
                    }}>
                    Watermark Video
                  </Text>
                </View>
                <DownloadButton
                  pressHandler={() => {
                    const videoUrl =
                      fetchedData?.itemInfo?.itemStruct?.video?.downloadAddr ||
                      "";
                    if (videoUrl === "") {
                      alert("URL is Invalid!");
                      return;
                    }
                    downloadVideo(videoUrl, "Video", ".mp4");
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 15,
                  width: "96%",
                  overflow: "hidden",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image source={require("../assets/video-download.png")} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      marginLeft: 15,
                    }}>
                    No Watermark Video
                  </Text>
                </View>
                <DownloadButton
                  pressHandler={async () => {
                    const noWmData = await noWmFetchData(url);
                    const videoUrl = noWmData?.data?.video[0] || "";
                    if (videoUrl === "") {
                      alert("URL is Invalid!");
                      return;
                    }
                    downloadVideo(videoUrl, "NoWmVideo", ".mp4");
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 15,
                  width: "96%",
                  overflow: "hidden",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image source={require("../assets/audio-download.png")} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      marginLeft: 15,
                    }}>
                    Audio Only (MP3)
                  </Text>
                </View>
                <DownloadButton
                  pressHandler={() => {
                    const audioUrl =
                      fetchedData?.itemInfo?.itemStruct?.music?.playUrl || "";
                    if (audioUrl === "") {
                      alert("URL is Invalid!");
                      return;
                    }
                    downloadVideo(audioUrl, "Audio", ".mp3");
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 15,
                  width: "96%",
                  overflow: "hidden",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image source={require("../assets/image-download.png")} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      marginLeft: 15,
                    }}>
                    Video Thumbnail
                  </Text>
                </View>
                <DownloadButton
                  pressHandler={() => {
                    const imageUrl =
                      fetchedData?.itemInfo?.itemStruct?.video?.cover || "";
                    if (imageUrl === "") {
                      alert("URL is Invalid!");
                      return;
                    }
                    downloadVideo(imageUrl, "Thumbnail", ".jpg");
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 15,
                  width: "96%",
                  overflow: "hidden",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image source={require("../assets/image-download.png")} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      marginLeft: 15,
                    }}>
                    User Avatar
                  </Text>
                </View>
                <DownloadButton
                  pressHandler={() => {
                    const imageUrl =
                      fetchedData?.itemInfo?.itemStruct?.author?.avatarLarger ||
                      "";
                    if (imageUrl === "") {
                      alert("URL is Invalid!");
                      return;
                    }
                    downloadVideo(imageUrl, "Avatar", ".jpeg");
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
