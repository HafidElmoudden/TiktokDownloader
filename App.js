import React, { useEffect } from "react";
import {I18nManager, StatusBar} from "react-native";
import Download from "./src/screens/Download";
import initAppLovinMax from "./src/utils/AppLovin";
import SplashScreen from 'react-native-splash-screen'

function App() {
  try {
    I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    initAppLovinMax();
    SplashScreen.hide();
  }, [])
  
  return (
    <>
      <StatusBar backgroundColor={"#30A6A6"} />
      <Download />
    </>
  );
}

export default App;
