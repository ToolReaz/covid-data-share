import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { initStyle } from "../../styles/initStyle";
import { useSetRecoilState } from "recoil";
import { userTypeState } from "../../store/atoms/metaDataState";

export default function InitChoiceScreen(props) {
  const setUserType = useSetRecoilState(userTypeState);

  const titleFade = useRef(new Animated.Value(0)).current;
  const clientFade = useRef(new Animated.Value(0)).current;
  const workerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(clientFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(workerFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const client = async () => {
    await AsyncStorage.setItem("@covid-data-share/userType", "client");
    setUserType("client");
    props.navigation.navigate("Init3");
  };

  const worker = async () => {
    await AsyncStorage.setItem("@covid-data-share/userType", "worker");
    setUserType("worker");
    props.navigation.navigate("Init4");
  };

  return (
    <View style={s.container}>
      <View style={s.top}>
        <Animated.View style={{ opacity: titleFade }}>
          <Text style={initStyle.title}>{t("ARE_YOU")}</Text>
          <View style={initStyle.underline}></View>
        </Animated.View>
        <Animated.View style={{ opacity: clientFade }}>
          <TouchableOpacity onPress={client}>
            <AntDesign
              style={s.icon}
              name="user"
              size={84}
              color={COLORS.Dark}
            />
            <Text style={initStyle.iconText}>{t("CLIENT")}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Animated.View style={[s.bot, { opacity: workerFade }]}>
        <TouchableOpacity onPress={worker}>
          <Entypo style={s.icon} name="shop" size={84} color={COLORS.White} />
          <Text style={{ ...initStyle.iconText, color: COLORS.White }}>
            {t("WORKER")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    flex: 1,
    justifyContent: "space-around",
  },
  bot: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.Primary,
  },

  icon: {
    textAlign: "center",
  },
});
