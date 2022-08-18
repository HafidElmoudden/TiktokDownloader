import URLParse from 'url-parse';

const fetchData = async (url, loadingHandler, fetchDataHandler, refRBSheet) => {
  try {
    if (url === '') {
      alert('URL Field is empty!');
      return;
    }

    let paresedUrlObject = URLParse(url).pathname.split('/');
    let userName = paresedUrlObject[1];
    let postId = paresedUrlObject[3];

    let URL = `https://www.tiktok.com/node/share/video/${userName}/${postId}`;

    loadingHandler(true);

    fetch(URL).then(res => {
      res
        .json()
        .then(json => {
          fetchDataHandler(json);
          refRBSheet.current.open();
          loadingHandler(false);
        })
        .finally(() => loadingHandler(false))
        .catch(e => loadingHandler(false));
    });
  } catch (e) {
    console.log('fetchData: Error : ', e);
    alert('Error occured please make sure the url is correct!');
  }
};

export default fetchData;
