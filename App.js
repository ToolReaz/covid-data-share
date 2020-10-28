import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import  StoreScreen  from "./src/screens/StoreScreen";
import  ShareScreen  from "./src/screens/ShareScreen";
import  ScanScreen  from "./src/screens/ScanScreen";
import  CreateProfileScreen from "./src/screens/CreateProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Share" component={ShareScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}