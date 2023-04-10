import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const DownloadPath =
  RNFS.ExternalStorageDirectoryPath + "/" + "ATiktokDownloader";
const URL = "https://www.tiktok.com/@snauzk/video/7115954193420111105"
export function downloadFile(countyHandler) {
    RNFetchBlob.config({
        path:`${DownloadPath}/Takatokilmonas-${Math.random() * 1000}.mp4`,
        fileCache:false,
        addAndroidDownloads: {
            notification : true,
            useDownloadManager : true,
            description: 'Yoyoyoyoyo',
        //     mime:'application/pdf',
        //     mediaScannable:true,
        //     path:`${dirs.DownloadDir}/${filename}`
        },
    })
    .fetch('GET','',{
        'Cache-Control' : 'no-store'
    })
    .progress({ interval: 250 },(received,total)=>{
        console.log('progress',received/total);
        countyHandler(received / total);
    })
    .then(res=>{
        console.log('finished', res);
    })
    .catch((errorMessage,statusCode)=>{
        console.log("error with downloading file",errorMessage)
    })
  }





export function downloadVideo(fetchedData, DownloadPath, RBSheetRef, downloadingHandler) {
    RNFS.downloadFile({
    fromUrl: fetchedData?.itemInfo?.itemStruct?.video?.downloadAddr || "",
    toFile: `${DownloadPath}/TiktokDownloader-${
      fetchedData?.itemInfo?.itemStruct?.author?.nickname
    }-${(Math.random() * 100000) | 0}.mp4`,
    background: true,
    discretionary: true,
    cacheable: true,
    begin: res => {
    //   RBSheetRef.current.close();
      console.log("Response begin ===\n\n");
      downloadingHandler({
        nickname: fetchedData?.itemInfo?.itemStruct?.author?.nickname,
        title: fetchedData?.seoProps?.metaParams?.title,
        image: fetchedData?.itemInfo?.itemStruct?.video?.cover,
        contentLength: res.contentLength,
        avatar: fetchedData?.itemInfo?.itemStruct?.author?.avatarLarger,
        jobId: res.jobId,
        progress: 0,
      });
    },
    progress: res => {
      let progressPercent = (
        (res.bytesWritten / res.contentLength) *
        100
      ).toFixed(0);
      downloadingHandler({
        nickname: fetchedData?.itemInfo?.itemStruct?.author?.nickname,
        title: fetchedData?.seoProps?.metaParams?.title,
        image: fetchedData?.itemInfo?.itemStruct?.video?.cover,
        contentLength: res.contentLength,
        avatar: fetchedData?.itemInfo?.itemStruct?.author?.avatarLarger,
        jobId: res.jobId,
        progress: progressPercent,
      });
    },
  });
}

