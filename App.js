import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from './src/MainScreen'
import QuestSetScreen from './src/QuestSetScreen'
import QuestSetHeader from './src/QuestSetTab/QuestSetHeader'
import LoginScreen from './src/LoginScreen'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator()

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  const onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  
  if(initializing) return null;

  if(user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={ {header : () => {}} }
          />
          <Stack.Screen
            name="QuestSetScreen"
            component={QuestSetScreen}
            options={ {header: () => {}} }
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return <LoginScreen />
}

export default App