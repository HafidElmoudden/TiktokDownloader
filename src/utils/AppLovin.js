import AppLovinMAX from "react-native-applovin-max";

const SDK_KEY =
  "ohtdLkyzMbfaBB4rcXDNSH7Vc7LFrsy50apxBFWF4rmoUgV8XhH78PB1_yy4ikJRbPpcONGP_rFkf04UxqsrFJ";
const AD_UNIT_ID = "eea2abab04733469";
const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: AD_UNIT_ID,
  ios: AD_UNIT_ID,
});

export default function initAppLovinMax() {
  if (AppLovinMAX.isInitialized()) return;
  AppLovinMAX.initialize(SDK_KEY, configuration => {
    attachAdListeners();
  });
}

const attachAdListeners = () => {
  // Interstitial Listeners
  AppLovinMAX.addEventListener("OnInterstitialLoadedEvent", adInfo => {

    // Interstitial ad is ready to be shown. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) will now return 'true'
    AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
    // Reset retry attempt
  });
  AppLovinMAX.addEventListener("OnInterstitialLoadFailedEvent", errorInfo => {
    // Interstitial ad failed to load
    // We recommend retrying with exponentially higher delays up to a maximum delay (in this case 64 seconds)


    setTimeout(() => {
      AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    },  1000);
  });
  AppLovinMAX.addEventListener("OnInterstitialClickedEvent", adInfo => {
  });
  AppLovinMAX.addEventListener("OnInterstitialDisplayedEvent", adInfo => {
  });
  AppLovinMAX.addEventListener(
    "OnInterstitialAdFailedToDisplayEvent",
    adInfo => {
    },
  );
  AppLovinMAX.addEventListener("OnInterstitialHiddenEvent", adInfo => {
  });
  AppLovinMAX.addEventListener("OnInterstitialAdRevenuePaid", adInfo => {
    console.log("Interstitial ad revenue paid: " + adInfo.revenue);
  });
};
