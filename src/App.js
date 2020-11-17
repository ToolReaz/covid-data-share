import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, createSw } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import StoreScreen from "./screens/StoreScreen";
import ShareScreen from "./screens/ShareScreen";
import ScanScreen from "./screens/ScanScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import { COLORS } from "./styles/colors";
import { t } from "i18n-js";
import InitWelcomeScreen from "./screens/initialization/InitWelcomeScreen";
import InitChoiceScreen from "./screens/initialization/InitChoiceScreen";
import InitProfileScreen from "./screens/initialization/InitProfileScreen";
import InitEndScreen from "./screens/initialization/InitEndScreen";
import * as SQLite from "expo-sqlite";
import { useRecoilState } from "recoil";
import { metaDataState } from "./store/atoms/metaDataState";
import { material } from "react-native-typography";
import SplashScreen from "./screens/SplashScreen";

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isInit, setIsInit] = useRecoilState(metaDataState);

  useEffect(() => {});

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

  if (!loaded) return <SplashScreen />;

  const AppStack = (
    <SplashScreen>
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
    </SplashScreen>
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
