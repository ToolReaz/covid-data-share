import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/colors";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={s.container}>
        <View style={s.subContainer}>
          <Text style={s.title}>CODASH</Text>
          <View style={s.underline}></View>
        </View>
        <View style={s.loader}>
          <ActivityIndicator size="large" color={COLORS.Primary} />
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

  loader: {
    flex: 1,
  },
});
