import AsyncStorage from "@react-native-community/async-storage";
import React, { Component, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { t } from "../../i18n/i18n";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { useSetRecoilState } from "recoil";
import { isInitState } from "../../store/atoms/metaDataState";
import { initStyle } from "../../styles/initStyle";

export default function InitEndScreen() {
  const setIsInit = useSetRecoilState(isInitState);

  const titleFade = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(textFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const end = async () => {
    await AsyncStorage.setItem("@covid-data-share/isInit", "true");
    setIsInit(true);
  };

  return (
    <View style={s.container}>
      <Animated.View style={{ opacity: titleFade }}>
        <Text style={initStyle.title}>{t("CONGRAT")}</Text>
        <View style={initStyle.underline}></View>
      </Animated.View>
      <Animated.Text style={[initStyle.text, { opacity: textFade }]}>
        {t("INIT_FINISH")}
      </Animated.Text>
      <Animated.View style={{ opacity: buttonFade }}>
        <StyledButton
          onPress={end}
          text={
            <>
              {t("LETS_GO")}{" "}
              <AntDesign name="arrowright" size={18} color={COLORS.White} />
            </>
          }
          type="primary"
        />
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
  },

  underline: {
    width: "20%",
    alignSelf: "center",
    borderTopColor: COLORS.Primary,
    borderTopWidth: 2,
  },

  text: {
    fontSize: 18,
    fontFamily: "RobotoLight",
    color: COLORS.Dark,
    textAlign: "center",
  },
});
