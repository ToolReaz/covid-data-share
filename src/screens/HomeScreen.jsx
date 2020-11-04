import React, { Component } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import BackgroundSvg from "../components/BackgroundSvg";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "./../styles/colors";
import { t } from "i18n-js";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <BackgroundSvg />
        <View style={s.container}>
          <View style={s.topLinksView}>
            <View>
              <Text style={s.title}>APP NAME</Text>
              <View style={s.underline}></View>
            </View>
            <View
              style={s.linkView}
              onTouchStart={() => this.props.navigation.navigate("Share")}
            >
              <EvilIcons name="share-apple" size={200} color={COLORS.Dark} />
              <Text style={[s.subtitle, { color: COLORS.Dark }]}>
                {t("SHARE_BTN")}
              </Text>
            </View>
          </View>
          <View style={s.bottomLinksView}>
            <View
              style={s.linkView}
              onTouchStart={() => this.props.navigation.navigate("Store")}
            >
              <Feather name="database" size={128} color={COLORS.White} />
              <Text style={[s.subtitle, { color: COLORS.White }]}>
                {t("STORE_BTN")}
              </Text>
            </View>
            <View
              style={s.linkView}
              onTouchStart={() => this.props.navigation.navigate("Scan")}
            >
              <MaterialCommunityIcons
                name="file-document-box-search-outline"
                size={128}
                color={COLORS.White}
              />
              <Text style={[s.subtitle, { color: COLORS.White }]}>
                {t("COLLECT_BTN")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
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

  subtitle: {
    fontSize: 24,
    fontFamily: "RobotoMedium",
    textAlign: "center",
  },

  linkView: {
    justifyContent: "center",
    alignItems: "center",
  },

  topLinksView: { flex: 3, width: "100%", justifyContent: "space-around" },

  bottomLinksView: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: COLORS.Primary,
  },

  debug: {
    borderColor: "#F00",
    borderWidth: 1,
  },
});
