import {Alert} from "react-native";
import URLParse from "url-parse";

const fetchData = async (url, setLoading, setFetchedData, refRBSheet) => {
  try {
    if (!url) {
      alert("URL Field is empty!");
      return;
    }

    let paresedUrlObject = URLParse(url).pathname.split("/");
    let userName = paresedUrlObject[1];
    let postId = paresedUrlObject[3];

    let URL = `https://www.tiktok.com/node/share/video/${userName}/${postId}`;

    setLoading(true);
    refRBSheet.current.open();

    fetch(URL).then(res => {
      if (!res.ok) {
        Alert.alert(
          "Error",
          "Error occured please make sure the url is correct!",
          [{text: "OK", onPress: () => null}],
        );
        refRBSheet.current.close();
        return;
      }
      
      res
        .json()
        .then(json => {
          setFetchedData(json);
          setLoading(false);
        })
        .finally(() => setLoading(false))
        .catch(e => setLoading(false));
    });
  } catch (e) {
    console.log("fetchData: Error : ", e);
    Alert.alert("Please make sure the url is correct!");
  }
};

export default fetchData;
