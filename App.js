import React, { useState, useEffect, version } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Sample from './pages/Sample';
import ViewPartners from './pages/ViewPartners';
import PartnerDetails from './pages/PartnerDetails';
// import email from './pages/email'
import Register from './pages/Register';


const Stack = createStackNavigator();
global.USERID

function App() {
  return(
    <Stack.Navigator screenOptions ={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="ViewPartners" component={ViewPartners}/>
      <Stack.Screen name="PartnerDetails" component={PartnerDetails}/>
      <Stack.Screen name="Sample" component={Sample}/>
      <Stack.Screen name="Register" component={Register}/>
      {/* <Stack.Screen name="Email" component={email}/> */}
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}