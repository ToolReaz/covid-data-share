import React, { Component } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import BackgroundSvg from "../components/BackgroundSvg";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "./../styles/colors";

import * as image from "./../../assets/background.svg";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <BackgroundSvg />
        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            position: "absolute",
            alignContent: "space-between",
            alignItems: "center",
            ...s.debug,
          }}
        >
          <Text style={s.title}> APP TITLE </Text>
          <View style={{ flex: 1, ...s.debug }}>
            <EvilIcons name="share-apple" size={128} color={COLORS.Dark} />
            <Text>Share</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", ...s.debug }}>
            <View>
              <Feather name="database" size={128} color={COLORS.White} />
              <Text style={[s.subtitle, { color: COLORS.White }]}>Store</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="file-document-box-search-outline"
                size={128}
                color={COLORS.White}
              />
              <Text style={[s.subtitle, { color: COLORS.White }]}>Collect</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  title: {
    fontSize: 32,
    color: COLORS.Dark,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 26,
    textAlign: "center",
  },

  debug: {
    borderColor: "#F00",
    borderWidth: 1,
  },
});
