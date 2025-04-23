// Import necessary components from React Navigation
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login';
import { SafeAreaView } from 'react-native';
import SignUp from './Components/Signup';
import Home from './Components/Home';
import UserDashboard from './Components/UserDashboard';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (

        <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      
      >
      
        <Stack.Screen 
          name='SignUp'
          component={SignUp} 
          options={{headerShown: false}}
         
        />
        <Stack.Screen
        name = "Home"
        component={Home}
        options={{headerShown: false}}
        />

        <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown: false}}
        />

        <Stack.Screen
        name='Dashboard'
        component={UserDashboard}
        options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default MyStack;
