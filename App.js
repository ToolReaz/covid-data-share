import React, { createContext, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import StoreScreen from "./src/screens/StoreScreen";
import ShareScreen from "./src/screens/ShareScreen";
import ScanScreen from "./src/screens/ScanScreen";
import CreateProfileScreen from "./src/screens/CreateProfileScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { COLORS } from "./src/styles/colors";
import { t } from "i18n-js";
import InitWelcomeScreen from "./src/screens/initialization/InitWelcomeScreen";
import AsyncStorage from "@react-native-community/async-storage";
import InitChoiceScreen from "./src/screens/initialization/InitChoiceScreen";
import InitProfileScreen from "./src/screens/initialization/InitProfileScreen";
import InitEndScreen from "./src/screens/initialization/InitEndScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isInit, setIsInit] = useState(null);

  const [fontLoaded] = Font.useFonts({
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
    RobotoItalic: require("./assets/fonts/Roboto-Italic.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoMediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
    RobotoThinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });

  AsyncStorage.getItem("@covid-data-share/isAppInited").then((item) => {
    setIsInit(item ? false : false);
  });

  if (!fontLoaded || isInit == null) {
    console.log(isInit);
    return <SplashScreen />;
  }

  const AppStack = (
    <Stack.Navigator
      initialRouteName="Home"
      mode="card"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.Primary,
          borderBottomColor: COLORS.Contrast,
          borderBottomWidth: 2,
        },
        headerTintColor: COLORS.White,
        headerTitleStyle: {
          fontFamily: "RobotoMedium",
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Share"
        options={{ title: t("S_SHARE") }}
        component={ShareScreen}
      />
      <Stack.Screen
        name="Scan"
        options={{ title: t("S_SCAN") }}
        component={ScanScreen}
      />
      <Stack.Screen
        name="Store"
        options={{ title: t("S_STORE") }}
        component={StoreScreen}
      />
      <Stack.Screen
        options={{ title: t("S_CREATE_PROFILE") }}
        name="CreateProfile"
        component={CreateProfileScreen}
      />
    </Stack.Navigator>
  );

  const InitStack = (
    <Stack.Navigator
      initialRouteName="Init1"
      mode="card"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="Init1" component={InitWelcomeScreen} />
      <Stack.Screen name="Init2" component={InitChoiceScreen} />
      <Stack.Screen name="Init3" component={InitProfileScreen} />
      <Stack.Screen name="Init4" component={InitEndScreen} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer theme={{ colors: { background: COLORS.White } }}>
      {isInit ? AppStack : InitStack}
    </NavigationContainer>
  );
}
