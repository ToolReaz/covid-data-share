import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/colors";
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
  },
});
