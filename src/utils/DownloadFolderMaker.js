import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

export default async function DownloadFolderMaker() {
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
    RNFS.mkdir(DirectoryPath);
  } catch (e) {
    console.log(e);
    alert('Error: ' + e);
  }
}
