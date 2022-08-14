import React, {useCallback, useState, useMemo, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  PermissionsAndroid,
  Clipboard,
  StatusBar,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
// import Clipboard from "@react-native-community/react-native-clipboard";
import MainButton from './MainButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNFS from 'react-native-fs';
import DownloadButton from './DownloadButton';
import URLParse from 'url-parse';
// import ufs from '"url-file-size"';

const URL_DOWNLOAD =
  'https://www.tiktok.com/@hazo9a1/video/7125918538094759174';

const DownloadPath =
  RNFS.ExternalStorageDirectoryPath + '/' + 'ATiktokDownloader';

function Download() {
  const [search, setSearch] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  const refRBSheet = useRef();

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setSearch(text);
  };

  const downloadHandler = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    }

    try {
      const AppFolder = 'ATiktokDownloader';
      const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
      RNFS.mkdir(DirectoryPath)
    } catch (e) {
      console.log(e);
      alert('Error: ' + e);
    }
    await fetchData(URL_DOWNLOAD);
  };

  const fetchData = async url => {
    if (url === '') {
      alert('URL Field is empty!');
      return;
    }
    let paresedUrlObject = URLParse(url).pathname.split("/");
    let URL = `https://www.tiktok.com/node/share/video/${paresedUrlObject[1]}/${paresedUrlObject[3]}`
    setLoading(true);
    fetch(URL).then(res => {
      // setLoading(false);
      res
        .json()
        .then(json => {
          console.log(json)
          // alert(json);
          setFetchedData(json);
          refRBSheet.current.open();
          console.log("here??xd")
          setLoading(false);
        })
        .finally(() => {console.log('x1 reached'); setLoading(false)})
        .catch((e) => {console.log("reached",e); setLoading(false)});
    });
  };

  const CustomProgressBar = ({visible}) => (
    <Modal onRequestClose={() => null} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#dcdcdc',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{borderRadius: 10, backgroundColor: 'white', padding: 25}}>
          <Text style={{fontSize: 20, fontWeight: '200'}}>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#DEDEDE'}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 63,
              padding: 5,
            }}>
            <TextInput
              keyboardType="url"
              placeholder="Enter a video URL ..."
              onChangeText={setSearch}
              value={search}
              style={{
                height: '100%',
                borderWidth: 1.5,
                width: '80%',
                padding: 10,
                borderRadius: 10,
                marginEnd: 5,
                marginStart: 5,
                borderColor: '#3742fa',
                backgroundColor: '#ECECEC',
              }}
            />
            <MainButton
              title={'Paste'}
              pressHandler={() => fetchCopiedText()}
              width="20%"
              height="100%"
              style={{margin: 5}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            <MainButton title={'Download'} pressHandler={downloadHandler} />
          </View>
          {/* <Text>{fetchedData || 'meow'}</Text> */}
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopEndRadius: 20,
          },
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: '2%',
            backgroundColor: '#FEFEFE',
          }}>
          <Text
            style={{
              marginTop: '10%',
              marginBottom: '6%',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
            Video Found
          </Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '90%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              marginBottom: 15,
            }}>
            <Image
              source={{
                uri: fetchedData?.itemInfo?.itemStruct?.video?.cover || '',
              }}
              style={{
                width: 140,
                height: 90,
                resizeMode: 'contain',
                borderRadius: 10,
                alignSelf: 'flex-start',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginLeft: 15,
                width: '40%',
                height: '100%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  marginTop: 5,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {fetchedData?.itemInfo?.itemStruct?.author?.nickname || ''}
              </Text>
              <Text
                style={{color: 'black', fontSize: 15, marginTop: 5}}
                numberOfLines={2}
                ellipsizeMode="tail">
              {fetchedData?.seoProps?.metaParams?.title || ''}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '90%',
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 17,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '96%',
                overflow: 'hidden',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image source={require('../assets/icons/video-download.png')} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 15,
                  }}>
                  Watermark Video
                </Text>
              </View>
              <DownloadButton />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                width: '96%',
                overflow: 'hidden',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image source={require('../assets/icons/video-download.png')} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 15,
                  }}>
                  No Watermark Video
                </Text>
              </View>
              <DownloadButton />
            </View>
          </View>
        </View>
      </RBSheet>

      <CustomProgressBar visible={loading} />
    </>
  );
}

export default Download;
