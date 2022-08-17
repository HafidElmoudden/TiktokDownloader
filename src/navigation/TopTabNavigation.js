import React from 'react';
import Download from '../screens/Download';
import History from '../screens/History';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Download"
      screenOptions={{tabBarShowLabel: true, tabBarShowIcon: true}}>
      <Tab.Screen name="Download" component={Download} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

export default TopTabNavigation;
