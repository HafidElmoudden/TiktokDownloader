import { Alert } from 'react-native';
import URLParse from 'url-parse';

const fetchData = async (url, loadingHander, fetchDataHandler, refRBSheet) => {
  try {
    if (url === '') {
      Alert('URL Field is empty!');
      return;
    }

    let paresedUrlObject = URLParse(url).pathname.split('/');
    let userName = paresedUrlObject[1];
    let postId = paresedUrlObject[3];

    let URL = `https://www.tiktok.com/node/share/video/${userName}/${postId}`;

    loadingHander(true);

    fetch(URL).then(res => {
      res
        .json()
        .then(json => {
          fetchDataHandler(json);
          refRBSheet.current.open();
          loadingHander(false);
        })
        .finally(() => loadingHander(false))
        .catch(e => loadingHander(false));
    });
  } catch (e) {
    console.log('fetchData: Error : ' , e);
    Alert("Error occured please make sure the url is correct!")
  }
};

export default fetchData;
