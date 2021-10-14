import React, { useState, useEffect } from 'react'
import {View, Pressable,Text, StyleSheet, Platform, PermissionsAndroid} from 'react-native'
import moment from 'moment'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen, NewTaskScreen, NewProjectScreen, ListTaskScreen} from './src/screens'

import { store, persistor } from './src/stores';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {navigationRef} from './src/utils/NavigationService'
const App = () => {

  const Stack = createNativeStackNavigator();

    useEffect(() => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
      } 
  
    }, [])





  return (
    <NavigationContainer ref={navigationRef}>
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

      <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} />
        <Stack.Screen name="NewProject" component={NewProjectScreen} />
        <Stack.Screen name="ListTask" component={ListTaskScreen} />
      </Stack.Navigator>
        </PersistGate>
        </Provider>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  layout:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})

export default App