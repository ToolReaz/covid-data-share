import { StyleSheet } from "react-native";
import { material, systemWeights } from "react-native-typography";
import { COLORS } from "./colors";

export const mainStyle = StyleSheet.create({
  title: {
    ...material.display1,
    ...systemWeights.light,
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
    color: COLORS.LightDark,
    textAlign: "center",
    marginTop: 20,
  },

  iconTitle: {
    ...material.headline,
    ...systemWeights.semibold,
    textAlign: "center",
    color: COLORS.Dark,
  },

  iconTitleLD: {
    ...material.title,
    ...systemWeights.regular,
    textAlign: "center",
    color: COLORS.LightDark,
  },

  listTitle: {
    ...material.title,
    ...systemWeights.light,
    color: COLORS.LightDark,
    marginTop: 20,
  },
});
