import React, { Component } from "react";
import { Text, View } from "react-native";
import * as Svg from "react-native-svg";
import BackgroundSvg from "../components/BackgroundSvg";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <BackgroundSvg />
        <Text> HomeScreen </Text>
      </View>
    );
  }
}
