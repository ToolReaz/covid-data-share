import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, createSw } from "@react-navigation/stack";
import StoreScreen from "./screens/worker/StoreScreen";
import ShareScreen from "./screens/client/ShareScreen";
import ScanScreen from "./screens/worker/ScanScreen";
import CreateProfileScreen from "./screens/client/CreateProfileScreen";
import { COLORS } from "./styles/colors";
import { t } from "i18n-js";
import InitWelcomeScreen from "./screens/initialization/InitWelcomeScreen";
import InitChoiceScreen from "./screens/initialization/InitChoiceScreen";
import InitProfileScreen from "./screens/initialization/InitProfileScreen";
import InitEndScreen from "./screens/initialization/InitEndScreen";
import * as SQLite from "expo-sqlite";
import { useRecoilState } from "recoil";
import { metaDataState, userTypeState } from "./store/atoms/metaDataState";
import { material } from "react-native-typography";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from "@react-native-community/async-storage";
import ClientHomeScreen from "./screens/client/ClientHomeScreen";
import WorkerHomeScreen from "./screens/worker/WorkerHomeScreen";
import { iniStorage } from "./libs/initStorage";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isInit, setIsInit] = useRecoilState(metaDataState);
  const [userType, setUserType] = useRecoilState(userTypeState);

  useEffect(() => {
    (async () => {
      const isAppInit = await AsyncStorage.getItem("@covid-data-share/isInit");
      const appUserType = await AsyncStorage.getItem("@covid-data-share/userType");

      if (isAppInit === "true") {
        setIsInit(true);
        //setUserType(appUserType);
        setUserType("client");
      } else {
        await iniStorage();
        setIsInit(false);
      }
      setLoaded(true);
    })();
  });

  if (!loaded) return <SplashScreen />;

  const AppStack =
    userType === "client" ? (
      // Client screens
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={ClientHomeScreen}
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
    ) : (
      // Worker screens
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={WorkerHomeScreen}
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
        },
        headerTintColor: COLORS.White,
        headerTitleStyle: { ...material.headline, color: COLORS.White },
      }
    : { header: () => null };

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
