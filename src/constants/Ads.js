const AD_UNIT_ID = "eea2abab04733469";

export const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: AD_UNIT_ID,
  ios: AD_UNIT_ID,
});