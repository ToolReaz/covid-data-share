import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, createSw } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import StoreScreen from "./screens/StoreScreen";
import ShareScreen from "./screens/ShareScreen";
import ScanScreen from "./screens/ScanScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import SplashScreen from "./screens/SplashScreen";
import { COLORS } from "./styles/colors";
import { t } from "i18n-js";
import InitWelcomeScreen from "./screens/initialization/InitWelcomeScreen";
import InitChoiceScreen from "./screens/initialization/InitChoiceScreen";
import InitProfileScreen from "./screens/initialization/InitProfileScreen";
import InitEndScreen from "./screens/initialization/InitEndScreen";
import * as SQLite from "expo-sqlite";
import { useRecoilState } from "recoil";
import { metaDataState } from "./store/atoms/metaDataState";

const Stack = createStackNavigator();

export default function App() {
  const [isInit, setIsInit] = useRecoilState(metaDataState);

  const initContext = React.useMemo(() => ({
    setInited: async () => {
      console.log("caca");
      SQLite.openDatabase("CODASH").transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO Meta(key, value) VALUES ('isInit', true)",
          [],
          () => {
            setIsInit(true);
          }
        );
      });
    },
  }));

  const [fontLoaded] = Font.useFonts({
    RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("../assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItalic: require("../assets/fonts/Roboto-BoldItalic.ttf"),
    RobotoItalic: require("../assets/fonts/Roboto-Italic.ttf"),
    RobotoLight: require("../assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("../assets/fonts/Roboto-LightItalic.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoMediumItalic: require("../assets/fonts/Roboto-MediumItalic.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("../assets/fonts/Roboto-Thin.ttf"),
    RobotoThinItalic: require("../assets/fonts/Roboto-ThinItalic.ttf"),
  });

  if (!fontLoaded) {
    return <SplashScreen />;
  }

  const AppStack = (
    <>
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
    </>
  );

  const InitStack = (
    <>
      <Stack.Screen name="Init1" component={InitWelcomeScreen} />
      <Stack.Screen name="Init2" component={InitChoiceScreen} />
      <Stack.Screen name="Init3" component={InitProfileScreen} />
      <Stack.Screen name="Init4" component={InitEndScreen} />
    </>
  );

  const screenOptions = isInit
    ? {
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
      }
    : { header: () => null };

    console.log(isInit)

  return (
    <NavigationContainer theme={{ colors: { background: COLORS.White } }}>
      <Stack.Navigator
        initialRouteName="Home"
        mode="card"
        screenOptions={screenOptions}
      >
        {isInit ? AppStack : InitStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
