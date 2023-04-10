import React, {useEffect, useState} from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import BottomSheet from "../components/BottomSheet";
import fetchData from "../utils/FetchData";
import DownloadFolderMaker from "../utils/DownloadFolderMaker";
import DownloadButton from "../components/DownloadButton";
import PasteButton from "../components/PasteButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadShowAd} from "../utils/ShowAd";
import DownloadsList from "../components/DownloadsList";
import {importData} from "../utils/ImportData";

function Download() {
  const [search, setSearch] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState([]);
  let refRBSheet = React.createRef(null);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setSearch(text);
  };

  const downloadingProgressHandler = value => {
    let arr = downloading;
    arr = arr.filter(e => e.id !== value.id);

    setDownloading([value, ...arr]);
  };

  const refHandler = value => {
    refRBSheet = value;
  };

  const downloadHandler = async () => {
    await DownloadFolderMaker();
    await fetchData(search, setLoading, setFetchedData, refRBSheet);
  };

  const clearHistoryAlert = () => {
    Alert.alert(
      "Downloads History",
      "Are you sure you want to clear all your downloads history ?\n\nNote: Your downloads won't be deleted from your phone!",
      [
        {
          text: "YES",
          onPress: () => {
            setDownloading([]);
            AsyncStorage.clear();
          },
        },
        {text: "NO", onPress: () => null},
      ],
      {
        cancelable: true,
      },
    );
  };

  const rateUsButton = () => {
    Alert.alert(
      "Thank You ❤️",
      "We appreciate your desire to rate us, but unfortuantely this feature isn't supported yet!",
    );
  };

  useEffect(() => {
    importData().then(arr => {
      setDownloading([...arr]);
    });
  }, []);

  return (
    <>
      <View style={{backgroundColor: "#FFFFFF", height: "100%", width: "100%"}}>
        <View
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}>
          <View
            style={{backgroundColor: "#F9D966", width: 180, height: 15}}></View>
          <Text
            style={{
              position: "absolute",
              color: "#59574D",
              fontWeight: "bold",
              fontSize: 17,
              top: 0.1,
            }}>
            TikSaver
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 40,
            width: "100%",
          }}>
          <TouchableOpacity
            style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            onPress={clearHistoryAlert}>
            <Image
              source={require("../assets/trash-solid.png")}
              style={{width: 30, height: 30}}
            />
            <Text style={{color: "#59574D", marginTop: 5}}>Clear History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            onPress={rateUsButton}>
            <Image
              source={require("../assets/star-solid.png")}
              style={{width: 35, height: 35}}
            />
            <Text style={{color: "#59574D", marginTop: 5}}>Rate Us</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 63,
              padding: 5,
            }}>
            <View
              style={{
                height: "100%",
                borderWidth: 0.5,
                width: "80%",
                paddingLeft: 10,
                paddingRight: 10,
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginEnd: 5,
                marginStart: 5,
                borderColor: "#F2F2F2",
                backgroundColor: "#FFFFFF",
                elevation: 3,
              }}>
              <Image
                source={require("../assets/link-solid.png")}
                style={{width: 25, height: 25, marginLeft: 5}}
              />
              <TextInput
                keyboardType="url"
                placeholder="Enter a video link..."
                onChangeText={setSearch}
                value={search}
                style={{
                  color: "black",
                  flex: 1,
                  marginLeft: 10,
                }}
              />
            </View>
            <PasteButton pressHandler={() => fetchCopiedText()} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5%",
            }}>
            <DownloadButton
              pressHandler={() => {
                loadShowAd().then(downloadHandler);
              }}
              style={{width: 180}}
              mainMenu
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              marginTop: 25,
            }}>
            <Text style={{color: "#4D4F55", fontWeight: "bold", fontSize: 18}}>
              Downloads:
            </Text>
            <Text style={{color: "#2F2F2F", fontSize: 15}}>
              {downloading.length} Files
            </Text>
          </View>
          {downloading.length !== 0 ? (
            <DownloadsList downloading={downloading} />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "50%",
              }}>
              <Text>You haven't downloaded anything yet!</Text>
            </View>
          )}
        </View>
      </View>
      <BottomSheet
        fetchedData={fetchedData}
        refHandler={refHandler}
        loading={loading}
        downloadingProgressHandler={downloadingProgressHandler}
        url={search}
      />
    </>
  );
}

export default Download;
