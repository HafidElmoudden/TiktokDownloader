import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TopTabNavigation from './navigation/TopTabNavigation';
import {I18nManager} from 'react-native';

function App() {
  try {
    I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }
  return (
    <NavigationContainer>
      <TopTabNavigation />
    </NavigationContainer>
  );
}

export default App;
