import axios from "axios";
async function noWmFetchData(url){
    const options = {
        method: "GET",
        url: "https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index",
        params: {url: url},
        headers: {
          "X-RapidAPI-Key":
            "241b99e453msh53bc640a3669d32p116241jsn0f01d47b9c51",
          "X-RapidAPI-Host":
            "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
        },
      };
    
     const res =  await axios.request(options);
     return res;

}

export default noWmFetchData;