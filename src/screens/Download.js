import React, {useState} from 'react';
import {
  View,
  TextInput,
  Clipboard,
} from 'react-native';
// import Clipboard from "@react-native-community/react-native-clipboard";
import MainButton from '../components/MainButton';
import RNFS from 'react-native-fs';
import BottomSheet from '../components/BottomSheet';
import CustomProgressBar from '../components/CustomProgressBar';
// import ufs from '"url-file-size"';
import fetchData from '../utils/fetchData';
import DownloadFolderMaker from '../utils/DownloadFolderMaker';

const URL_DOWNLOAD =
  'https://www.tiktok.com/@hazo9a1/video/7125918538094759174';

const DownloadPath =
  RNFS.ExternalStorageDirectoryPath + '/' + 'ATiktokDownloader';

function Download() {
  const [search, setSearch] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  let refRBSheet = React.createRef(null);

  const loadingHander = (value) => {
    setLoading(value);
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setSearch(text);
  };

  const fetchDataHandler = (value) => {
    setFetchedData(value);
  }

  const refHandler = (value) => {
    refRBSheet = value;
  }

  const downloadHandler = async () => {
    await DownloadFolderMaker();
    await fetchData(search, loadingHander, fetchDataHandler, refRBSheet);
  };

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
            <CustomProgressBar visible={loading} />
          </View>
        </View>
      </View>
      <BottomSheet  fetchedData={fetchedData} refHandler={refHandler}/>

    </>
  );
}

export default Download;
