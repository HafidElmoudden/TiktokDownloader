import {INTERSTITIAL_AD_UNIT_ID} from "../constants/Ads";
import AppLovinMAX from "react-native-applovin-max";

export function loadShowAd() {
  return new Promise(resolve => {
    if (AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)) {
      AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
      resolve();
    } else {
      console.log("Loading interstitial ad...");
      AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
      resolve();
    }
  });
}
