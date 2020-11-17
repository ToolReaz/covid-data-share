import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BackgroundSvg from "../../components/BackgroundSvg";
import { EvilIcons } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import { t } from "i18n-js";
import { mainStyle } from "../../styles/mainStyle";
import { useRecoilValue } from "recoil";
import { userTypeState } from "../../store/atoms/metaDataState";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function ClientHomeScreen({ navigation }) {
  const userType = useRecoilValue(userTypeState);

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
            onTouchStart={() => navigation.navigate("Share")}
          >
            <EvilIcons name="share-apple" size={200} color={COLORS.Dark} />
            <Text style={[mainStyle.iconTitle]}>{t("SHARE_BTN")}</Text>
          </View>
        </View>
        <View style={s.bottomLinksView}>
          <View
            style={s.linkView}
            onTouchStart={() => navigation.navigate("Store")}
          >
            <FontAwesome name="users" size={128} color={COLORS.White} />
            <Text style={[mainStyle.iconTitle, { color: COLORS.White }]}>
              {t("PROFILES_BTN")}
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
