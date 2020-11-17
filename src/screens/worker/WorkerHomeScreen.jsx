import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BackgroundSvg from "../../components/BackgroundSvg";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { t } from "i18n-js";
import { mainStyle } from "../../styles/mainStyle";
import { AntDesign } from "@expo/vector-icons";

export default function WorkerHomeScreen({ navigation }) {
  return (
    <View>
      <BackgroundSvg />
      <View style={s.container}>
        <View style={s.topLinksView}>
          <View>
            <Text style={mainStyle.title}>CODASH</Text>
            <View style={mainStyle.underline}></View>
          </View>
          <View
            style={s.linkView}
            onTouchStart={() => navigation.navigate("Scan")}
          >
            <AntDesign name="scan1" size={128} color={COLORS.Dark} />
            <Text style={[mainStyle.iconTitle]}>{t("COLLECT_BTN")}</Text>
          </View>
        </View>
        <View style={s.bottomLinksView}>
          <View
            style={s.linkView}
            onTouchStart={() => navigation.navigate("Store")}
          >
            <Feather name="database" size={128} color={COLORS.White} />
            <Text style={[mainStyle.iconTitle, { color: COLORS.White }]}>
              {t("STORE_BTN")}
            </Text>
          </View>
          <View
            style={s.linkView}
            onTouchStart={() => navigation.navigate("Settings")}
          >
            <AntDesign name="setting" size={128} color={COLORS.White} />
            <Text style={[mainStyle.iconTitle, { color: COLORS.White }]}>
              {t("SETTINGS_BTN")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
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
