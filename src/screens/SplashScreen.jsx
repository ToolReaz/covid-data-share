import { t } from "i18n-js";
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/colors";
import { initStyle } from "../styles/initStyle";
import { mainStyle } from "../styles/mainStyle";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={s.container}>
        <View style={s.subContainer}>
          <Text style={mainStyle.title}>CODASH</Text>
          <View style={mainStyle.underline}></View>
        </View>
        <View style={s.loader}>
          <ActivityIndicator size="large" color={COLORS.Primary} />
        </View>
        <View style={s.text}>
          <Text style={initStyle.text}>{t("LOADING")}...</Text>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  subContainer: {
    flex: 1,
    justifyContent: "center",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    flex: 1,
    justifyContent: "center",
  },
});
